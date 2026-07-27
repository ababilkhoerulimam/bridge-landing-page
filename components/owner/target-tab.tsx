"use client"

import { 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Flag,
  Zap,
  Activity
} from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

export function TargetTab() {
  const metrics = [
    {
      title: "Produksi Harian (Pcs)",
      current: 12450,
      target: 15000,
      unit: "pcs",
      status: "On Track",
      color: "#030b85",
      trend: "up"
    },
    {
      title: "Grade A Yield Target",
      current: 88.5,
      target: 90.0,
      unit: "%",
      status: "Needs Focus",
      color: "#d97706",
      trend: "up"
    },
    {
      title: "Defect Rate Maksimal",
      current: 3.2,
      target: 2.5,
      unit: "%",
      status: "At Risk",
      color: "#e11d48",
      trend: "down" // Lower is better for defect rate, but trend down is good, however value is above target
    },
    {
      title: "Konsumsi Gas Maks",
      current: 410,
      target: 400,
      unit: "m³/ton",
      status: "Warning",
      color: "#059669",
      trend: "down"
    }
  ]

  const milestones = [
    {
      period: "Q3 2026",
      title: "Digitalisasi Dasar",
      status: "Selesai",
      desc: "Implementasi logbook digital, monitoring real-time kiln, dan pelaporan otomatis.",
      active: false
    },
    {
      period: "Q4 2026",
      title: "Integrasi IoT & AI",
      status: "In Progress",
      desc: "Instalasi sensor tambahan di 4 kiln, predictive maintenance, dan otomatisasi burner.",
      active: true
    },
    {
      period: "Q1 2027",
      title: "Autonomous Factory",
      status: "Pending",
      desc: "Kontrol suhu otomatis berbasis AI, optimasi formulasi material otomatis, ESG reporting.",
      active: false
    }
  ]

  const trendData = [
    { name: "Minggu 1", produksi: 11000, target: 15000 },
    { name: "Minggu 2", produksi: 11500, target: 15000 },
    { name: "Minggu 3", produksi: 12100, target: 15000 },
    { name: "Minggu 4", produksi: 12450, target: 15000 },
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <Target className="w-5 h-5 text-[#030b85]" /> Target & Goals Tracking
      </div>

      {/* Target Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m, i) => {
          const isDefectOrGas = m.title.includes("Defect") || m.title.includes("Gas")
          let pct = isDefectOrGas 
            ? Math.max(0, 100 - ((m.current - m.target) / m.target * 100))
            : (m.current / m.target) * 100
          
          pct = Math.min(100, Math.round(pct))
          
          let StatusIcon = CheckCircle2
          if (m.status === "Needs Focus" || m.status === "Warning") StatusIcon = AlertTriangle
          if (m.status === "At Risk") StatusIcon = Clock

          return (
            <div key={i} className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between items-start">
                <span>{m.title}</span>
                {m.trend === "up" ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <ArrowDownRight className="w-3 h-3 text-rose-500" />}
              </div>
              
              <div>
                <div className="text-xl md:text-2xl font-mono font-black" style={{ color: m.color }}>
                  {m.current} <span className="text-sm font-bold">{m.unit}</span>
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-500 mt-0.5 mb-2">
                  Target: {m.target} {m.unit}
                </div>
                
                <div className="h-1.5 w-full bg-slate-900/10 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full transition-all duration-700" 
                    style={{ width: `${pct}%`, background: m.color }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-[9px] font-mono font-bold">
                  <span className="flex items-center gap-1" style={{ color: m.color }}>
                    <StatusIcon className="w-2.5 h-2.5" /> {m.status}
                  </span>
                  <span className="text-slate-500">{pct}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
        {/* Trend Produksi */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[340px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" /> Trend Pencapaian Produksi (Bulan Ini)
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10 }}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#030b85" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#030b85" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" domain={[10000, 16000]} tick={{ fontSize: 10 }} width={40} />
                <Tooltip cursor={{ stroke: "rgba(0,0,0,0.1)", strokeWidth: 1, strokeDasharray: "3 3" }} />
                <Area 
                  type="monotone" 
                  dataKey="produksi" 
                  name="Aktual" 
                  stroke="#030b85" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorProd)" 
                />
                <Area 
                  type="step" 
                  dataKey="target" 
                  name="Target" 
                  stroke="#d97706" 
                  strokeWidth={2}
                  strokeDasharray="5 5" 
                  fill="none" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[340px] flex flex-col overflow-y-auto custom-scrollbar">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5 sticky top-0 bg-white/60 backdrop-blur-md pb-2 z-10">
            <Flag className="w-4 h-4" /> Strategic Milestones
          </h4>
          
          <div className="relative pl-3 border-l-2 border-slate-900/10 space-y-6 flex-1 py-2">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[17px] top-1 w-3 h-3 rounded-full border-2 ${
                  m.status === "Selesai" 
                    ? "bg-emerald-500 border-emerald-500" 
                    : m.status === "In Progress"
                      ? "bg-white border-[#030b85]"
                      : "bg-white border-slate-300"
                }`} />
                
                <div className={`bg-white/80 p-3 rounded-xl border ${m.active ? 'border-[#030b85]/30 shadow-sm' : 'border-slate-900/10'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                      m.status === "Selesai" ? "bg-emerald-100 text-emerald-700" :
                      m.status === "In Progress" ? "bg-[#030b85]/10 text-[#030b85]" :
                      "bg-slate-100 text-slate-500"
                    }`}>
                      {m.period}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      {m.status}
                    </span>
                  </div>
                  <div className={`font-mono font-bold text-sm mb-1 ${m.active ? 'text-[#030b85]' : 'text-slate-800'}`}>
                    {m.title}
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 leading-relaxed">
                    {m.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
