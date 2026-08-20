import AboutSection from "../../components/aboutsection/AboutSection";
import ContactSection from "../../components/contactsection/ContactSection";
import ExperienceSection from "../../components/expsection/ExpSection";
import Footer from "../../components/footer/Footer";
import HeroSection from "../../components/herosection/HeroSection";
import Navbar from "../../components/navbar/Navbar";
import ProjectSection from "../../components/projectsection/ProjectSection";
import SkillSection from "../../components/skillsection/SkillSection";

import GamesSection from "../../components/gamessection/GamesSection";
import Galaxy from "../../components/ui/Galaxy";

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0 w-full h-screen pointer-events-none bg-black">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      <div className="relative w-full min-h-full">

        <Navbar />

        <HeroSection />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
        <ExperienceSection />
        <GamesSection />
        <ContactSection />

        <Footer />
      </div>
    </>
  );
}
