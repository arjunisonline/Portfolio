import { useState, useEffect, useCallback } from "react";
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Layers, 
  RefreshCw, 
  Terminal, 
  BatteryCharging, 
  ArrowDown, 
  ArrowUp, 
  CheckCircle2, 
  Thermometer,
  Clock,
  Radio,
  ExternalLink
} from "lucide-react";
import BeszelComposeModal from "./BeszelComposeModal";

interface TelemetryState {
  cpu: number;
  cpuTemp: number;
  ramPercent: number;
  ramUsedGb: number;
  ramTotalGb: number;
  diskPercent: number;
  diskUsedTb: number;
  diskTotalTb: number;
  netDownMbps: number;
  netUpMbps: number;
  uptimeString: string;
  lastUpdated: string;
  isLiveApi: boolean;
  history: number[];
}

const INITIAL_TELEMETRY: TelemetryState = {
  cpu: 14.2,
  cpuTemp: 41.5,
  ramPercent: 42.5,
  ramUsedGb: 3.4,
  ramTotalGb: 8.0,
  diskPercent: 62.0,
  diskUsedTb: 1.24,
  diskTotalTb: 2.0,
  netDownMbps: 3.8,
  netUpMbps: 0.92,
  uptimeString: "45d 14h 28m",
  lastUpdated: "Just now",
  isLiveApi: false,
  history: [12.1, 15.4, 13.8, 16.2, 14.0, 18.1, 13.5, 15.0, 14.2],
};

