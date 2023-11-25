import React from "react";
import {
  BasePage,
  Goals,
  Products,
  Statement,
  Timeline,
} from "@components";

const title = "About Me | Riderjensen.com";
const meta =
  "All about Rider Jensen including two of my favorite quotes, a list of interests and my work history organized on a timeline.";
const metaImage =
  "https://riderjensen.com/_next/image?url=%2Fimages%2Flogo.png";

export default function Index() {
  return (
    <BasePage
      title={title}
      meta={meta}
      metaDesc={meta}
      metaTitle={title}
      metaImage={metaImage}
    >
      <Statement />
      <Goals />
      <Products />
      <Timeline />
    </BasePage>
  );
}
