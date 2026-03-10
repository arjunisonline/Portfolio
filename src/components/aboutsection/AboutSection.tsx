import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
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
      <section id="about" ref={containerRef}>
        <h1 className="text-center text-4xl md:text-6xl">About Me</h1>
        <div className="mx-4 md:mx-30">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-evenly my-10 md:my-30 items-center">
            <div className="about-item md:w-md md:h-md h-xs w-xs mx-auto rounded-full overflow-hidden bg-cyan-50 mb-5">
              <img
                src="images/img.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-5 about-item">
              <p className="leading-relaxed">
                Hi, I'm Arjun — a software developer who spends most of his time
                convincing computers to do what they were literally designed to
                do. I mainly work with React and Node, building modern web and
                mobile applications that are scalable, fast, and (hopefully)
                bug-free. I enjoy turning random ideas into working products and
                fixing existing systems when they inevitably break — usually
                because of a missing semicolon somewhere.
              </p>

              <p className="leading-relaxed">
                When I'm not writing code, I'm probably still writing code… just
                for my home server. Currently experimenting with things like
                Docker, Pi-hole, and Home Assistant, because apparently hosting
                services exist but where's the fun in not breaking your own
                infrastructure first?
              </p>

              <p className="leading-relaxed">
                Outside of development, I spend time surfing the web, playing
                games, making content for social media, and occasionally
                rage-quitting Valorant while blaming ping, teammates, or the
                universe in general.
              </p>
              <div className="inline-flex gap-3 p-3 items-center border border-white/40 bg-white/5 backdrop-blur-sm rounded-2xl">
                <IoLocation fill="white" />
                <p>Kerala, India</p>
              </div>

              <div className="flex gap-10 about-item justify-center">
                <a href="mailto:arjunisonlinee@gmail.com">
                  <img src="/images/gmail.svg" alt="h-20 w-20 object-contain" />
                </a>
                <a href="https://github.com/arjunisonline">
                  <img
                    src="/images/github.svg"
                    alt="h-20 w-20 object-contain"
                  />
                </a>
                <a href="https://www.linkedin.com/in/arjunssisonlinee/">
                  <img src="/images/ln.svg" alt="h-20 w-20 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
