import React from "react";
import { parseISO, format } from "date-fns";
import { BasePage, PreviewTile } from "@components";
import { getAllPostIds, getPostData, getSortedPostsData } from "src/libs/posts";
import { PostPreview, Post as PostType } from "@types";

type Params = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const [postData, sortedPosts] = await Promise.all([
    getPostData(params.id),
    getSortedPostsData(),
  ]);

  // I want to point users to another blog post at the bottom of each post
  // If I look at the sorted items (most recent post is in index 0), I can
  // find the current most and retrieve the ones on either side of them
  const currentPostIndex = sortedPosts.findIndex(
    (post) => post.id === postData.id
  );
  // Find the next posts in either direction but if they are out of bounds, we return null
  const right = sortedPosts[currentPostIndex + 1] ?? null;
  const left = sortedPosts[currentPostIndex - 1] ?? null;

  return {
    props: {
      postData,
      right,
      left,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

type Props = {
  postData: PostType;
  right: PostPreview | null;
  left: PostPreview | null;
};

export default function Post({ postData, right, left }: Props) {
  return (
    <BasePage
      title={postData.title}
      metaTitle={postData.title}
      meta={postData.excerpt}
      metaDesc={postData.excerpt}
      metaImg={postData.img}
    >
      <div className="container mx-auto p-4 lg:px-10">
        <article>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-2">
            {postData.title}
          </h1>
          <div className="text-sm">
            <time dateTime={postData.date}>
              {format(parseISO(postData.date), "LLLL d, yyyy")}
            </time>{" "}
            by Rider Jensen
          </div>
          <div
            className="py-5"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </article>
      </div>
      <div className="container mx-auto py-12 px-6 lg:py-16 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 text-center">
          Further Reading
        </h2>
        {left && <PreviewTile preview={left} />}
        {right && <PreviewTile preview={right} />}
      </div>
    </BasePage>
  );
}
