import React from "react";
import PreviewTile from "../../src/components/Home/PreviewTile";
import { getSortedPostsData } from "../../src/libs/posts";
import { BasePage } from "@components";
import { PostPreview } from "@types";

type Props = {
  postData: PostPreview[];
};

// Runs at build time
export async function getStaticProps() {
  const postData = getSortedPostsData();
  return {
    props: {
      postData,
    },
  };
}

const title = "Blog";
const meta =
  "My blog where I post all kinds of articles related to my life, technology, and anything that catches my fancy including movies, deep thoughts, and quotes. Maybe even a cooking recipe or two?";

export default function Index({ postData }: Props) {
  return (
    <BasePage title={title} meta={meta} metaDesc={meta} metaTitle={title}>
      <article>
        <h1 className="text-center text-3xl p-5">Recent Posts</h1>
        <div className="container mx-auto">
          {postData.map((preview: PostPreview) => (
            <PreviewTile key={preview.id} preview={preview} />
          ))}
        </div>
      </article>
    </BasePage>
  );
}
