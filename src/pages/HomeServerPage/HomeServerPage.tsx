import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Beams from "@/components/ui/beams";
import { Server, Shield, MonitorPlay, Cpu } from "lucide-react";

export default function HomeServerPage() {
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
        
        <div className="pt-32 pb-20 px-4 md:px-0 min-h-dvh flex flex-col justify-center">
          <div className="mx-4 md:mx-30">
            
            {/* Header */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md">
                  HOME <span className="text-(--primaryColor)">SERVER</span>
                </h1>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold w-max mt-2 md:mt-0">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  Currently Offline
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-white/50 max-w-2xl font-light mb-8">
                Breathing new life into old hardware. A fully self-hosted personal cloud, media streaming platform, and network-wide ad blocker running on a repurposed Dell laptop.
              </p>

              {/* Static Stats Preview */}
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md">
                  <span className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Uptime</span>
                  <span className="text-white text-xl font-bold">45d 12h <span className="text-white/30 text-sm font-normal">(Last Known)</span></span>
                </div>
                <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md">
                  <span className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Storage</span>
                  <span className="text-white text-xl font-bold">1.2 TB / 2.0 TB</span>
                </div>
                <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md">
                  <span className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Active Containers</span>
                  <span className="text-white text-xl font-bold">12</span>
                </div>
                <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md">
                  <span className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Ads Blocked</span>
                  <span className="text-white text-xl font-bold">42,401</span>
                </div>
              </div>
            </div>

            {/* Specs & Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              
              {/* Hardware & OS */}
              <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group">
                <Cpu size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">System</h3>
                <p className="text-white/60 mb-4">
                  Repurposed Dell Laptop running a headless Debian Linux OS. Extremely energy-efficient with a built-in battery acting as a UPS.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Dell Hardware</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Debian Linux</span>
                </div>
              </div>

              {/* Core System */}
              <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group">
                <Server size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">Docker</h3>
                <p className="text-white/60 mb-4">
                  Containerized infrastructure for easy management, deployment, and updating of all self-hosted services.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Docker Compose</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Containers</span>
                </div>
              </div>

              {/* Pi-hole */}
              <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group">
                <Shield size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">Pi-hole</h3>
                <p className="text-white/60 mb-4">
                  Network-wide DNS sinkhole that protects all devices on the local network from tracking and blocks advertisements.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">DNS Server</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Ad-Blocker</span>
                </div>
              </div>

              {/* Jellyfin */}
              <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group">
                <MonitorPlay size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">Jellyfin</h3>
                <p className="text-white/60 mb-4">
                  The volunteer-built open source media system. Self-hosted personal Netflix for organizing and streaming personal media collections.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Media Streaming</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Open Source</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
