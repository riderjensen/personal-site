import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-gray-50 mt-5">
      <div className="mx-auto max-w-7xl py-6 px-3 lg:flex lg:items-center lg:justify-between lg:py-8 lg:px-4">
        <p className="w-full tracking-tight text-left">View the <Link className="underline" target="_blank" href="https://github.com/riderjensen/personal-site">codebase</Link></p>
        <p className="w-full font-bold tracking-tight text-indigo-700 text-right">
          {new Date().getFullYear()} Rider Jensen. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
