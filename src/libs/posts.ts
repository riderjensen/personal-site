import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import addClasses from "rehype-class-names";
import { Post, PostPreview } from "@types";

const postsDirectory = path.join(process.cwd(), "src/posts");

export function getSortedPostsData(): PostPreview[] {
  // Get file names under /posts
  const entries = fs.readdirSync(postsDirectory, {
    withFileTypes: true,
  });
  const allPostsData: PostPreview[] = entries
    .filter((entry) => entry.isFile())
    .map((file) => {
      // Remove ".md" from file name to get id
      const id = file.name.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, file.name);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      // Combine the data with the id
      return {
        id,
        date: matterResult.data.date,
        title: matterResult.data.title,
        excerpt: matterResult.data.excerpt,
        img: `/images/${matterResult.data.img}`,
        alt: matterResult.data.img,
      };
    });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(addClasses, {
      p: "py-3",
      h2: "text-2xl py-4 font-semibold",
      h3: "text-xl py-4 font-semibold",
      h4: "text-lg py-4 font-semibold",
      a: "underline text-indigo-700",
      code: "bg-gray-200 rounded-md",
      pre: "p-4 bg-gray-200 rounded-lg leading-snug overflow-y-auto",
      img: "m-auto",
      li: "list-decimal ml-8",
      blockquote: "px-6",
      // Workaround for no captions in markdown
      em: "text-center block"
    })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    date: matterResult.data.date,
    title: matterResult.data.title,
    img: `/images/${matterResult.data.img}`,
    alt: matterResult.data.img,
    excerpt: matterResult.data.excerpt,
  };
}

export type PostIDs = {
  params: {
    id: string;
  };
};
export function getAllPostIds(): PostIDs[] {
  const entries = fs.readdirSync(postsDirectory, {
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile())
    .map((file) => {
      return {
        params: {
          id: file.name.replace(/\.md$/, ""),
        },
      };
    });
}
