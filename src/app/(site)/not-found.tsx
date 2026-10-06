import type { Metadata } from "next";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata: Metadata = {
  title: "404 — Page missing | Tamatos",
  description: "This page is missing. Might as well play.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundClient />;
}
