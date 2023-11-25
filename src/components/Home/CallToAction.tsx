import Link from "next/link";
import React from "react";

export default function CallToAction() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <div>
        <h2 className="text-3xl pb-4 block text-indigo-600 font-bold tracking-tight sm:text-4xl">
          <span className="block">Still not impressed?</span>
        </h2>
        <p className="text-gray-900 text-lg">
            Geez well I also write blog posts about technical and non-technical things that are sometimes funny. Or maybe you need to learn even more about me?
        </p>
        </div>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Blog
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              About Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}