import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { useLocation, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to hash on mount if navigating from another page
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        lenis?.scrollTo(location.hash);
      }, 100);
    }
  }, [location, lenis]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    if (target === "/") {
      if (location.pathname === "/") {
        lenis?.scrollTo(0);
      } else {
        navigate("/");
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate("/" + target);
    } else {
      lenis?.scrollTo(target);
    }
  };

  useGSAP(() => {
    let lastscroll = 0;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        if (currentScroll > lastscroll && currentScroll > 50) {
          gsap.to(navRef.current, { y: -120, duration: 3, ease: "power2.out" });
        } else if (currentScroll < lastscroll) {
          gsap.to(navRef.current, { y: 0, duration: 3, ease: "power2.out" });
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
          <a href="/" onClick={(e) => handleNavClick(e, "/")}>
            Home
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
            About
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}>
            Projects
          </a>
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, "#experience")}
          >
            Experience
          </a>
          <a href="#games" onClick={(e) => handleNavClick(e, "#games")}>
            Games
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
            Contact
          </a>
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
          <a href="/" onClick={(e) => handleNavClick(e, "/")}>
            Home
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
            About
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}>
            Projects
          </a>
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, "#experience")}
          >
            Experience
          </a>
          <a href="#games" onClick={(e) => handleNavClick(e, "#games")}>
            Games
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
            Contact
          </a>
        </div>
      )}
    </>
  );
}
