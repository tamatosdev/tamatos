import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import AosProvider from "@/components/AosProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaviconAnimator from "@/components/FaviconAnimator";
import { getSiteNavigation } from "@/lib/navigation";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Full Stack Digital Marketing agency",
  description: "Full Stack Digital Marketing agency in USA",
  icons: {
    icon: [
      { url: "/fav.gif", type: "image/gif" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/fav.gif",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Tamatos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tamatos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await getSiteNavigation();

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head />
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <FaviconAnimator />
        <LenisProvider>
          <AosProvider>
            <Header navigation={navigation} />
            {children}
            <Footer />
          </AosProvider>
        </LenisProvider>
      </body>
    </html>
  );
}