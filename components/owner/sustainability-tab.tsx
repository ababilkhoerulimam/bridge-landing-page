"use client"

import { 
  Leaf, 
  Wind, 
  Droplets, 
  Recycle, 
  TrendingDown, 
  TrendingUp,
  Zap,
  Globe2,
  TreePine,
  CheckCircle2
} from "lucide-react"
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts"

export function SustainabilityTab() {
  const metrics = [
    {
      title: "Energy Efficiency",
      value: "1.8",
      unit: "GJ/Ton",
      status: "Optimized",
      trend: "down",
      trendValue: "-5.2%",
      icon: Zap,
      color: "#059669"
    },
    {
      title: "Carbon Footprint",
      value: "142",
      unit: "tCO2e",
      status: "Below Target",
      trend: "down",
      trendValue: "-12.0%",
      icon: Wind,
      color: "#030b85"
    },
    {
      title: "Water Recycled",
      value: "85",
      unit: "%",
      status: "Excellent",
      trend: "up",
      trendValue: "+3.5%",
      icon: Droplets,
      color: "#0ea5e9"
    },
    {
      title: "Waste Reduction",
      value: "15",
      unit: "%",
      status: "On Track",
      trend: "up",
      trendValue: "+2.1%",
      icon: Recycle,
      color: "#d97706"
    }
  ]

  const chartData = [
    { name: "Jan", energy: 2.1, emisi: 165 },
    { name: "Feb", energy: 2.0, emisi: 158 },
    { name: "Mar", energy: 1.95, emisi: 150 },
    { name: "Apr", energy: 1.9, emisi: 148 },
    { name: "Mei", energy: 1.85, emisi: 145 },
    { name: "Jun", energy: 1.8, emisi: 142 },
  ]

  const initiatives = [
    {
      title: "Optimasi Burner Otomatis",
      impact: "Pengurangan konsumsi gas 8%",
      status: "Active",
      progress: 100
    },
    {
      title: "Closed-loop Water System",
      impact: "Peningkatan daur ulang air pendingin",
      status: "In Progress",
      progress: 65
    },
    {
      title: "Solar Panel Phase 1",
      impact: "Substitusi 15% energi listrik grid",
      status: "Planning",
      progress: 20
    }
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <Leaf className="w-5 h-5 text-emerald-600" /> Sustainability & ESG Reporting
      </div>

      {/* ESG Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m, i) => {
          const Icon = m.icon
          const isGoodTrend = (m.trend === "down" && (m.title.includes("Energy") || m.title.includes("Carbon"))) ||
                              (m.trend === "up" && (m.title.includes("Water") || m.title.includes("Waste")))

          return (
            <div key={i} className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" style={{ color: m.color }} /> {m.title}
              </div>
              
              <div>
                <div className="text-xl md:text-2xl font-mono font-black text-slate-900">
                  {m.value} <span className="text-sm font-bold text-slate-500">{m.unit}</span>
                </div>
                
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-900/5">
                  <span className="text-[10px] font-mono font-bold text-slate-500">{m.status}</span>
                  <span className={`text-[10px] font-mono font-bold flex items-center gap-0.5 ${
                    isGoodTrend ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {m.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {m.trendValue}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
        {/* Trend Energi vs Emisi */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[340px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <Globe2 className="w-4 h-4" /> Trend Konsumsi Energi vs Emisi CO2
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="left" stroke="#64748b" tick={{ fontSize: 10 }} width={30} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{ fontSize: 10 }} width={30} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar yAxisId="right" dataKey="emisi" name="Emisi (tCO2e)" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={30} />
                <Line yAxisId="left" type="monotone" dataKey="energy" name="Energi (GJ/Ton)" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: "#059669", strokeWidth: 2, stroke: "#fff" }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ESG Initiatives */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[340px] flex flex-col overflow-y-auto custom-scrollbar">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5 sticky top-0 bg-white/60 backdrop-blur-md pb-2">
            <TreePine className="w-4 h-4" /> ESG Initiatives 2026
          </h4>
          
          <div className="space-y-4 flex-1">
            {initiatives.map((init, i) => (
              <div key={i} className="bg-white/80 p-3.5 rounded-xl border border-slate-900/10 shadow-sm transition-all hover:border-[#030b85]/30">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono font-bold text-sm text-slate-800">{init.title}</div>
                  <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    init.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                    init.status === "In Progress" ? "bg-[#030b85]/10 text-[#030b85]" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {init.status}
                  </span>
                </div>
                
                <div className="text-[10px] font-mono text-slate-600 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {init.impact}
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono font-bold text-slate-500">
                    <span>Progress</span>
                    <span>{init.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        init.status === "Active" ? "bg-emerald-500" :
                        init.status === "In Progress" ? "bg-[#030b85]" :
                        "bg-slate-300"
                      }`}
                      style={{ width: `${init.progress}%` }}
                    />
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
