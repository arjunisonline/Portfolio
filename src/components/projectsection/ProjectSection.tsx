import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(_ScrollTrigger);

export default function ProjectSection() {
  const projectData = [
    {
      name: "Nikee",
      desc: "At Nikee, we blend innovation and style to create footwear that performs and inspires. Whether you're on the street or the track, our mission is to elevate your every step.",
      link: "https://nikee-ecommerce-1.onrender.com",
      codelink: "https://github.com/arjunisonline/Nikee-ecommerce",
      skills: ["API Design", "MERN", "Render", "Data Modeling", "Deployment"],
    },
    {
      name: "Car Vista",
      desc: "A CRUD-based web application built with PHP for managing car listings. The system allows administrators to add, update, and remove vehicle details while providing users with an interface to view available cars. Designed with a focus on database management and structured backend logic.",
      link: "https://nikee-ecommerce-1.onrender.com",
      codelink: "https://github.com/arjunisonline/carvista",
      skills: ["php", "MySql", "Netlify", "Deployment"],
    },
    {
      name: "Task Manager",
      desc: "A web-based task management application that allows users to create, update, and track tasks efficiently. The system implements CRUD functionality with a clean interface for organizing tasks and managing workflow.",
      link: "https://task-manager-1-a6hb.onrender.com/login",
      codelink: "https://github.com/arjunisonline/Task-Manager",
      skills: ["React", "Render", "Netlify", "Deployment"],
    },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".project-card",
        { y: -80, opacity: 0 },
        {
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    },
    {
      scope: sectionRef,
    },
  );
  return (
    <>
      <section id="projects" ref={sectionRef}>
        <h1 className="text-center text-4xl md:text-6xl">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 m-4 md:m-30">
          {projectData.map((item, index) => (
            <div
              key={index}
              className="m-5  border-2 border-white/50 backdrop-blur-xs bg-white/5 transition hover:border-(--primaryColor) rounded-2xl p-2 flex justify-center project-card"
            >
              <div className="flex flex-col gap-3 w-full">
                {/* <div className="h-full w-full flex items-center ">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div> */}

                <h2 className="font-bold text-start text-2xl text-(--primaryColor)">
                  {item.name}
                </h2>
                <p className="text-md text-gray-300 ">{item.desc}</p>
                <div className="grid grid-cols-3 gap-5 items-center">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs border border-white/20 rounded-full text-center"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    target="_blank"
                    href={item.link}
                    className="flex items-center justify-center gap-1 p-2 border border-white/20 rounded-xl hover:bg-white/40 w-full text-sm cursor-pointer"
                  >
                    <MdArrowOutward />
                    Demo
                  </a>

                  <a
                    target="_blank"
                    href={item.codelink}
                    className="flex items-center justify-center p-2 bg-white/20 rounded-xl hover:bg-white/40 w-full text-sm cursor-pointer"
                  >
                    Github
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
