import React from "react";
import {
  BasePage,
  BlogPreview,
  CallToAction,
  Hero,
  Projects,
} from "@components";
import { PostPreview } from "@types";

import { getSortedPostsData } from "../src/libs/posts";

type Props = {
  postPreviews: PostPreview[];
};

// Runs at build time
export async function getStaticProps() {
  const postPreviews = getSortedPostsData();
  return {
    props: {
      postPreviews,
    },
  };
}

const title = "Home";
const meta =
  "My hand crafted portfolio site where I have a brief introduction to who I am, links to my other social media and public code, and my blog where I detail things about my life both technical and non-technical.";

export default function Home({ postPreviews }: Props) {
  return (
    <BasePage
      title={title}
      meta={meta}
      metaDesc={meta}
      metaTitle={title}
    >
      <Hero />
      <Projects />
      <CallToAction />
      <BlogPreview postPreviews={postPreviews} />
    </BasePage>
  );
}