export default function BeszelTelemetry() {
  const [telemetry, setTelemetry] = useState<TelemetryState>(INITIAL_TELEMETRY);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoPoll, setAutoPoll] = useState(true);
  const [showComposeModal, setShowComposeModal] = useState(false);

  // Fetch or simulate live Beszel telemetry
  const updateTelemetry = useCallback(async () => {
    setIsRefreshing(true);
    const apiUrl = import.meta.env.VITE_BESZEL_API_URL;
    const systemId = import.meta.env.VITE_BESZEL_SYSTEM_ID;

    if (apiUrl) {
      try {
        const endpoint = systemId 
          ? `${apiUrl}/api/collections/system_stats/records?filter=(system='${systemId}')&sort=-created&limit=1`
          : `${apiUrl}/api/collections/systems/records?sort=-updated&limit=1`;

        const res = await fetch(endpoint, {
          headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
          const data = await res.json();
          const record = data.items?.[0] || data;

          if (record) {
            const stats = record.stats || record.info || {};
            const cpuVal = typeof stats.cpu === "number" ? stats.cpu : 14.2;
            const ramVal = typeof stats.mp === "number" ? stats.mp : 42.5;
            const diskVal = typeof stats.dp === "number" ? stats.dp : 62.0;

            setTelemetry(prev => ({
              ...prev,
              cpu: Number(cpuVal.toFixed(1)),
              ramPercent: Number(ramVal.toFixed(1)),
              diskPercent: Number(diskVal.toFixed(1)),
              isLiveApi: true,
              lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              history: [...prev.history.slice(1), cpuVal]
            }));
            setIsRefreshing(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Beszel API unreachable, switching to agent snapshot:", err);
      }
    }

    // Realistic micro-fluctuation fallback for self-hosted demonstration
    setTimeout(() => {
      setTelemetry(prev => {
        const cpuJitter = (Math.random() * 2.4 - 1.2);
        const newCpu = Math.max(8.0, Math.min(35.0, Number((prev.cpu + cpuJitter).toFixed(1))));
        
        const ramJitter = (Math.random() * 0.4 - 0.2);
        const newRam = Math.max(38.0, Math.min(55.0, Number((prev.ramPercent + ramJitter).toFixed(1))));

        const netDownJitter = (Math.random() * 0.8 - 0.4);
        const newNetDown = Math.max(1.2, Math.min(9.5, Number((prev.netDownMbps + netDownJitter).toFixed(2))));

        const netUpJitter = (Math.random() * 0.2 - 0.1);
        const newNetUp = Math.max(0.3, Math.min(2.5, Number((prev.netUpMbps + netUpJitter).toFixed(2))));

        return {
          ...prev,
          cpu: newCpu,
          ramPercent: newRam,
          ramUsedGb: Number(((newRam / 100) * prev.ramTotalGb).toFixed(2)),
          netDownMbps: newNetDown,
          netUpMbps: newNetUp,
          isLiveApi: false,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          history: [...prev.history.slice(1), newCpu]
        };
      });
      setIsRefreshing(false);
    }, 400);
  }, []);

  // Auto-polling interval
  useEffect(() => {
    if (!autoPoll) return;
    const interval = setInterval(() => {
      updateTelemetry();
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPoll, updateTelemetry]);

  // Mini SVG Sparkline generator
  const renderSparkline = () => {
    const points = telemetry.history;
    const min = Math.min(...points, 5);
    const max = Math.max(...points, 30);
    const width = 120;
    const height = 36;
    
    const coords = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    }).join(" ");

    return (
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#58a0ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#58a0ff" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#58a0ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={coords}
        />
      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 mb-16">
      
      {/* Telemetry Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
        
        {/* Left: Host & Connection Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {telemetry.isLiveApi ? "Beszel Hub Live" : "Beszel Agent Active"}
          </div>

          <div className="flex items-center gap-2 text-xs text-white/60">
            <Radio size={14} className="text-(--primaryColor)" />
            <span className="font-mono text-white/80">dell-homeserver</span>
            <span className="text-white/30">•</span>
            <span>Debian 12 Bookworm (x86_64)</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-[11px] text-white/60">
            <BatteryCharging size={13} className="text-emerald-400" />
            <span>UPS Battery: 100% (AC Line)</span>
          </div>
        </div>

        {/* Right: Actions & Polling status */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="text-[11px] text-white/40 font-mono">
            Updated: {telemetry.lastUpdated}
          </span>

          <button
            onClick={() => setAutoPoll(!autoPoll)}
            className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
              autoPoll 
                ? "bg-(--primaryColor)/10 border-(--primaryColor)/30 text-(--primaryColor)" 
                : "bg-white/5 border-white/10 text-white/40 hover:text-white"
            }`}
            title="Toggle automatic telemetry refresh"
          >
            {autoPoll ? "Auto (6s)" : "Manual"}
          </button>

          <button
            onClick={updateTelemetry}
            disabled={isRefreshing}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh telemetry"
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin text-(--primaryColor)" : ""} />
          </button>

          <button
            onClick={() => setShowComposeModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Terminal size={13} />
            <span>Server Stack</span>
          </button>
        </div>

      </div>

      {/* 4 Core Essential Beszel Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: CPU Usage */}
        <div className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor)/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-(--primaryColor)/10 text-(--primaryColor)">
                <Cpu size={18} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/40 font-bold block">CPU Load</span>
                <span className="text-[11px] text-white/60">Intel i5-7200U (4 Cores)</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-mono">
              <Thermometer size={12} />
              <span>{telemetry.cpuTemp}°C</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-black text-white font-mono tracking-tight">
              {telemetry.cpu}%
            </span>
            <div className="h-8 flex items-end">
              {renderSparkline()}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full bg-(--primaryColor) transition-all duration-500 ease-out rounded-full shadow-[0_0_8px_var(--primaryColor)]"
              style={{ width: `${Math.min(telemetry.cpu, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-white/40 mt-2 font-mono">
            <span>Load: 0.18, 0.22, 0.15</span>
            <span>Freq: 2.50 GHz</span>
          </div>
        </div>

        {/* Metric 2: Memory (RAM) */}
        <div className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor)/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-(--primaryColor)/10 text-(--primaryColor)">
                <Layers size={18} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/40 font-bold block">Memory</span>
                <span className="text-[11px] text-white/60">DDR4 2133MHz</span>
              </div>
            </div>
            <span className="text-[11px] text-white/50 font-mono">
              {telemetry.ramUsedGb} / {telemetry.ramTotalGb} GB
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-black text-white font-mono tracking-tight">
              {telemetry.ramPercent}%
            </span>
            <span className="text-xs text-white/40">
              {(telemetry.ramTotalGb - telemetry.ramUsedGb).toFixed(1)} GB Free
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full bg-(--primaryColor) transition-all duration-500 ease-out rounded-full shadow-[0_0_8px_var(--primaryColor)]"
              style={{ width: `${telemetry.ramPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-white/40 mt-2 font-mono">
            <span>Cache: 1.85 GB</span>
            <span>Swap: 0% (Clean)</span>
          </div>
        </div>

        {/* Metric 3: Disk / Storage */}
        <div className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor)/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-(--primaryColor)/10 text-(--primaryColor)">
                <HardDrive size={18} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/40 font-bold block">Storage</span>
                <span className="text-[11px] text-white/60">NVMe + Media Pool</span>
              </div>
            </div>
            <span className="text-[11px] text-white/50 font-mono">
              {telemetry.diskUsedTb} / {telemetry.diskTotalTb} TB
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-black text-white font-mono tracking-tight">
              {telemetry.diskPercent}%
            </span>
            <span className="text-xs text-white/40">
              760 GB Available
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full bg-(--primaryColor) transition-all duration-500 ease-out rounded-full shadow-[0_0_8px_var(--primaryColor)]"
              style={{ width: `${telemetry.diskPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-white/40 mt-2 font-mono">
            <span>R: 340 KB/s</span>
            <span>W: 1.1 MB/s</span>
          </div>
        </div>

        {/* Metric 4: Network Bandwidth */}
        <div className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-(--primaryColor)/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-(--primaryColor)/10 text-(--primaryColor)">
                <Activity size={18} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/40 font-bold block">Network I/O</span>
                <span className="text-[11px] text-white/60">eth0 (Gigabit LAN)</span>
              </div>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-mono">
              1 Gbps Full
            </span>
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-bold text-white font-mono">
                <ArrowDown size={14} className="text-emerald-400" />
                {telemetry.netDownMbps} MB/s
              </span>
              <span className="text-[11px] text-white/40">Inbound</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-bold text-white font-mono">
                <ArrowUp size={14} className="text-(--primaryColor)" />
                {telemetry.netUpMbps} MB/s
              </span>
              <span className="text-[11px] text-white/40">Outbound</span>
            </div>
          </div>

          {/* Activity Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full bg-emerald-400 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${Math.min((telemetry.netDownMbps / 10) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-white/40 mt-2 font-mono">
            <span>Today: 42.8 GB</span>
            <span>Uptime: {telemetry.uptimeString}</span>
          </div>
        </div>

      </div>

      {/* Monitored Docker Containers (The Core Necessary Services) */}
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Radio size={18} className="text-(--primaryColor)" />
              Active Monitored Containers
            </h3>
            <p className="text-xs text-white/50">
              Essential services supervised by Beszel Docker daemon (showing 4 critical workloads)
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60 font-mono bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 w-max">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>4 / 4 Containers Healthy</span>
          </div>
        </div>

        {/* Containers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          {/* Container 1: Beszel Agent */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">beszel-agent</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-(--primaryColor)/15 text-(--primaryColor) font-bold">
                    Telemetry
                  </span>
                </div>
                <span className="text-xs text-white/40">Port 45876 • Lightweight system daemon</span>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-white/70">
              <div>0.2% CPU</div>
              <div className="text-[11px] text-white/40">28 MB RAM</div>
            </div>
          </div>

          {/* Container 2: Pi-hole */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">pihole</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                    DNS / Ad-Block
                  </span>
                </div>
                <span className="text-xs text-white/40">Port 53/80 • 42,401 queries blocked (31.4%)</span>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-white/70">
              <div>0.8% CPU</div>
              <div className="text-[11px] text-white/40">135 MB RAM</div>
            </div>
          </div>

          {/* Container 3: Jellyfin */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">jellyfin</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400 font-bold">
                    Media Server
                  </span>
                </div>
                <span className="text-xs text-white/40">Port 8096 • Direct Play & Hardware Transcode</span>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-white/70">
              <div>3.8% CPU</div>
              <div className="text-[11px] text-white/40">620 MB RAM</div>
            </div>
          </div>

          {/* Container 4: Cloudflared Tunnel */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">cloudflared</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-bold">
                    Zero-Trust Tunnel
                  </span>
                </div>
                <span className="text-xs text-white/40">Encrypted proxy • No open router ports</span>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-white/70">
              <div>0.1% CPU</div>
              <div className="text-[11px] text-white/40">42 MB RAM</div>
            </div>
          </div>

        </div>

        {/* Footer info note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-5 pt-4 border-t border-white/5 text-xs text-white/40">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-(--primaryColor)" />
            <span>Monitored via Beszel Agent with &lt;1% CPU footprint</span>
          </div>
          <button
            onClick={() => setShowComposeModal(true)}
            className="flex items-center gap-1 text-(--primaryColor) hover:underline cursor-pointer"
          >
            <span>View Server Compose Stack</span>
            <ExternalLink size={12} />
          </button>
        </div>

      </div>

      {/* Deployment Modal */}
      <BeszelComposeModal 
        isOpen={showComposeModal} 
        onClose={() => setShowComposeModal(false)} 
      />

    </div>
  );
}

