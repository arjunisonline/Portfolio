import { useState, useEffect } from "react";
import AboutSection from "../../components/aboutsection/AboutSection";
import ContactSection from "../../components/contactsection/ContactSection";
import ExperienceSection from "../../components/expsection/ExpSection";
import Footer from "../../components/footer/Footer";
import HeroSection from "../../components/herosection/HeroSection";
import Navbar from "../../components/navbar/Navbar";
import ProjectSection from "../../components/projectsection/ProjectSection";
import SkillSection from "../../components/skillsection/SkillSection";

export default function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Fallback: dismiss loading screen after 3.5s in case loading takes too long
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
          isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#58a0ff] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-sm tracking-widest text-white/60 uppercase animate-pulse">
            Loading
          </p>
        </div>
      </div>

      <div className="relative w-full min-h-full">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`fixed top-0 left-0 w-full h-full object-cover -z-10 transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-30" : "opacity-0"
          }`}
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>

        <Navbar />

        <HeroSection />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
        <ExperienceSection />
        <ContactSection />

        <Footer />
      </div>
    </>
  );
}
