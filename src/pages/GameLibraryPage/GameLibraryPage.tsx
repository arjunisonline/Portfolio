import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import GameLibrary from "../../components/gamessection/GameLibrary";
import Beams from "@/components/ui/beams";

export default function GameLibraryPage() {
  return (
    <>
      <div className="fixed inset-0 w-full h-screen pointer-events-none bg-black">
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
