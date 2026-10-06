import { Poppins } from "next/font/google";
import "@/sanity/studio-custom.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Sanity Studio",
};

export default function StudioToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={poppins.className}>{children}</div>;
}
