"use client"

import { useMemo } from "react"
import { ChartLine, TrendingUp, TrendingDown, LayoutList, PieChart as PieChartIcon, Activity, CheckCircle2 } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import { Submission } from "@/types/bridge"

interface QualityTabProps {
  submissions: Submission[]
}

export function QualityTab({ submissions }: QualityTabProps) {
  // Hardcoded mock data from prototype
  const data = {
    grade_a_yield: 92.8,
    grade_a_trend: 3.5,
    defect_rate: 2.1,
    defect_trend: -1.8,
    first_pass_yield: 89.2,
    first_pass_trend: 3.4,
    rework_rate: 1.8,
    rework_trend: -1.2,
  }

  const rejectShift = { Pagi: 2.8, Siang: 4.1, Malam: 5.8 }

  const lineChartData = useMemo(() => {
    const sorted = [...submissions].slice(-20).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    return sorted.map((s, i) => ({
      shift: `Shift ${i + 1}`,
      rejectRate: parseFloat(((100 - (s.actualQuality || 88.0)) * 0.15).toFixed(2))
    }))
  }, [submissions])

  const rejectShiftBarData = [
    { shift: "Shift 1 (Pagi)", rejectRate: rejectShift.Pagi, fill: "#059669" },
    { shift: "Shift 2 (Siang)", rejectRate: rejectShift.Siang, fill: "#d97706" },
    { shift: "Shift 3 (Malam)", rejectRate: rejectShift.Malam, fill: "#dc2626" },
  ]

  const defectParetoData = [
    { name: "Retak / Cracking", value: 42, color: "#dc2626" },
    { name: "Cacat Permukaan", value: 28, color: "#f97316" },
    { name: "Deformasi Bentuk", value: 18, color: "#eab308" },
    { name: "Lain-lain", value: 12, color: "#64748b" },
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <Activity className="w-5 h-5 text-[#030b85]" /> Quality Metrics
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
            Grade A Yield
          </div>
          <div>
            <div className="text-lg md:text-xl font-mono font-black text-slate-900">{data.grade_a_yield}%</div>
            <div className="flex justify-between items-center mt-1.5">
              <div className="text-[10px] font-mono font-bold flex items-center gap-0.5 text-emerald-600">
                <TrendingUp className="w-3 h-3" /> {data.grade_a_trend}%
              </div>
              <span className="text-[9px] font-mono text-slate-400">Target &gt;85%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
            Defect Rate
          </div>
          <div>
            <div className="text-lg md:text-xl font-mono font-black text-slate-900">{data.defect_rate}%</div>
            <div className="flex justify-between items-center mt-1.5">
              <div className="text-[10px] font-mono font-bold flex items-center gap-0.5 text-emerald-600">
                <TrendingDown className="w-3 h-3" /> {Math.abs(data.defect_trend)}%
              </div>
              <span className="text-[9px] font-mono text-slate-400">Target &lt;5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
            First Pass Yield
          </div>
          <div>
            <div className="text-lg md:text-xl font-mono font-black text-slate-900">{data.first_pass_yield}%</div>
            <div className="flex justify-between items-center mt-1.5">
              <div className="text-[10px] font-mono font-bold flex items-center gap-0.5 text-emerald-600">
                <TrendingUp className="w-3 h-3" /> {data.first_pass_trend}%
              </div>
              <span className="text-[9px] font-mono text-slate-400">Target &gt;85%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
            Rework Rate
          </div>
          <div>
            <div className="text-lg md:text-xl font-mono font-black text-slate-900">{data.rework_rate}%</div>
            <div className="flex justify-between items-center mt-1.5">
              <div className="text-[10px] font-mono font-bold flex items-center gap-0.5 text-emerald-600">
                <TrendingDown className="w-3 h-3" /> {Math.abs(data.rework_trend)}%
              </div>
              <span className="text-[9px] font-mono text-slate-400">Target &lt;5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <ChartLine className="w-4 h-4" /> Defect & Reject Rate Trend (20 Shifts)
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" />
                <XAxis dataKey="shift" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tickFormatter={(val) => `${val}%`} tick={{ fontSize: 10 }} width={40} />
                <Tooltip formatter={(val: number) => [`${val}%`, "Reject Rate"]} />
                <Line
                  type="monotone"
                  dataKey="rejectRate"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={false}
                  fillOpacity={1}
                  fill="rgba(220, 38, 38, 0.04)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase flex items-center gap-1.5">
              <LayoutList className="w-4 h-4" /> Reject Rate Per Shift
            </h4>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444]" title="Shift Malam butuh perhatian"></span>
          </div>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rejectShiftBarData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tickFormatter={(val) => `${val}%`} tick={{ fontSize: 10 }} domain={[0, 8]} />
                <YAxis type="category" dataKey="shift" stroke="#64748b" tick={{ fontSize: 10 }} width={90} />
                <Tooltip formatter={(val: number) => [`${val}%`, "Reject Rate"]} />
                <Bar dataKey="rejectRate" radius={[0, 6, 6, 0]}>
                  {rejectShiftBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <PieChartIcon className="w-4 h-4" /> Breakdown Kategori Defect (Pareto)
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={defectParetoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {defectParetoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val}%`, "Persentase"]} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] overflow-hidden flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Log Insiden Kualitas & Root Cause
          </h4>
          <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Shift</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Jenis Defect</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Penyebab Utama</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Tindakan (CAPA)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 20 (Malam)</td>
                  <td className="p-2.5 font-bold text-rose-600">Retak Permukaan</td>
                  <td className="p-2.5 text-slate-700">Fluktuasi suhu Kiln B</td>
                  <td className="p-2.5 text-slate-700">Adjust burner setup</td>
                </tr>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 18 (Siang)</td>
                  <td className="p-2.5 font-bold text-amber-600">Deformasi Mould</td>
                  <td className="p-2.5 text-slate-700">Cetakan aus 1.2mm</td>
                  <td className="p-2.5 text-slate-700">Ganti mould kit C-12</td>
                </tr>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 15 (Pagi)</td>
                  <td className="p-2.5 font-bold text-amber-600">Warna Belang</td>
                  <td className="p-2.5 text-slate-700">Bahan baku mix basah</td>
                  <td className="p-2.5 text-slate-700">Kalibrasi drying room</td>
                </tr>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 12 (Malam)</td>
                  <td className="p-2.5 font-bold text-rose-600">Retak Termal</td>
                  <td className="p-2.5 text-slate-700">Pusher speed terlalu cepat</td>
                  <td className="p-2.5 text-slate-700">Lock pusher di 38 RPM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
