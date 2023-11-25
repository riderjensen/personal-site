import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PostPreview } from "@types";

type Props = {
  preview: PostPreview;
};

export default function PreviewTile({ preview }: Props) {
  return (
    <div className="w-sm rounded-xl shadow-lg mb-4 bg-white m-1.5 sm:flex sm:w-full sm:max-w-6xl sm:mx-auto">
      <Image
        className="h-48 w-full object-cover rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl sm:max-w-xs sm:h-full sm:max-h-56"
        src={preview.img}
        alt={preview.alt}
        height={192}
        width={192}
      />
      <div className="p-8">
        <p className="text-sm pb-2">{preview.date}</p>
        <p className="font-bold text-lg">{preview.title}</p>
        <p className="text-slate-600">{preview.excerpt}</p>
        <p className="pt-2 text-right sm:text-left">
          <Link
            href={`/blog/${preview.id}`}
            className="text-indigo-700 hover:text-indigo-500"
          >
            Read {preview.title}
          </Link>
        </p>
      </div>
    </div>
  );
}
