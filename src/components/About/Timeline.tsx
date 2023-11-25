import React from "react";
import { WorkHistory } from "@types";

const history: WorkHistory[] = [
  {
    name: "Web Area Developer",
    company: "Utah Valley University",
    date: "Feb 2018",
  },
  {
    name: "Full Stack Developer",
    company: "Zurixx",
    date: "May 2019",
  },
  {
    name: "Site Reliability Engineer (SRE)",
    company: "Adobe Workfront",
    date: "Dec 2019",
  },
  {
    name: "Software Engineer",
    company: "Adobe",
    date: "Jan 2021",
  },
  {
    name: "Software Engineer",
    company: "Dashlane",
    date: "Mar 2022",
  },
  {
    name: "Software Engineer",
    company: "SageSure",
    date: "Jul 2023",
  },
];

export default function Timeline() {
  return (
    <div className="max-w-2xl mx-auto py-10" id="timeline">
      <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 mb-10 sm:text-4xl">
        Work History
      </h2>
      <ol className="relative border-l border-gray-200 mx-6">
        {history.map((item) => (
          <li key={item.date} className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-gray-900 bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400">
              {item.date}
            </time>
            <h3 className="text-lg font-semibold text-gray-900">
              {item.company}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-400">
              {item.name}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
