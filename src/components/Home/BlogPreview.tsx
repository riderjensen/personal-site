import React from "react";
import { PostPreview } from "@types";
import { PreviewTile } from "@components";

type props = {
  postPreviews: PostPreview[];
};

export default function BlogPreview({ postPreviews }: props) {
  return (
    <div className="container mx-auto mt-10">
      <section className="container mx-auto">
        <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 pb-8 sm:text-4xl">
          Blog
        </h2>
        <div className="block">
          {postPreviews.map((post) => (
            <PreviewTile key={post.id} preview={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
