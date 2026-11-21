import { useState } from "react";
import { X, Copy, Check, Terminal, Server, Shield } from "lucide-react";

interface BeszelComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BeszelComposeModal({ isOpen, onClose }: BeszelComposeModalProps) {
  const [activeTab, setActiveTab] = useState<"agent" | "stack" | "hub">("agent");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const agentSnippet = `# ==============================================
# Beszel Agent for Home Server (Repurposed Laptop)
# Lightweight telemetry agent (<15MB RAM, <0.5% CPU)
# ==============================================
services:
  beszel-agent:
    image: henrygd/beszel-agent:latest
    container_name: beszel-agent
    restart: unless-stopped
    network_mode: host
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      # Monitor root filesystem and storage mounts:
      - /:/extra-filesystems/root:ro
    environment:
      PORT: 45876
      # Paste your public key generated from Beszel Hub:
      KEY: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGour_beszel_public_key_here"
      # Optional: extra filesystems to monitor (e.g. external media drive)
      EXTRA_FILESYSTEMS: "/extra-filesystems/root"`;

  const stackSnippet = `# ==============================================
# Complete Home Server Stack (Docker Compose)
# Repurposed Dell Laptop (Debian 12 + Docker)
# ==============================================
services:
  # 1. Beszel Agent (Telemetry & Health)
  beszel-agent:
    image: henrygd/beszel-agent:latest
    container_name: beszel-agent
    restart: unless-stopped
    network_mode: host
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /:/extra-filesystems/root:ro
    environment:
      PORT: 45876
      KEY: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5..."

  # 2. Pi-hole (Network DNS Sinkhole & Ad Blocker)
  pihole:
    image: pihole/pihole:latest
    container_name: pihole
    restart: unless-stopped
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "8080:80/tcp"
    environment:
      TZ: "Asia/Kolkata"
      WEBPASSWORD: "ChangeMeSecurely!"
    volumes:
      - ./etc-pihole:/etc/pihole
      - ./etc-dnsmasq.d:/etc/dnsmasq.d

  # 3. Jellyfin (Personal Media Streaming)
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    ports:
      - "8096:8096"
    volumes:
      - ./config/jellyfin:/config
      - ./cache/jellyfin:/cache
      - /mnt/storage/media:/media:ro
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata`;

  const hubSnippet = `# ==============================================
# Beszel Hub (Central Monitoring Web UI & API)
# PocketBase backend with multi-node dashboard
# ==============================================
services:
  beszel-hub:
    image: henrygd/beszel:latest
    container_name: beszel-hub
    restart: unless-stopped
    ports:
      - "8090:8090"
    volumes:
      - ./beszel_data:/beszel/pb_data
    environment:
      # Optional: Public Hub URL
      APP_URL: "https://beszel.yourdomain.com"`;

  const getCurrentSnippet = () => {
    switch (activeTab) {
      case "agent":
        return agentSnippet;
      case "stack":
        return stackSnippet;
      case "hub":
        return hubSnippet;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#0c0d12] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-(--primaryColor)/10 text-(--primaryColor) border border-(--primaryColor)/20">
              <Terminal size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Server Deployment Config
              </h2>
              <p className="text-xs text-white/50">
                Docker Compose definitions for Beszel & self-hosted server services
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/5 bg-white/[0.01]">
          <button
            onClick={() => setActiveTab("agent")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all cursor-pointer ${
              activeTab === "agent"
                ? "border-(--primaryColor) text-(--primaryColor) bg-white/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Server size={14} />
            Beszel Agent (Minimal)
          </button>
          <button
            onClick={() => setActiveTab("stack")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all cursor-pointer ${
              activeTab === "stack"
                ? "border-(--primaryColor) text-(--primaryColor) bg-white/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Shield size={14} />
            Full Server Stack
          </button>
          <button
            onClick={() => setActiveTab("hub")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all cursor-pointer ${
              activeTab === "hub"
                ? "border-(--primaryColor) text-(--primaryColor) bg-white/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Terminal size={14} />
            Beszel Hub
          </button>
        </div>

        {/* Code Content */}
        <div className="relative flex-1 p-6 overflow-y-auto font-mono text-xs">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] text-white/40 uppercase tracking-wider font-sans">
              docker-compose.yml
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Configuration</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-black/60 border border-white/5 text-white/80 overflow-x-auto leading-relaxed select-all">
            <code>{getCurrentSnippet()}</code>
          </pre>

          {/* Quick instructions */}
          <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/60 text-xs leading-normal">
            <p className="font-semibold text-white/80 mb-1">Deployment Quickstart:</p>
            <ol className="list-decimal list-inside space-y-1 text-white/50">
              <li>Save to <code className="text-(--primaryColor)">docker-compose.yml</code> on your server</li>
              <li>Run <code className="text-(--primaryColor)">docker compose up -d</code> to start the container</li>
              <li>Agent connects to port <code className="text-white">45876</code> with near-zero overhead (&lt;1% CPU)</li>
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-(--primaryColor) text-black hover:opacity-90 transition-opacity cursor-pointer"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied to Clipboard" : "Copy YAML"}
          </button>
        </div>
      </div>
    </div>
  );
}

