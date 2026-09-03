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
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="hero-section w-full h-dvh relative flex flex-col items-center justify-center px-6"
    >
      <div className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
          Hi, I am{" "}
          <span className="text-(--primaryColor) nameScramble">Arjun</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl min-h-10 textScramble"></h2>
      </div>
    </div>
  );
}
