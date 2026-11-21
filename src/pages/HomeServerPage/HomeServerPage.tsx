import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Beams from "@/components/ui/beams";
import { Server, Shield, MonitorPlay, Cpu, Activity, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BeszelTelemetry from "./BeszelTelemetry";

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
          <div className="mx-4 md:mx-10 lg:mx-30">
            
            {/* Back link */}
            <div className="mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-(--primaryColor) transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back to Portfolio</span>
              </Link>
            </div>

            {/* Header */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md">
                  HOME <span className="text-(--primaryColor)">SERVER</span>
                </h1>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold w-max mt-2 md:mt-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Beszel Monitored • Live
                </div>
              </div>
              
              <p className="text-base md:text-xl text-white/50 max-w-3xl font-light mb-8">
                Breathing new life into old hardware. A fully self-hosted personal cloud, media streaming platform, and network-wide ad blocker running on a repurposed Dell laptop — monitored in real time with <span className="text-white font-medium">Beszel</span> for zero-overhead telemetry.
              </p>
            </div>

            {/* Beszel Live Telemetry Section (Showing Only Necessary Things) */}
            <div className="mb-14">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-(--primaryColor)" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/70">
                    Live Telemetry & Health
                  </h2>
                </div>
                <span className="text-xs text-white/40">
                  Powered by Beszel Agent
                </span>
              </div>

              <BeszelTelemetry />
            </div>

            {/* Infrastructure & Services Grid */}
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <Server size={18} className="text-(--primaryColor)" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/70">
                  Services & Hardware Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Hardware & OS */}
                <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group">
                  <Cpu size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-2">Dell Hardware</h3>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">
                    Repurposed Dell Laptop running headless Debian 12 Linux. Extremely energy-efficient with the built-in laptop battery operating as an uninterruptible power supply (UPS).
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Debian 12</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Battery UPS</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Low Power</span>
                  </div>
                </div>

                {/* 2. Core Docker System */}
                <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group">
                  <Server size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-2">Docker Compose</h3>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">
                    Containerized microservices architecture for isolated environments, easy configuration rollback, and reproducible multi-container deployments.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Containers</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Isolated</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Declarative</span>
                  </div>
                </div>

                {/* 3. Beszel Monitoring (Integrated) */}
                <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group ring-1 ring-(--primaryColor)/30">
                  <Activity size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white">Beszel</h3>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-(--primaryColor)/20 text-(--primaryColor)">
                      Monitoring
                    </span>
                  </div>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">
                    Lightweight monitoring hub and agent built on PocketBase. Streams CPU, memory, storage, network, and Docker container telemetry with less than 1% CPU footprint.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-(--primaryColor)/15 text-(--primaryColor) rounded-md">Telemetry Hub</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Docker Agent</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">&lt;15MB RAM</span>
                  </div>
                </div>

                {/* 4. Pi-hole */}
                <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group">
                  <Shield size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-2">Pi-hole</h3>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">
                    Network-wide DNS sinkhole that shields every device on the local network from telemetry tracking, telemetry beacons, and online advertisements.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">DNS Server</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Ad-Blocker</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Privacy</span>
                  </div>
                </div>

                {/* 5. Jellyfin */}
                <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor) transition-all duration-300 group">
                  <MonitorPlay size={32} className="text-(--primaryColor) mb-6 transform group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-2">Jellyfin</h3>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">
                    The open source media system. Self-hosted personal streaming service for organizing and streaming movies, television, and audio collections across all clients.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Streaming</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Hardware QSV</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/80 rounded-md">Open Source</span>
                  </div>
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
