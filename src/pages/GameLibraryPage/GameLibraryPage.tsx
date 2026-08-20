import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import GameLibrary from "../../components/gamessection/GameLibrary";
import Galaxy from "../../components/ui/Galaxy";

export default function GameLibraryPage() {
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
        
        <div className="pt-32 pb-20 px-4 md:px-0">
          <div className="mx-4 md:mx-30">
            <GameLibrary />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
