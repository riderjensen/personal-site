import React from "react";
import { AppProps } from "next/app";
import AnalyticsWrapper from "src/utils/AnalyticsWrapper";

import "../public/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnalyticsWrapper>
      <Component {...pageProps} />
    </AnalyticsWrapper>
  );
}
