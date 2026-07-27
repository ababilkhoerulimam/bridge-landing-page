"use client"

import { useMemo } from "react"
import { Coins, TrendingUp, TrendingDown, ChartLine, PieChart as PieChartIcon, Lightbulb, AlertTriangle, Zap } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
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

interface FinancialTabProps {
  submissions: Submission[]
}

const formatRupiah = (val: number) => "Rp " + new Intl.NumberFormat("id-ID").format(val)

export function FinancialTab({ submissions }: FinancialTabProps) {
  // Hardcoded mock data from prototype
  const data = {
    total_savings: 148500000,
    savings_trend: 14.2,
    cogs_per_unit: 7250,
    cogs_trend: -5.4,
    waste_cost: 8500000,
    cumulative_savings: 450000000,
    roi: 340,
    cogs_reduction: 8.2
  }

  const items = [
    { label: "Total Penghematan Bulanan", value: formatRupiah(data.total_savings), trend: `${data.savings_trend}%`, isUp: true, target: "Target > Rp 100M" },
    { label: "COGS per Unit", value: formatRupiah(data.cogs_per_unit) + "/unit", trend: `${Math.abs(data.cogs_trend)}%`, isUp: false, target: "Target < Rp 8.500" },
    { label: "Waste Cost", value: formatRupiah(data.waste_cost), trend: "12%", isUp: false, target: "Target < Rp 10M" },
    { label: "Penghematan Kumulatif", value: formatRupiah(data.cumulative_savings), trend: "15%", isUp: true, target: "Realisasi YTD" },
    { label: "ROI BRIDGE", value: data.roi + "%", trend: "25%", isUp: true, target: "Target > 350%" },
    { label: "COGS Reduction", value: data.cogs_reduction + "%", trend: "1.2%", isUp: true, target: "Target > 7.5%" },
  ]

  const lineChartData = useMemo(() => {
    let runningSum = 0
    const sortedSubs = [...submissions].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    
    return sortedSubs.slice(-20).map((s, i) => {
      runningSum += 380000
      return {
        shift: `Shift ${i + 1}`,
        savings: runningSum
      }
    })
  }, [submissions])

  const wasteDonutData = [
    { name: "Raw Material Waste", value: 40, color: "#ef4444" },
    { name: "Defect Product", value: 30, color: "#f97316" },
    { name: "Energy Loss", value: 18, color: "#eab308" },
    { name: "Downtime Cost", value: 12, color: "#3b82f6" },
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <Coins className="w-5 h-5 text-[#030b85]" /> Financial & Cost
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
              {item.label}
            </div>
            <div>
              <div className="text-lg md:text-xl font-mono font-black text-slate-900">
                {item.value}
              </div>
              <div className="flex justify-between items-center mt-1.5">
                <div
                  className={`text-[10px] font-mono font-bold flex items-center gap-0.5 ${
                    item.isUp ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {item.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.trend}
                </div>
                <span className="text-[9px] font-mono text-slate-400">{item.target}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[320px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <ChartLine className="w-4 h-4" /> Tren Penghematan Akumulatif (20 Shift Terakhir)
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" />
                <XAxis dataKey="shift" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis 
                  stroke="#64748b" 
                  tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}M`}
                  tick={{ fontSize: 10 }}
                  width={60}
                />
                <Tooltip 
                  formatter={(value: number) => [formatRupiah(value), "Penghematan"]}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#030b85"
                  strokeWidth={3}
                  dot={false}
                  fillOpacity={1}
                  fill="rgba(3, 11, 133, 0.06)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[320px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <PieChartIcon className="w-4 h-4" /> Distribusi Waste Cost by Category
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {wasteDonutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, "Persentase"]} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Actionable Insights */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5">
        <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4" /> Financial & Cost Actionable Insights
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <div className="font-mono font-extrabold text-xs text-rose-600 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Potensi Penghematan Waste Shift Malam
            </div>
            <div className="text-[11px] font-mono text-slate-800 font-medium leading-relaxed">
              Penurunan reject rate Shift Malam ke 3.0% berpotensi menambah penghematan sebesar <strong className="font-black">Rp 3.450.000/bulan</strong>.
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="font-mono font-extrabold text-xs text-emerald-700 mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Efisiensi Energi Kiln B
            </div>
            <div className="text-[11px] font-mono text-slate-800 font-medium leading-relaxed">
              Implementasi AI preskriptif di Kiln B pada minggu ini telah memangkas konsumsi gas <strong className="font-black">Rp 1.200.000</strong>. Pertahankan setpoint saat ini.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
