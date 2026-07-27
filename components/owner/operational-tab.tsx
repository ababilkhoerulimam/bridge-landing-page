"use client"

import { useMemo } from "react"
import { Industry, Factory, TrendingUp, TrendingDown, Cubes, BarChart3, ChartLine, Table2 } from "lucide-react"
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
  Cell
} from "recharts"
import { Submission } from "@/types/bridge"

interface OperationalTabProps {
  submissions: Submission[]
}

export function OperationalTab({ submissions }: OperationalTabProps) {
  // Hardcoded mock data from prototype
  const data = {
    downtime_per_shift: 12.5,
    downtime_trend: -15,
    oee: 84.2,
    oee_trend: 3.1,
    throughput_per_shift: 915,
    throughput_trend: 5.2,
    kiln_efficiency: 92.5,
    cycle_time: 46.5,
    cycle_trend: -3.2,
  }

  const items = [
    { label: "Downtime per Shift", value: `${data.downtime_per_shift} menit`, trend: `${Math.abs(data.downtime_trend)}%`, isUp: true, target: "Target < 15m" },
    { label: "OEE", value: `${data.oee}%`, trend: `${data.oee_trend}%`, isUp: true, target: "Target > 85%" },
    { label: "Throughput per Shift", value: `${data.throughput_per_shift} unit`, trend: `${data.throughput_trend}%`, isUp: true, target: "Target > 850 unit" },
    { label: "Kiln Efficiency", value: `${data.kiln_efficiency}%`, trend: "2.5%", isUp: true, target: "Target > 90%" },
    { label: "Cycle Time", value: `${data.cycle_time} min/batch`, trend: `${Math.abs(data.cycle_trend)}%`, isUp: true, target: "Target < 48m" },
  ]

  const throughputChartData = useMemo(() => {
    const sorted = [...submissions].slice(-20).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    const fallbackData = [860, 875, 870, 890, 885, 910, 895, 905, 920, 915, 880, 890, 905, 925, 910, 930, 915, 920, 935, 940]
    
    if (sorted.length < 5) {
      return fallbackData.map((val, i) => ({ shift: `Shift ${i + 1}`, throughput: val, target: 850 }))
    }

    return sorted.map((s, i) => ({
      shift: `Shift ${i + 1}`,
      throughput: s.batchCount || (850 + (i % 5) * 15),
      target: 850
    }))
  }, [submissions])

  const downtimeParetoData = [
    { cause: "Setup & Changeover", duration: 5, fill: "#3b82f6" },
    { cause: "Unplanned Breakdown", duration: 4, fill: "#ef4444" },
    { cause: "Material Shortage", duration: 2, fill: "#f97316" },
    { cause: "Operator Idle", duration: 1, fill: "#94a3b8" },
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <Factory className="w-5 h-5 text-[#030b85]" /> Operational Metrics & OEE
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
              {item.label}
            </div>
            <div>
              <div className="text-lg md:text-xl font-mono font-black text-slate-900">{item.value}</div>
              <div className="flex justify-between items-center mt-1.5">
                <div className="text-[10px] font-mono font-bold flex items-center gap-0.5 text-emerald-600">
                  {item.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.trend}
                </div>
                <span className="text-[9px] font-mono text-slate-400">{item.target}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Charts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* OEE 3-Pillar Breakdown */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <Cubes className="w-4 h-4" /> OEE 3-Pillar Breakdown
          </h4>
          <div className="flex flex-col gap-5 flex-1 justify-center">
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
                <span className="text-slate-700">Availability Rate</span>
                <span className="text-emerald-600">91.5% (Target 90%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: "91.5%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
                <span className="text-slate-700">Performance Rate</span>
                <span className="text-[#030b85]">94.2% (Target 95%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#030b85] rounded-full" style={{ width: "94.2%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
                <span className="text-slate-700">Quality Rate</span>
                <span className="text-blue-500">97.6% (Target 98%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "97.6%" }}></div>
              </div>
            </div>
            <div className="bg-[#030b85]/5 p-3 rounded-xl text-[11px] font-mono text-slate-600 mt-2">
              <span className="font-bold text-[#030b85] mr-1">ⓘ OEE Calculated:</span>
              Availability (91.5%) × Performance (94.2%) × Quality (97.6%) = <strong className="text-[#030b85]">84.2%</strong>
            </div>
          </div>
        </div>

        {/* Penyebab Downtime */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4" /> Penyebab Downtime (Pareto)
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downtimeParetoData} layout="horizontal" margin={{ top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" vertical={false} />
                <XAxis dataKey="cause" stroke="#64748b" tick={{ fontSize: 9 }} tickMargin={10} />
                <YAxis stroke="#64748b" tickFormatter={(val) => `${val} min`} tick={{ fontSize: 10 }} width={45} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} formatter={(val: number) => [`${val} min`, "Durasi"]} />
                <Bar dataKey="duration" radius={[6, 6, 0, 0]}>
                  {downtimeParetoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Tren Throughput */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <ChartLine className="w-4 h-4" /> Tren Throughput Produksi (20 Shift)
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" />
                <XAxis dataKey="shift" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" domain={['dataMin - 50', 'dataMax + 50']} tick={{ fontSize: 10 }} width={40} />
                <Tooltip />
                <Line
                  name="Throughput (Unit)"
                  type="monotone"
                  dataKey="throughput"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#059669" }}
                  fillOpacity={1}
                  fill="rgba(5, 150, 105, 0.08)"
                />
                <Line
                  name="Target Baseline (850 Unit)"
                  type="step"
                  dataKey="target"
                  stroke="#dc2626"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Matriks Performa */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] flex flex-col overflow-hidden">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <Table2 className="w-4 h-4" /> Matriks Performa Per Shift
          </h4>
          <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Shift</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Throughput</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Downtime</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">OEE</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 20 (Malam)</td>
                  <td className="p-2.5 font-bold text-emerald-600">940 Unit</td>
                  <td className="p-2.5 text-slate-700">12 min</td>
                  <td className="p-2.5 font-bold text-emerald-600">85.4%</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">OPTIMAL</span></td>
                </tr>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 19 (Siang)</td>
                  <td className="p-2.5 font-bold text-emerald-600">935 Unit</td>
                  <td className="p-2.5 text-slate-700">14 min</td>
                  <td className="p-2.5 font-bold text-emerald-600">84.8%</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">OPTIMAL</span></td>
                </tr>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 18 (Pagi)</td>
                  <td className="p-2.5 font-bold text-slate-700">920 Unit</td>
                  <td className="p-2.5 text-rose-600 font-bold">22 min</td>
                  <td className="p-2.5 font-bold text-amber-600">82.1%</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">WARNING</span></td>
                </tr>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 17 (Malam)</td>
                  <td className="p-2.5 font-bold text-slate-700">915 Unit</td>
                  <td className="p-2.5 text-slate-700">15 min</td>
                  <td className="p-2.5 font-bold text-emerald-600">83.5%</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">OPTIMAL</span></td>
                </tr>
                <tr className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 font-bold text-slate-900">Shift 16 (Siang)</td>
                  <td className="p-2.5 font-bold text-rose-600">830 Unit</td>
                  <td className="p-2.5 text-rose-600 font-bold">35 min</td>
                  <td className="p-2.5 font-bold text-rose-600">76.4%</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">CRITICAL</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
