import React from "react";
import Link from "next/link";

export default function Links() {
  return (
    <>
      <Link
        href="/about"
        className="font-semibold text-gray-900 hover:text-gray-900 block px-4 py-3 lg:px-0 lg:py-0 hover:text-indigo-700"
      >
        About
      </Link>
      <Link
        href="/blog"
        className="font-semibold text-gray-900 hover:text-gray-900 block px-4 py-3 lg:px-0 lg:py-0 hover:text-indigo-700"
      >
        Blog
      </Link>
      <Link
        href="https://github.com/riderjensen"
        target="_blank"
        referrerPolicy="strict-origin-when-cross-origin"
        className="font-semibold text-gray-900 hover:text-gray-900 block px-4 py-3 lg:px-0 lg:py-0 hover:text-indigo-700"
      >
        Github
      </Link>
      <Link
        href="https://www.linkedin.com/in/rider-jensen/"
        target="_blank"
        referrerPolicy="strict-origin-when-cross-origin"
        className="font-semibold text-gray-900 hover:text-gray-900 block px-4 py-3 lg:px-0 lg:py-0 hover:text-indigo-700"
      >
        LinkedIn
      </Link>
    </>
  );
}
