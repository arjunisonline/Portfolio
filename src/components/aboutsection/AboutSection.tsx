import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { IoLocation } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".about-item", {
        y: -80,
        opacity: 0,
        duration: 2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <section
        id="about"
        ref={containerRef}
        className="min-h-dvh flex flex-col justify-center py-16"
      >
        <h1 className="text-center text-4xl md:text-6xl">About Me</h1>
        <div className="mx-4 md:mx-10 lg:mx-30">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly my-10 md:my-30">
            <div className="space-y-5 about-item">
              <p className="leading-relaxed xl:text-xl">
                Hi, I'm Arjun. I'm a software developer focused on building
                scalable, fast, and reliable applications. I enjoy the entire
                process of turning raw ideas into polished products and tackling
                complex infrastructure challenges along the way.
              </p>

              <p className="leading-relaxed xl:text-xl">
                When I'm off the clock, I'm usually tinkering with my home
                server, creating content for social media, or playing
                competitive games. I'm always exploring new technologies to see
                how they can improve the way we build and deploy on the web.
              </p>
              <div className="inline-flex gap-3 p-3 items-center border border-white/40 bg-white/5 backdrop-blur-sm rounded-2xl text-md xl:text-xl">
                <IoLocation fill="white" />
                <p>Kerala, India</p>
              </div>

              <div className="flex gap-10 about-item justify-start">
                <a href="mailto:arjunisonlinee@gmail.com">
                  <img
                    src="/images/gmail.svg"
                    className="h-10 w-10 object-contain"
                    alt="Gmail"
                  />
                </a>
                <a href="https://github.com/arjunisonline">
                  <img
                    src="/images/github.svg"
                    className="h-10 w-10 object-contain"
                    alt="GitHub"
                  />
                </a>
                <a href="https://www.linkedin.com/in/arjunssisonlinee/">
                  <img
                    src="/images/ln.svg"
                    className="h-10 w-10 object-contain"
                    alt="LinkedIn"
                  />
                </a>
              </div>
            </div>

            <div className="about-item flex flex-col bg-[#1E1E1E]/80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/10 w-full lg:max-w-md mx-auto h-auto min-h-[250px] lg:min-h-[300px]">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 bg-[#2D2D2D]/90 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs text-gray-400 font-mono select-none">
                  arjun@macbook:~
                </div>
              </div>
              {/* Terminal Body */}
              <div className="p-4 md:p-6 font-mono text-sm md:text-base text-green-400 flex-1 overflow-y-auto space-y-3">
                <div className="flex gap-2">
                  <span className="text-blue-400 font-bold">~</span>
                  <span className="text-white">$</span>
                  <span className="text-white">whoami</span>
                </div>
                <div className="text-gray-300">arjun</div>

                <div className="flex gap-2 mt-4">
                  <span className="text-blue-400 font-bold">~</span>
                  <span className="text-white">$</span>
                  <span className="text-white">./status.sh</span>
                </div>
                <div className="text-yellow-300/90 break-words">
                  [ONLINE] Building the future.
                </div>

                <div className="flex gap-2 mt-4">
                  <span className="text-blue-400 font-bold">~</span>
                  <span className="text-white">$</span>
                  <span className="w-2.5 h-5 bg-gray-400 inline-block animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
