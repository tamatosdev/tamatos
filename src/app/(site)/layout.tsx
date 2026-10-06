import Script from "next/script";
import LenisProvider from "@/components/LenisProvider";
import AosProvider from "@/components/AosProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaviconAnimator from "@/components/FaviconAnimator";
import { getSiteNavigation } from "@/lib/navigation";

const GA_MEASUREMENT_ID = "G-0BL6G014K9";
const CLARITY_PROJECT_ID = "y1tm0y8i23";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await getSiteNavigation();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>
      <FaviconAnimator />
      <LenisProvider>
        <AosProvider>
          <Header navigation={navigation} />
          {children}
          <Footer />
        </AosProvider>
      </LenisProvider>
    </>
  );
}
