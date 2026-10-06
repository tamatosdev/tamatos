"use client";

import dynamic from "next/dynamic";

const NotFoundBreakout = dynamic(() => import("@/components/NotFoundBreakout"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[300]" style={{ backgroundColor: "#0a0a0c" }} />
  ),
});

export default function NotFoundClient() {
  return <NotFoundBreakout />;
}
