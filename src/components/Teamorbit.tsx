"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import member1 from "@/assets/member-image1.png";
import member2 from "@/assets/member-image2.png";
import member3 from "@/assets/member-image3.png";
import member4 from "@/assets/member-image4.png";
import member5 from "@/assets/member-image5.png";
import member6 from "@/assets/member-image6.png";
import member7 from "@/assets/member-image7.png";
import member8 from "@/assets/member-image8.png";
import member9 from "@/assets/member-image9.png";

// Replace src with your actual team image paths later
const teamMembers = [
  { id: 4,  src: member1,  orbit: 1, baseAngle: 300, size: 90 },
  { id: 5,  src: member2,  orbit: 1, baseAngle: 60, size: 50  },
  { id: 6,  src: member3,  orbit: 1, baseAngle: 180, size: 65 },
  { id: 7,  src: member4,  orbit: 1, baseAngle: 20, size: 50  },
  { id: 8,  src: member5,  orbit: 2, baseAngle: 200, size: 44 },
  { id: 9,  src: member6,  orbit: 2, baseAngle: 300, size: 60 },
  { id: 10, src: member7, orbit: 2, baseAngle: 130, size: 50 },
  { id: 11, src: member8, orbit: 2, baseAngle: 90, size: 44 },
  { id: 12, src: member9, orbit: 2, baseAngle: 50, size: 50 },
];

const W  = 650;
const H  = 652;

const ORBIT_RADII  = [150, 225, 320];
const AVATAR_SIZES = [58,  50,  44 ];

const ARC_DEG      = 54;
const SPEEDS       = [0.28, 0.20, 0.14];

export default function TeamOrbits() {
  const timeRef = useRef(0);
  const rafRef  = useRef<number | null>(null);
  // Store angle per member, compute x/y in render
  const [offsets, setOffsets] = useState(() =>
    teamMembers.map((m) => m.baseAngle)
  );

  useEffect(() => {
    let last = performance.now();
    const angles = teamMembers.map((m) => m.baseAngle);

    const tick = (now: number) => {
      const dt = (now - last) / 16.67;
      last = now;
      timeRef.current += dt;

      const next = teamMembers.map((m, i) => {
        const spd = SPEEDS[m.orbit];
        
        return (ARC_DEG / 2) * Math.sin((timeRef.current * spd * Math.PI) / 180) + m.baseAngle;
      });

      setOffsets([...next]);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="relative team-orbit"
      style={{ width: W, height: H }}
    >
      {/* SVG: rings drawn from exact center */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
      >
        {ORBIT_RADII.map((r, i) => (
          <circle
            key={i}
            cx={W / 2}
            cy={H / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Center text — anchored to exact center via absolute + translate */}
      <div
        className="absolute text-center z-10 pointer-events-none"
        style={{
          top:  "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 160,
            height: 160,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
           
          }}
        />
        <p className="font-normal text-white leading-none tracking-tight" style={{ fontSize: "clamp(100px, 6.5vw, 100px)" }}>
          20+
        </p>
        <p className="text-white font-medium mt-2 tracking-widest uppercase" style={{ fontSize: "clamp(16px, 1.3vw, 20px)" }}>
          Team Members
        </p>
      </div>

      {/* 
        Avatars: placed at exact center (50%, 50%) then pushed
        outward via translate. This means the avatar center always
        sits exactly on the ring — no size offset math needed.
      */}
      {teamMembers.map((member, i) => {
        const r    = ORBIT_RADII[member.orbit];
        const size = member.size;
        const rad  = (offsets[i] * Math.PI) / 180;
        const tx   = r * Math.cos(rad);   // px from center
        const ty   = r * Math.sin(rad);   // px from center

        return (
          <div
            key={member.id}
            className="absolute rounded-full overflow-hidden z-20"
            style={{
              width: size,
              height: size,
              // anchor at center of stage
              top:  "50%",
              left: "50%",
              // shift to ring position, then pull back by half avatar size
              transform: `translate(calc(${tx}px - 50%), calc(${ty}px - 50%))`,
              border:    "2px solid rgba(255,255,255,0.15)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
  src={member.src}
  alt="team member"
  
  className="w-full h-full object-cover block"
/>
          </div>
        );
      })}
    </div>
  );
}