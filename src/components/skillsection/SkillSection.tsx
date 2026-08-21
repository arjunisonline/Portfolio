import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const languagesData = [
  { img: "skills/languages/html.svg", title: "HTML" },
  { img: "skills/languages/css.svg", title: "CSS" },
  { img: "skills/languages/js.svg", title: "Javascript" },
  { img: "skills/languages/typescript.svg", title: "Typescript" },
  { img: "skills/languages/java.svg", title: "Java" },
  { img: "skills/languages/mongodb.svg", title: "MongoDB" },
  { img: "skills/languages/mysql.svg", title: "MySQL" },
];

const frameworkData = [
  { img: "skills/languages/angular.svg", title: "Angular" },
  { img: "skills/languages/react.svg", title: "React" },
  { img: "skills/languages/tailwind.svg", title: "Tailwind" },
  { img: "skills/languages/exp.png", title: "Express" },
  { img: "skills/languages/next.svg", title: "Next.js" },
  { img: "https://img.icons8.com/doodle/48/svetle.png", title: "Svelte" },
];

const toolsData = [
  { img: "skills/firebase.svg", title: "Firebase" },
  { img: "skills/git.svg", title: "Git" },
  { img: "skills/github.svg", title: "Github" },
  { img: "skills/intellij.svg", title: "IntelliJ" },
  { img: "skills/netlify.svg", title: "Netlify" },
  { img: "skills/postman.svg", title: "Postman" },
  { img: "skills/sublime.svg", title: "Sublime" },
  { img: "skills/vs.svg", title: "VS Code" },
];

const aiToolsData = [
  {
    img: "https://img.icons8.com/fluency/48/chatgpt--v2.png",
    title: "ChatGPT",
  },
  {
    img: "https://img.icons8.com/fluency/48/bard.png",
    title: "Gemini",
  },
  {
    img: "https://img.icons8.com/fluency/48/perplexity-ai.png",
    title: "Perplexity",
  },
  { img: "https://cdn.simpleicons.org/githubcopilot/white", title: "Copilot" },
  {
    img: "https://img.icons8.com/fluency/48/claude-ai.png",
    title: "Claude",
  },
];

const firstLoopedSkills = [
  ...languagesData,
  ...languagesData,
  ...languagesData,
  ...languagesData,
];
const secondLoopedSkills = [
  ...frameworkData,
  ...frameworkData,
  ...frameworkData,
  ...frameworkData,
];
const thirdLoopedSkills = [
  ...toolsData,
  ...toolsData,
  ...toolsData,
  ...toolsData,
];
const fourthLoopedSkills = [
  ...aiToolsData,
  ...aiToolsData,
  ...aiToolsData,
  ...aiToolsData,
];

import GithubGraph from "../github/GithubGraph";

export default function SkillSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstTrackRef = useRef<HTMLDivElement>(null);
  const secondTrackRef = useRef<HTMLDivElement>(null);
  const thirdTrackRef = useRef<HTMLDivElement>(null);
  const fourthTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const firstTrack = firstTrackRef.current;
      const secondTrack = secondTrackRef.current;
      const thirdTrack = thirdTrackRef.current;
      const fourthTrack = fourthTrackRef.current;
      if (!firstTrack || !secondTrack || !thirdTrack || !fourthTrack) return;

      const totalWidth = firstTrack.scrollWidth / 4;

      // Scroll left
      gsap.to(firstTrack, {
        x: `-=${totalWidth}`,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      gsap.to(thirdTrack, {
        x: `-=${totalWidth}`,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      // Scroll right (opposite direction)
      gsap.fromTo(
        secondTrack,
        { x: -totalWidth },
        {
          x: 0,
          duration: 30,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
          },
        },
      );

      gsap.fromTo(
        fourthTrack,
        { x: -totalWidth },
        {
          x: 0,
          duration: 30,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className="overflow-x-hidden py-16 mx-4 md:mx-10 lg:mx-30 min-h-dvh flex flex-col justify-center">
      <h2 className="text-center text-4xl md:text-6xl mb-12">My Skills</h2>

      <div ref={containerRef} className="overflow-hidden w-full mb-16">
        <div
          ref={firstTrackRef}
          className="flex items-center gap-10 w-max will-change-transform"
        >
          {firstLoopedSkills.map((data, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default select-none"
              style={{ minWidth: "160px" }}
            >
              <img
                src={data.img}
                alt={data.title}
                className="w-8 h-8 object-contain"
              />
              <p className="text-md font-medium whitespace-nowrap">
                {data.title}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={secondTrackRef}
          className="flex items-center gap-10 w-max my-6"
        >
          {secondLoopedSkills.map((data, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default select-none"
              style={{ minWidth: "160px" }}
            >
              <img
                src={data.img}
                alt={data.title}
                className="w-8 h-8 object-contain"
              />
              <p className="text-md font-medium whitespace-nowrap">
                {data.title}
              </p>
            </div>
          ))}
        </div>
        <div ref={thirdTrackRef} className="flex items-center gap-10 w-max">
          {thirdLoopedSkills.map((data, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default select-none"
              style={{ minWidth: "160px" }}
            >
              <img
                src={data.img}
                alt={data.title}
                className="w-8 h-8 object-contain"
              />
              <p className="text-md font-medium whitespace-nowrap">
                {data.title}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={fourthTrackRef}
          className="flex items-center gap-10 w-max mt-6"
        >
          {fourthLoopedSkills.map((data, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default select-none"
              style={{ minWidth: "160px" }}
            >
              <img
                src={data.img}
                alt={data.title}
                className="w-8 h-8 object-contain"
              />
              <p className="text-md font-medium whitespace-nowrap">
                {data.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <GithubGraph />
    </section>
  );
}
