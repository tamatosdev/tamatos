"use client";

import { useEffect, useMemo, useRef } from "react";
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
import type { TeamMemberData } from "@/lib/home";

const defaultTeamMembers = [
  { id: 4, src: member1, orbit: 1, baseAngle: 300, size: 90 },
  { id: 5, src: member2, orbit: 1, baseAngle: 60, size: 50 },
  { id: 6, src: member3, orbit: 1, baseAngle: 180, size: 65 },
  { id: 7, src: member4, orbit: 1, baseAngle: 20, size: 50 },
  { id: 8, src: member5, orbit: 2, baseAngle: 200, size: 44 },
  { id: 9, src: member6, orbit: 2, baseAngle: 300, size: 60 },
  { id: 10, src: member7, orbit: 2, baseAngle: 130, size: 50 },
  { id: 11, src: member8, orbit: 2, baseAngle: 90, size: 44 },
  { id: 12, src: member9, orbit: 2, baseAngle: 50, size: 50 },
];

type OrbitMember = {
  id: number;
  src: string | typeof member1;
  orbit: number;
  baseAngle: number;
  size: number;
};

function mapCmsMembers(members: TeamMemberData[]): OrbitMember[] {
  return members
    .filter((m) => m.image?.url)
    .map((m, i) => ({
      id: i + 1,
      src: m.image!.url!,
      orbit: m.orbit ?? 1,
      baseAngle: m.baseAngle ?? 0,
      size: m.size ?? 50,
    }));
}

const W = 650;
const H = 652;
const ORBIT_RADII = [150, 225, 320];
const ARC_DEG = 54;
const SPEEDS = [0.28, 0.2, 0.14];

function getOrbitTransform(member: OrbitMember, time: number) {
  const spd = SPEEDS[member.orbit] ?? SPEEDS[0];
  const angle =
    (ARC_DEG / 2) * Math.sin((time * spd * Math.PI) / 180) + member.baseAngle;
  const rad = (angle * Math.PI) / 180;
  const r = ORBIT_RADII[member.orbit] ?? ORBIT_RADII[0];
  const tx = r * Math.cos(rad);
  const ty = r * Math.sin(rad);
  return `translate(calc(${tx}px - 50%), calc(${ty}px - 50%))`;
}

export default function TeamOrbits({ members }: { members?: TeamMemberData[] }) {
  const teamMembers: OrbitMember[] = useMemo(() => {
    const cmsMembers = members?.length ? mapCmsMembers(members) : [];
    return cmsMembers.length ? cmsMembers : defaultTeamMembers;
  }, [members]);

  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    let last = performance.now();

    const tick = (now: number) => {
      if (!mounted) return;

      const dt = (now - last) / 16.67;
      last = now;
      timeRef.current += dt;

      teamMembers.forEach((member, i) => {
        const el = avatarRefs.current[i];
        if (!el) return;
        el.style.transform = getOrbitTransform(member, timeRef.current);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    teamMembers.forEach((member, i) => {
      const el = avatarRefs.current[i];
      if (!el) return;
      el.style.transform = getOrbitTransform(member, 0);
    });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [teamMembers]);

  return (
    <div className="relative team-orbit" style={{ width: W, height: H }}>
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

      <div
        className="absolute text-center z-10 pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <p
          className="font-normal text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(100px, 6.5vw, 100px)" }}
        >
          20+
        </p>
        <p
          className="text-white font-medium mt-2 tracking-widest uppercase"
          style={{ fontSize: "clamp(16px, 1.3vw, 20px)" }}
        >
          Team Members
        </p>
      </div>

      {teamMembers.map((member, i) => (
        <div
          key={member.id}
          ref={(el) => {
            avatarRefs.current[i] = el;
          }}
          className="absolute rounded-full overflow-hidden z-20"
          style={{
            width: member.size,
            height: member.size,
            top: "50%",
            left: "50%",
            transform: getOrbitTransform(member, 0),
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
          }}
        >
          <Image
            src={member.src}
            alt="team member"
            width={member.size}
            height={member.size}
            unoptimized={typeof member.src === "string"}
            className="w-full h-full object-cover block"
          />
        </div>
      ))}
    </div>
  );
}
