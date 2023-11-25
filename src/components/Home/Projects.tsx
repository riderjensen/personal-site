import React from "react";
import {
  BoltIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="container mx-auto bg-white">
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="sm:text-center">
            <h2 className="text-md uppercase font-semibold leading-8 text-indigo-600">
              What I am up to
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              A Non-Exhaustive List
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              A closer look at a few projects I have worked on that I
              particularly enjoyed
            </p>
          </div>
          <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
            <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
              <div className="flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                  <BoltIcon />
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">
                    Rehype Class Names
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Why am I proud of a repository that only has one useful file
                    in it? Good things come in small packages of course! I
                    rewrote an open source package to include typescript support
                    on an HTML plugin syntax tree ecosystem since the previous
                    author was not interested. To date, it is my most downloaded
                    package on
                    <Link
                      className="underline text-indigo-500"
                      target="_blank"
                      referrerPolicy="strict-origin-when-cross-origin"
                      href="https://www.npmjs.com/package/rehype-class-names"
                    >
                      NPM
                    </Link>
                    and it is listed as a recommended by
                    <Link
                      className="underline text-indigo-500"
                      target="_blank"
                      referrerPolicy="strict-origin-when-cross-origin"
                      href="https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins"
                    >
                      Rehype
                    </Link>
                    . It&apos;s also used by
                    <Link
                      className="underline text-indigo-500"
                      target="_blank"
                      referrerPolicy="strict-origin-when-cross-origin"
                      href="https://github.com/nasa-gcn/gcn.nasa.gov"
                    >
                      NASA
                    </Link>
                    (Look mom, I&apos;m famous!). Contributing to open source,
                    no matter how small, is important and I am proud that
                    something I wrote could be user by others in any capacity.
                    <Link
                      className="underline text-indigo-500"
                      target="_blank"
                      referrerPolicy="strict-origin-when-cross-origin"
                      href="https://github.com/riderjensen/rehype-class-names"
                    >
                      Source
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                  <ScaleIcon />
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">
                    Crowdfunding an e-sports team
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Remember your first online gaming experience where a bunch
                    of nerds who play 24/7 gave you the beat down of a lifetime?
                    Well those nerds need money to play competitively since
                    prize pools just don&apos;t cut it. This project was a
                    Next.js frontend for the
                    <Link
                      className="underline text-indigo-500"
                      target="_blank"
                      referrerPolicy="strict-origin-when-cross-origin"
                      href="https://github.com/riderjensen/voting-back"
                    >
                      Neutral Stack
                    </Link>
                    backend which let users sign up and vote for the direction
                    of the team based on their overall contribution to a
                    crowdfunding initiative. Based on their given amount, users
                    can vote in polls that dictate the direction of the e-sports
                    team, allowing real people to shape the future instead of a
                    faceless corporation.
                    <Link
                      className="underline text-indigo-500"
                      target="_blank"
                      referrerPolicy="strict-origin-when-cross-origin"
                      href="https://github.com/riderjensen/voting-nextjs"
                    >
                      Source
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                  <GlobeAltIcon />
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">
                    Neutral Stack
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Ever wanted to make a poll but let some users have more say
                    than others? If you said yes, that is messed up (but I made
                    a tool for you). This project built with Node.js and mySQL
                    includes poll creation, user voting, and an API that is easy
                    to interact. Now you can explicitly tell people their voice
                    means less than others&apos;.
                    <Link
                      className="underline text-indigo-500"
                      target="_blank"
                      referrerPolicy="strict-origin-when-cross-origin"
                      href="https://github.com/riderjensen/voting-back"
                    >
                      Source
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                  <DevicePhoneMobileIcon />
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">
                    Lean List
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Lean List was my first foray into mobile development and
                    while I am no expert, I would be lying if I said I
                    didn&apos;t enjoy it. Built with Flutter and Firebase,
                    it&apos;s a native mobile application that allows for
                    multiple people to create, keep, and edit lists with other
                    people.
                    <Link
                      className="underline text-indigo-500"
                      target="_blank"
                      referrerPolicy="strict-origin-when-cross-origin"
                      href="https://github.com/riderjensen/leanlist"
                    >
                      Source
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
