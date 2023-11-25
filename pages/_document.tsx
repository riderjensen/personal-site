import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

// This file is purely to stop the flash of unstyled content
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Script src="/theme.js" strategy="beforeInteractive" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
