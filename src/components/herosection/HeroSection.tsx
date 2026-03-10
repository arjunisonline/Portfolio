import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to(".nameScramble", {
        duration: 2,
        scrambleText: {
          text: "Arjun",
          chars: "xyz",
          revealDelay: 0.1,
          speed: 0.1,
        },
      });
      tl.to(".textScramble", {
        duration: 2,
        text: "I'm a software engineer who turns complex ideas into performant, user-friendly web applications",
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-dvw h-dvh relative flex flex-col items-center justify-center px-6"
    >
      <div className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
          Hi, I am{" "}
          <span className="text-(--primaryColor) nameScramble">Arjun</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl min-h-[40px] textScramble"></h2>
      </div>
      <div className="flex my-10 gap-5">
        <a href="/resume" target="_blank" className="px-3 py-1 backdrop-blur-md border border-white/40 rounded-xl text-md xl:text-xl">Resume</a>
        <a href="#contact" className="px-3 py-1 backdrop-blur-md border border-white/40 rounded-xl text-md xl:text-xl">Hire Me</a>
      </div>
    </div>
  );
}
