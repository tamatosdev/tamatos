"use client";

import { useEffect, useRef } from "react";

export default function WorkHeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="block w-full h-auto rounded-[20px] lg:rounded-[24px]"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
