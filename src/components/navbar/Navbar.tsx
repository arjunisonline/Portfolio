import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
          <a href="/" onClick={(e) => handleNavClick(e, "/")} className="cursor-pointer hover:text-white/70 transition-colors duration-200">
            Home
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="cursor-pointer hover:text-white/70 transition-colors duration-200">
            About
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="cursor-pointer hover:text-white/70 transition-colors duration-200">
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
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="cursor-pointer hover:text-white/70 transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>

      <div className="flex md:hidden justify-between items-center p-4">
        <button 
          className="text-white z-50 p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/20" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div
          className={`fixed top-20 left-4 right-4 p-6 bg-black/80 backdrop-blur-xl rounded-2xl flex flex-col items-center gap-4 text-xl z-40 border-white/20 border shadow-2xl
transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <a href="/" onClick={(e) => handleNavClick(e, "/")} className="w-full text-center py-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer">
            Home
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="w-full text-center py-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer">
            About
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="w-full text-center py-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer">
            Projects
          </a>
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, "#experience")}
            className="w-full text-center py-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer"
          >
            Experience
          </a>
          <a href="#games" onClick={(e) => handleNavClick(e, "#games")} role="menuitem" className="w-full text-center py-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer">
            Games
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} role="menuitem" className="w-full text-center py-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer">
            Contact
          </a>
        </div>
      )}
    </>
  );
}
