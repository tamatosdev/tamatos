import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import AosProvider from "@/components/AosProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaviconAnimator from "@/components/FaviconAnimator";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full Stack Digital Marketing agency",
  description: "Full Stack Digital Marketing agency in USA",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <FaviconAnimator />
          <LenisProvider>
            <AosProvider>
              <Header />
              <PageTransition>
                {children}
              </PageTransition>
              <Footer />
            </AosProvider>
          </LenisProvider>
        </body>
    </html>
  );
}
