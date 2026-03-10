import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const data = [
  {
    position: "Associate Software Engineer",
    company: "Cloud Forest Innovationss",
    time: "Jan 2026 - Present",
    desc: [
      "Delivered a production-grade static website using React with Strapi CMS, enabling non-technical teams to manage content independently.",
      " Developed a cross-platform invoicing application for event management using Flutter with Hive for local data persistence.",
      " Owned production debugging and issue resolution, reducing downtime and stabilizing live customer-facing systems.",
      "  Collaborated with designers and stakeholders to translate business requirements into deployable features.",
    ],

    skills: ["Debugging", "Clean Codes", "System Architecture", "SEO"],
  },
  {
    position: "MERN Stack Intern",
    company: "MashupStack",
    time: "Dec 2024 - July 2025",
    desc: [
      "Completed a full-stack web development internship using MongoDB, Express.js, React.js, and Node.js. ",
      "Learned to create web applications with user-friendly interfaces and connected them to a backend server and database. ",
      " Worked on building features like login, form handling, and data display. ",
      " Gained experience in writing APIs, using Git, and deploying apps online.",
    ],

    skills: ["MongoDB", "ExpressJS", "React", "NodeJS"],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".exp-card", {
        y: -80,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },

    {
      scope: sectionRef,
    },
  );
  return (
    <section id="experience" ref={sectionRef}>
      <h1 className="text-center text-4xl md:text-6xl mb-20">Experience</h1>

      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4">
        <div className="absolute left-6 top-2 h-full w-[2px] bg-white/20"></div>

        {data.map((item, index) => (
          <div key={index} className="relative pl-12 mb-16 exp-card">
            <div className="absolute left-[2px] top-2 w-4 h-4 bg-(--primaryColor) rounded-full"></div>

            <div className="border border-white/20 rounded-xl p-6 backdrop-blur-sm bg-white/5 hover:border-(--primaryColor) transition">
              <h3 className="text-2xl font-bold">{item.position}</h3>

              <p className="text-(--primaryColor) font-semibold">
                {item.company}
              </p>

              <p className="text-sm text-gray-400 mb-3">{item.time}</p>

              <div className="flex flex-col gap-2">
                {item.desc.map((desc, i) => (
                  <p key={i} className="text-gray-300 text-sm leading-relaxed">
                    • {desc}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {item.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs border border-white/20 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
