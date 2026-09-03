import AboutSection from "../../components/aboutsection/AboutSection";
import ContactSection from "../../components/contactsection/ContactSection";
import ExperienceSection from "../../components/expsection/ExpSection";
import Footer from "../../components/footer/Footer";
import HeroSection from "../../components/herosection/HeroSection";
import Navbar from "../../components/navbar/Navbar";
import ProjectSection from "../../components/projectsection/ProjectSection";
import SkillSection from "../../components/skillsection/SkillSection";

import GamesSection from "../../components/gamessection/GamesSection";
import Beams from "@/components/ui/beams";

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0 w-full h-screen pointer-events-none -z-10 bg-black dark:bg-black/90">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
          beamColor="#000000"
          backgroundColor="#000000"
        />
      </div>
      <div className="relative w-full min-h-full overflow-x-hidden text-foreground">
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
