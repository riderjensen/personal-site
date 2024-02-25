import React from "react";
import { BasePage, Interests, Quotes, Statement, Timeline } from "@components";

const title = "About Me";
const meta =
  "All about me including two of my favorite quotes, a list of interests and my work history organized on a timeline.";

export default function Index() {
  return (
    <BasePage title={title} meta={meta} metaDesc={meta} metaTitle={title}>
      <Statement />
      <Quotes />
      <Interests />
      <Timeline />
    </BasePage>
  );
}
