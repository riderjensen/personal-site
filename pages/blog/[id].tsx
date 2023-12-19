import React from "react";
import { parseISO, format } from "date-fns";
import { BasePage } from "@components";
import { getAllPostIds, getPostData } from "../../src/libs/posts";
import { Post as PostType } from "@types";

type Params = {
  params: {
    id: string;
  };
};

// Runs at build time
export async function getStaticProps({ params }: Params) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

// Runs at build time
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

type Props = {
  postData: PostType;
};

export default function Post({ postData }: Props) {
  return (
    <BasePage title={postData.title}>
      <div className="container mx-auto p-4 lg:px-10">
        <article>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-2">
            {postData.title}
          </h1>
          <div className="text-sm">
            <time dateTime={postData.date}>
              {format(parseISO(postData.date), "LLLL d, yyyy")}
            </time> by Rider Jensen
          </div>
          <div
            className="py-5"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </article>
      </div>
    </BasePage>
  );
}
