"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/assets/Logo.svg";

type Brick = {
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean;
  hot: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
};

type Phase = "idle" | "playing" | "won" | "lost";

const BEST_KEY = "tamatos-404-best";
const HOT_SCORE = 30;
const NORMAL_SCORE = 10;
const START_LIVES = 3;
const ACCENT = "#9DF560";
const BG = "#0a0a0c";

/**
 * Open / diagonal "4" style from the reference screenshot.
 * 1 = white brick, 2 = green hot brick
 */
const DIGIT_4: number[][] = [
  [1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1],
  [0, 0, 2, 0, 0, 1],
  [0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1],
];

const DIGIT_0: number[][] = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 2, 1, 1],
];

const DIGIT_4B: number[][] = [
  [1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 2],
  [0, 0, 0, 1, 0, 2],
  [1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 1],
];

function buildBricks(canvasW: number, canvasH: number): Brick[] {
  const patterns = [DIGIT_4, DIGIT_0, DIGIT_4B];
  const cols = 6;
  const rows = 7;
  const gap = Math.max(6, Math.min(10, canvasW * 0.008));
  const digitGap = Math.max(20, canvasW * 0.03);
  const usable = canvasW - digitGap * 2;
  const brickW = Math.min(44, usable / (cols * 3 + 2));
  const brickH = brickW * 0.55;
  const digitW = cols * brickW + (cols - 1) * gap;
  const totalW = digitW * 3 + digitGap * 2;
  const totalH = rows * brickH + (rows - 1) * gap;
  const startX = (canvasW - totalW) / 2;
  const startY = Math.max(96, canvasH * 0.14);

  // Avoid unused warning if totalH needed later for layout tuning
  void totalH;

  const bricks: Brick[] = [];
  let offsetX = startX;

  for (const pattern of patterns) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = pattern[r][c];
        if (!cell) continue;
        bricks.push({
          x: offsetX + c * (brickW + gap),
          y: startY + r * (brickH + gap),
          w: brickW,
          h: brickH,
          alive: true,
          hot: cell === 2,
        });
      }
    }
    offsetX += digitW + digitGap;
  }

  return bricks;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export default function NotFoundBreakout() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(START_LIVES);

  const phaseRef = useRef<Phase>("idle");
  const scoreRef = useRef(0);
  const livesRef = useRef(START_LIVES);
  const pointerX = useRef<number | null>(null);
  const keys = useRef({ left: false, right: false });
  const resetToken = useRef(0);

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(BEST_KEY) || "0");
      if (!Number.isNaN(stored)) setBest(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevBg = document.body.style.backgroundColor;
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = BG;
    document.documentElement.style.backgroundColor = BG;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.backgroundColor = prevBg;
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  const persistBest = useCallback((nextScore: number) => {
    setBest((prev) => {
      const next = Math.max(prev, nextScore);
      try {
        localStorage.setItem(BEST_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = START_LIVES;
    setScore(0);
    setLives(START_LIVES);
    phaseRef.current = "playing";
    setPhase("playing");
    resetToken.current += 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let bricks: Brick[] = [];
    let particles: Particle[] = [];
    let paddleX = 0;
    let paddleW = 120;
    const paddleH = 14;
    let ballX = 0;
    let ballY = 0;
    let ballVX = 0;
    let ballVY = 0;
    const ballR = 7;
    let lastReset = -1;

    const resetBall = (serve: boolean) => {
      ballX = paddleX + paddleW / 2;
      ballY = height - 56 - ballR;
      if (!serve) {
        ballVX = 0;
        ballVY = 0;
        return;
      }
      const speed = Math.min(6.4, Math.max(4.6, width * 0.006));
      const angle = -Math.PI / 2 + (Math.random() * 0.5 - 0.25);
      ballVX = Math.cos(angle) * speed;
      ballVY = Math.sin(angle) * speed;
    };

    const resetLevel = () => {
      bricks = buildBricks(width, height);
      paddleW = Math.min(150, Math.max(100, width * 0.13));
      paddleX = (width - paddleW) / 2;
      particles = [];
      resetBall(phaseRef.current === "playing");
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      resetLevel();
    };

    const spawnParticles = (brick: Brick) => {
      const color = brick.hot ? ACCENT : "#ffffff";
      for (let i = 0; i < 10; i++) {
        particles.push({
          x: brick.x + brick.w / 2,
          y: brick.y + brick.h / 2,
          vx: (Math.random() - 0.5) * 7,
          vy: (Math.random() - 0.5) * 7 - 1,
          life: 0.5 + Math.random() * 0.4,
          size: 2 + Math.random() * 4,
          color,
        });
      }
    };

    const loseLife = () => {
      livesRef.current -= 1;
      setLives(livesRef.current);
      if (livesRef.current <= 0) {
        phaseRef.current = "lost";
        setPhase("lost");
        persistBest(scoreRef.current);
        resetBall(false);
        return;
      }
      paddleW = Math.min(150, Math.max(100, width * 0.13));
      paddleX = Math.min(Math.max(0, paddleX), width - paddleW);
      resetBall(true);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const brick of bricks) {
        if (!brick.alive) continue;
        ctx.fillStyle = brick.hot ? ACCENT : "#ffffff";
        roundRect(ctx, brick.x, brick.y, brick.w, brick.h, Math.min(brick.h * 0.42, 10));
        ctx.fill();
      }

      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        roundRect(ctx, p.x, p.y, p.size, p.size, 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = "#ffffff";
      roundRect(ctx, paddleX, height - 56, paddleW, paddleH, 999);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
      ctx.fill();
    };

    const update = () => {
      if (!running) return;

      if (resetToken.current !== lastReset) {
        lastReset = resetToken.current;
        resetLevel();
      }

      const moveSpeed = width * 0.012;
      if (keys.current.left) paddleX -= moveSpeed;
      if (keys.current.right) paddleX += moveSpeed;
      if (pointerX.current != null) paddleX = pointerX.current - paddleW / 2;
      paddleX = Math.max(0, Math.min(width - paddleW, paddleX));

      if (phaseRef.current !== "playing") {
        ballX = paddleX + paddleW / 2;
        ballY = height - 56 - ballR;
      } else {
        ballX += ballVX;
        ballY += ballVY;

        if (ballX - ballR <= 0) {
          ballX = ballR;
          ballVX = Math.abs(ballVX);
        } else if (ballX + ballR >= width) {
          ballX = width - ballR;
          ballVX = -Math.abs(ballVX);
        }
        if (ballY - ballR <= 0) {
          ballY = ballR;
          ballVY = Math.abs(ballVY);
        }

        const paddleY = height - 56;
        if (
          ballVY > 0 &&
          ballY + ballR >= paddleY &&
          ballY - ballR <= paddleY + paddleH &&
          ballX >= paddleX - ballR &&
          ballX <= paddleX + paddleW + ballR
        ) {
          const hit = (ballX - (paddleX + paddleW / 2)) / (paddleW / 2);
          const clamped = Math.max(-1, Math.min(1, hit));
          const speed = Math.hypot(ballVX, ballVY) * 1.02;
          const angle = -Math.PI / 2 + clamped * 1.05;
          ballVX = Math.cos(angle) * speed;
          ballVY = Math.sin(angle) * speed;
          ballY = paddleY - ballR;
        }

        if (ballY - ballR > height) loseLife();

        for (const brick of bricks) {
          if (!brick.alive) continue;
          if (
            ballX + ballR < brick.x ||
            ballX - ballR > brick.x + brick.w ||
            ballY + ballR < brick.y ||
            ballY - ballR > brick.y + brick.h
          ) {
            continue;
          }

          brick.alive = false;
          spawnParticles(brick);
          scoreRef.current += brick.hot ? HOT_SCORE : NORMAL_SCORE;
          setScore(scoreRef.current);

          if (brick.hot) {
            paddleW = Math.min(paddleW + 28, width * 0.28);
            paddleX = Math.min(paddleX, width - paddleW);
          }

          const overlapL = ballX + ballR - brick.x;
          const overlapR = brick.x + brick.w - (ballX - ballR);
          const overlapT = ballY + ballR - brick.y;
          const overlapB = brick.y + brick.h - (ballY - ballR);
          if (Math.min(overlapL, overlapR) < Math.min(overlapT, overlapB)) {
            ballVX *= -1;
          } else {
            ballVY *= -1;
          }
          break;
        }

        if (bricks.every((b) => !b.alive)) {
          phaseRef.current = "won";
          setPhase("won");
          persistBest(scoreRef.current);
        }
      }

      particles = particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.18,
          life: p.life - 0.02,
        }))
        .filter((p) => p.life > 0);

      draw();
      raf = requestAnimationFrame(update);
    };

    const onPointerMove = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      pointerX.current = clientX - rect.left;
    };

    const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onPointerMove(e.touches[0].clientX);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = true;
      if (e.code === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = true;
      if (e.code === "Space") {
        e.preventDefault();
        if (phaseRef.current !== "playing") startGame();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = false;
      if (e.code === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    raf = requestAnimationFrame(update);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [persistBest, startGame]);

  const showOverlay = phase !== "playing";
  const overlayTitle =
    phase === "won"
      ? "You cleared 404."
      : phase === "lost"
        ? "Out of lives."
        : "This page is missing.";
  const overlaySub =
    phase === "won"
      ? "Nice aim. Play again?"
      : phase === "lost"
        ? "Might as well try again."
        : "Might as well play.";

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[300] overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 py-5 sm:px-8 sm:py-6">
        <Image
          src={Logo}
          alt="Tamatos"
          width={140}
          height={18}
          className="h-auto w-[120px] sm:w-[140px]"
          priority
        />
        <div className="flex items-center gap-5 sm:gap-8 font-mono text-[11px] sm:text-[12px] tracking-[0.08em] text-white/80">
          <span>
            SCORE: <span className="tabular-nums text-white">{String(score).padStart(4, "0")}</span>
          </span>
          <span>
            BEST: <span className="tabular-nums text-white">{String(best).padStart(4, "0")}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            LIVES:
            <span className="inline-flex gap-1.5">
              {Array.from({ length: START_LIVES }).map((_, i) => (
                <span
                  key={i}
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: i < lives ? ACCENT : "rgba(255,255,255,0.2)" }}
                />
              ))}
            </span>
          </span>
        </div>
      </div>

      {showOverlay ? (
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-16 pt-8 sm:pb-20">
          <div
            className="w-full max-w-[420px] rounded-[22px] border border-white/15 px-6 py-7 sm:px-8 sm:py-8"
            style={{
              background: "rgba(10,10,12,0.92)",
              boxShadow: "inset 5.33px 4px 12px 0 rgba(255,255,255,0.08)",
            }}
            role="dialog"
            aria-labelledby="not-found-title"
          >
            <p className="font-mono text-[12px] tracking-[0.14em]" style={{ color: ACCENT }}>
              ERROR 404
            </p>
            <h1
              id="not-found-title"
              className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-[34px]"
            >
              {overlayTitle}
            </h1>
            <p className="mt-2 text-[18px] italic text-white/70 sm:text-[20px]">{overlaySub}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={startGame}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium text-[#0A0A0C] transition hover:brightness-110"
                style={{ background: ACCENT }}
              >
                {phase === "idle" ? "Play" : "Play again"}
                <span className="rounded-md border border-black/20 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-[#0A0A0C]/80">
                  Space
                </span>
              </button>
              <Link
                href="/"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/25 bg-transparent px-5 py-3 text-[15px] font-medium text-white transition hover:bg-white hover:text-[#0A0A0C]"
              >
                Take me home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p className="pointer-events-none absolute inset-x-0 bottom-4 z-10 text-center font-mono text-[10px] tracking-[0.14em] text-white/35 sm:text-[11px]">
          HOT BRICKS ARE WORTH 30 AND WIDEN YOUR PADDLE.
        </p>
      )}
    </div>
  );
}
