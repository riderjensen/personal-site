import React from "react";
import { WorkHistory } from "@types";

const history: WorkHistory[] = [
  {
    name: "Software Engineer",
    company: "SageSure",
    date: "Jul 2023",
    description:
      "Lead Frontend Software Engineer for an internal product, I own the entire frontend scope, utilizing React.js and TypeScript. I work closely with stakeholders and the product team to transform ideas from conception to code completion. Committed to delivering high-quality, user-centric solutions, I contribute to a robust testing environment by writing unit tests and end-to-end tests. Additionally, I collaborate with cross-functional teams to create and enhance components within our internal design system.",
  },
  {
    name: "Software Engineer",
    company: "Dashlane",
    date: "Mar 2022",
    description:
      "In charge of architecting, developing, improving, and maintaining the Dashlane web applications and the Dashlane browser extensions. Used the latest front-end technologies such as TypeScript, React, and Redux, to build an incredible product and handle complicated challenges in order to make the Dashlane feature set available to any browser on any device. Collaborated with the product, design, and QA teams to constantly improve the user experience.",
  },
  {
    name: "Software Engineer",
    company: "Adobe",
    date: "Jan 2021",
    description:
      "Worked in an Agile environment and estimated assigned work, created OO designs, provided task breakdowns and implemented features and microservices using Java, PHP, web technologies (JavaScript, React) and multiple frameworks (Docker, AWS, GCP).",
  },
  {
    name: "Site Reliability Engineer (SRE)",
    company: "Adobe Workfront",
    date: "Dec 2019",
    description:
      "Assisted the team in turning high-touch manual processes into fully automatic solutions, and maintaining and improving existing automations. Developed an understanding of automation and orchestration procedures to automate wherever and whenever possible while eliminating technical debt. Working with the team to find optimizations and other efficiencies in order to scale applications and services. Communicated end-to-end configuration, technical dependencies, and overall behavioral characteristics of the production services. Helped senior and principal SREs guide development teams to engineer scalable, fail-safe, and optimized solutions to the Workfront product suite.",
  },
  {
    name: "Full Stack Developer",
    company: "Zurixx",
    date: "May 2019",
    description:
      "Main in-house developer, worked with marketing to create solutions that would result in lead generation. Decreased average marketing web page load time by 76%. Worked directly on server setting up websites, creating virtual hosts, setting permissions, also had experience setting up both dev and prod environments. Very familiar with Linux environments, mainly Centos7. Worked on creating new functionality to already existing platforms including working with pre-existing APIs and APIs provided from third parties. Worked in a CI/CD environment using git for version control.",
  },
  {
    name: "Web Area Developer",
    company: "Utah Valley University",
    date: "Feb 2018",
    description:
      "Used front-end frameworks and libraries with HTML, CSS, and JS knowledge to create websites for customers from conception to deployment.",
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
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
