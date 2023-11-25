import React from "react";
import Script from "next/script";
import { useRouter } from "next/router";

declare global {
  interface Window {
    gtag: any;
  }
}

const GA_TRACKING_ID = "G-VBNTEFBG75";

export default function AnalyticsWrapper({ children }: any) {
  // Tracks page views
  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="neutralStack-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}');
          `}
      </Script>
      {children}
    </>
  );
}
