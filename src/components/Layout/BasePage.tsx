import Head from "next/head";
import React from "react";

import Footer from "./Footer/Footer";
import Menu from "./Menu/Menu";

type Props = {
  children: React.ReactNode;
  title: string;
  meta?: string;
  metaDesc?: string;
  metaTitle?: string;
};

export default function BasePage({
  children,
  title,
  meta,
  metaDesc,
  metaTitle,
}: Props) {
  return (
    <>
      <Head>
        <title>{title + " - Rider Jensen"}</title>
        {meta && <meta name="description" content={meta} key="desc" />}
        {metaDesc && <meta property="og:description" content={meta} />}
        {metaTitle && <meta property="og:title" content={metaTitle} />}
        <meta
          property="og:image"
          content="https://riderjensen.com/images/logo.png"
        />
      </Head>
      <div className="flex flex-col h-screen">
        <Menu />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  );
}
