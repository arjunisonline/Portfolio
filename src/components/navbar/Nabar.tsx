import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);

  useGSAP(() => {
    let lastscroll = 0;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        if (currentScroll > lastscroll) {
          gsap.to(navRef.current, { y: -120, duration: 0.1 });
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.1 });
        }

        lastscroll = currentScroll;
      },
    });
  });

  return (
    <>
      <div className="hidden md:flex justify-center">
        <div
          ref={navRef}
          className="z-50 fixed top-10 left-1/2 -translate-x-1/2 flex gap-10 max-w-3xl h-15 text-xl bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl items-center px-8"
        >
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="flex md:hidden justify-between items-center p-4">
        <button className="text-4xl z-50" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {isOpen && (
        <div
          className={`fixed top-15 left-4 right-4 p-6 backdrop-blur-lg rounded-2xl border flex flex-col items-center gap-6 text-xl z-40 border-white/20
transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      )}
    </>
  );
}
