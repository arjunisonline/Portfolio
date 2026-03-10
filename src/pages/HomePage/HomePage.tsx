import AboutSection from "../../components/aboutsection/AboutSection";
import ContactSection from "../../components/contactsection/ContactSection";
import ExperienceSection from "../../components/expsection/ExpSection";
import Footer from "../../components/footer/Footer";
import HeroSection from "../../components/herosection/HeroSection";
import Navbar from "../../components/navbar/Nabar";
import ProjectSection from "../../components/projectsection/ProjectSection";
import SkillSection from "../../components/skillsection/SkillSection";

export default function HomePage() {
  return (
    <>
      <div className="relative w-full min-h-full">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
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

        <Footer/>
      </div>
    </>
  );
}
