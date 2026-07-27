"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  UserCheck,
  Radio,
  Flame,
  ClipboardList,
  Search,
  Filter,
  Zap,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"
import { Submission, KilnStatusItem } from "@/types/bridge"

interface DashboardTabProps {
  submissions: Submission[]
  kilns: KilnStatusItem[]
  onKilnClick: (kiln: KilnStatusItem) => void
  onSubmissionClick: (submission: Submission) => void
}

const formatRupiah = (val: number) => "Rp " + new Intl.NumberFormat("id-ID").format(val)

export function DashboardTab({
  submissions,
  kilns,
  onKilnClick,
  onSubmissionClick,
}: DashboardTabProps) {
  const [selectedGradeLine, setSelectedGradeLine] = useState<string>("all")
  const [selectedGradeBar, setSelectedGradeBar] = useState<string>("all")
  const [tableSearch, setTableSearch] = useState("")
  const [tableShiftFilter, setTableShiftFilter] = useState("all")
  const [tableQcFilter, setTableQcFilter] = useState("all")

  // Generate 30-day chart data from submissions or realistic wave trend
  const chartData = useMemo(() => {
    const map = new Map<string, { date: string; grade_a: number; grade_b: number; grade_c: number }>()

    submissions.forEach((s) => {
      const dateKey = s.timestamp.slice(5, 10)
      if (!map.has(dateKey)) {
        map.set(dateKey, {
          date: dateKey,
          grade_a: s.actualQuality,
          grade_b: Math.round(Math.max(2, (100 - s.actualQuality) * 0.7) * 10) / 10,
          grade_c: Math.round(Math.max(1, (100 - s.actualQuality) * 0.3) * 10) / 10,
        })
      }
    })

    const raw = Array.from(map.values())
    if (raw.length >= 10) return raw.slice(-20)

    // Dynamic wave pattern fallback if few submissions exist
    const defaultData = []
    const baseWave = [88.5, 91.2, 89.0, 93.4, 90.8, 92.5, 87.9, 94.1, 91.5, 93.0, 89.6, 92.8, 94.5, 91.0, 93.8, 92.1, 95.0, 91.8, 94.2, 93.5]
    for (let i = 0; i < 20; i++) {
      const d = new Date(2026, 6, 7 + i)
      const dateStr = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
      const valA = baseWave[i]
      defaultData.push({
        date: dateStr,
        grade_a: valA,
        grade_b: Math.round((100 - valA) * 0.7 * 10) / 10,
        grade_c: Math.round((100 - valA) * 0.3 * 10) / 10,
      })
    }
    return defaultData
  }, [submissions])

  // Shift performance averages
  const shiftAvgData = useMemo(() => {
    const shifts = ["Pagi", "Siang", "Malam"]
    return shifts.map((shift) => {
      const matches = submissions.filter((s) => s.shift === shift)
      const avgA = matches.length
        ? Math.round(
            (matches.reduce((sum, s) => sum + s.actualQuality, 0) / matches.length) * 10,
          ) / 10
        : 88.5
      return {
        shift,
        "Grade A": avgA,
        "Grade B": Math.round((100 - avgA) * 0.7 * 10) / 10,
        "Grade C": Math.round((100 - avgA) * 0.3 * 10) / 10,
      }
    })
  }, [submissions])

  // Filtered Submissions Table
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const matchSearch =
        (s.mandor || "").toLowerCase().includes(tableSearch.toLowerCase()) ||
        (s.name || "").toLowerCase().includes(tableSearch.toLowerCase()) ||
        (s.notes || "").toLowerCase().includes(tableSearch.toLowerCase())
      const matchShift = tableShiftFilter === "all" || s.shift === tableShiftFilter
      const matchQc = tableQcFilter === "all" 
        ? true 
        : tableQcFilter === "verified" 
          ? s.signed 
          : !s.signed
      return matchSearch && matchShift && matchQc
    })
  }, [submissions, tableSearch, tableShiftFilter, tableQcFilter])

  const todayTarget = 30000
  const todayOutput = useMemo(() => {
    return submissions.reduce((sum, s) => sum + (s.batchCount || 0), 0) || 18450
  }, [submissions])
  const targetPercent = Math.min(100, Math.round(((todayOutput / todayTarget) * 100) * 10) / 10)
  const bdriScore = 92

  return (
    <div className="space-y-5">
      {/* Top Operational Status Header */}
      <div className="bg-white/60 border border-slate-900/10 p-3.5 md:p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="text-[10px] font-mono font-extrabold uppercase text-slate-500 tracking-wider">
            Status Operasional Pabrik
          </span>
          <div className="text-sm md:text-base font-mono font-black text-[#030b85] flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-4 h-4" /> Minggu, 26 Juli 2026 ·{" "}
            <span className="text-emerald-600 font-extrabold">Shift Pagi (Aktif)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-xs font-mono text-slate-700 font-semibold flex items-center gap-1">
            <UserCheck className="w-4 h-4 text-[#030b85]" /> Supervisor On Duty:{" "}
            <strong className="text-[#030b85]">Hadi (Mandor 1)</strong>
          </div>
          <div className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300/60 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" /> Edge Gateway: Connected (Auto-Sync 5s)
          </div>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Card 1: Penghematan */}
        <div className="bg-white/45 border border-slate-900/10 rounded-2xl p-4 text-center">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            Total Penghematan
          </div>
          <div className="text-xl md:text-2xl font-mono font-black text-slate-900 my-1">
            {formatRupiah(148500000)}
          </div>
          <div className="text-xs font-mono font-bold text-emerald-600 inline-flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2%
          </div>
        </div>

        {/* Card 2: Grade A Yield */}
        <div className="bg-white/45 border border-slate-900/10 rounded-2xl p-4 text-center">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            Grade A Yield
          </div>
          <div className="text-xl md:text-2xl font-mono font-black text-slate-900 my-1">
            92.8%
          </div>
          <div className="text-xs font-mono font-bold text-emerald-600 inline-flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> +3.5%
          </div>
        </div>

        {/* Card 3: Defect Rate */}
        <div className="bg-white/45 border border-slate-900/10 rounded-2xl p-4 text-center">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            Defect Rate
          </div>
          <div className="text-xl md:text-2xl font-mono font-black text-slate-900 my-1">
            2.1%
          </div>
          <div className="text-xs font-mono font-bold text-emerald-600 inline-flex items-center gap-0.5">
            <TrendingDown className="w-3.5 h-3.5" /> -1.8%
          </div>
        </div>

        {/* Card 4: OEE with Sub-bars */}
        <div className="bg-white/45 border border-slate-900/10 rounded-2xl p-4 text-center">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            OEE Pembakaran
          </div>
          <div className="text-xl md:text-2xl font-mono font-black text-[#030b85] my-1">
            87.6%
          </div>
          <div className="space-y-1 mt-1 text-[10px] font-mono text-left">
            <div className="flex justify-between text-slate-600">
              <span>Availability</span>
              <strong>92%</strong>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#030b85] w-[92%]" />
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Performance</span>
              <strong>94%</strong>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[94%]" />
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Quality</span>
              <strong>97%</strong>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[97%]" />
            </div>
          </div>
        </div>

        {/* Card 5: ROI BRIDGE */}
        <div className="bg-white/45 border border-slate-900/10 rounded-2xl p-4 text-center">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            ROI BRIDGE
          </div>
          <div className="text-xl md:text-2xl font-mono font-black text-slate-900 my-1">
            340%
          </div>
          <div className="text-[10px] font-mono text-slate-500">Payback: 3.2 Bulan</div>
        </div>
      </div>

      {/* Target Progress Bar Card */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              Progres Target Produksi Harian
            </span>
            <div className="text-base font-mono font-black text-slate-900">
              {todayOutput.toLocaleString("id-ID")} / {todayTarget.toLocaleString("id-ID")} unit ({targetPercent}%)
            </div>
          </div>
          <span
            className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full ${
              targetPercent >= 60
                ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                : "bg-amber-100 text-amber-700 border border-amber-300"
            }`}
          >
            {targetPercent >= 60 ? "✓ On Track" : "Di Bawah Target"}
          </span>
        </div>
        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#030b85] to-[#1a3ba8] transition-all duration-500 rounded-full"
            style={{ width: `${targetPercent}%` }}
          />
        </div>
      </div>

      {/* BDRI Score Section */}
      <div className="bg-white/45 border border-slate-900/10 rounded-2xl p-4 flex items-center gap-4 flex-wrap">
        <div className="font-mono text-xs font-bold text-slate-700 w-24">BDRI Score</div>
        <div className="flex-1 min-w-[150px] h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#030b85] to-[#1a3ba8] transition-all duration-500 rounded-full"
            style={{ width: `${bdriScore}%` }}
          />
        </div>
        <div className="font-mono font-black text-base text-slate-900 w-12 text-right">
          {bdriScore}%
        </div>
        <span className="bg-[#030b85] text-white px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          ✓ Phase 3 Unlocked
        </span>
      </div>

      {/* Recharts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Line Chart */}
        <div className="bg-white/40 border border-slate-900/10 rounded-2xl p-4 h-72 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-mono font-extrabold text-slate-700 uppercase">
              Grade Yield Tren (30 Hari)
            </h3>
            <select
              value={selectedGradeLine}
              onChange={(e) => setSelectedGradeLine(e.target.value)}
              className="px-2.5 py-1 bg-white/80 border border-slate-300 rounded-full text-[11px] font-mono font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">Semua Grade</option>
              <option value="grade_a">Grade A</option>
              <option value="grade_b">Grade B</option>
              <option value="grade_c">Grade C</option>
            </select>
          </div>
          <div className="flex-1 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis domain={[50, 100]} stroke="#64748b" />
                <Tooltip />
                <Legend />
                {(selectedGradeLine === "all" || selectedGradeLine === "grade_a") && (
                  <Line
                    type="monotone"
                    dataKey="grade_a"
                    name="Grade A (%)"
                    stroke="#030b85"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: "#030b85", strokeWidth: 1.5, stroke: "#ffffff" }}
                    activeDot={{ r: 6 }}
                  />
                )}
                {(selectedGradeLine === "all" || selectedGradeLine === "grade_b") && (
                  <Line
                    type="monotone"
                    dataKey="grade_b"
                    name="Grade B (%)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#f59e0b", strokeWidth: 1, stroke: "#ffffff" }}
                    activeDot={{ r: 5 }}
                  />
                )}
                {(selectedGradeLine === "all" || selectedGradeLine === "grade_c") && (
                  <Line
                    type="monotone"
                    dataKey="grade_c"
                    name="Grade C (%)"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#ef4444", strokeWidth: 1, stroke: "#ffffff" }}
                    activeDot={{ r: 5 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/40 border border-slate-900/10 rounded-2xl p-4 h-72 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-mono font-extrabold text-slate-700 uppercase">
              Rata-rata Yield per Shift
            </h3>
            <select
              value={selectedGradeBar}
              onChange={(e) => setSelectedGradeBar(e.target.value)}
              className="px-2.5 py-1 bg-white/80 border border-slate-300 rounded-full text-[11px] font-mono font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">Semua Grade</option>
              <option value="grade_a">Grade A</option>
              <option value="grade_b">Grade B</option>
              <option value="grade_c">Grade C</option>
            </select>
          </div>
          <div className="flex-1 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shiftAvgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" />
                <XAxis dataKey="shift" stroke="#64748b" />
                <YAxis domain={[0, 100]} stroke="#64748b" />
                <Tooltip />
                <Legend />
                {(selectedGradeBar === "all" || selectedGradeBar === "grade_a") && (
                  <Bar dataKey="Grade A" fill="#030b85" radius={[4, 4, 0, 0]} />
                )}
                {(selectedGradeBar === "all" || selectedGradeBar === "grade_b") && (
                  <Bar dataKey="Grade B" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                )}
                {(selectedGradeBar === "all" || selectedGradeBar === "grade_c") && (
                  <Bar dataKey="Grade C" fill="#ef4444" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live Kiln Status Grid */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
        <h3 className="text-xs font-mono font-extrabold text-slate-700 uppercase mb-3 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-500" /> Live Kiln Status (Klik untuk Modal Diagnosis AI)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {kilns.map((k) => (
            <div
              key={k.machine}
              onClick={() => onKilnClick(k)}
              className="bg-white/70 hover:bg-white border border-slate-900/10 rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="text-xs font-mono font-bold text-slate-700">{k.machine}</div>
              <div className="text-2xl font-mono font-black text-slate-900 my-1">
                {k.temperature} °C
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    k.status === "critical"
                      ? "bg-rose-500 shadow-[0_0_8px_#ef4444]"
                      : k.status === "warning"
                      ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]"
                      : "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                  }`}
                />
                <span>
                  {k.status === "critical"
                    ? "Kritis"
                    : k.status === "warning"
                    ? "Waspada"
                    : "Normal"}
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-2">
                {k.isLive ? `Live dari ${k.mandor}` : "Data terhubung"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <h3 className="text-xs font-mono font-extrabold text-slate-700 uppercase flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4 text-[#030b85]" /> Input Terbaru dari Mandor
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari mandor / catatan..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white/80 border border-slate-300 rounded-full text-xs font-mono text-slate-800 focus:outline-none w-48"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <select
              value={tableShiftFilter}
              onChange={(e) => setTableShiftFilter(e.target.value)}
              className="px-3 py-1.5 bg-white/80 border border-slate-300 rounded-full text-xs font-mono font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">Semua Shift</option>
              <option value="Pagi">Shift Pagi</option>
              <option value="Siang">Shift Siang</option>
              <option value="Malam">Shift Malam</option>
            </select>

            <select
              value={tableQcFilter}
              onChange={(e) => setTableQcFilter(e.target.value)}
              className="px-3 py-1.5 bg-white/80 border border-slate-300 rounded-full text-xs font-mono font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">Semua QC</option>
              <option value="verified">QC Verified</option>
              <option value="pending">QC Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                <th className="p-2.5">Waktu</th>
                <th className="p-2.5">Mandor</th>
                <th className="p-2.5">Mesin</th>
                <th className="p-2.5">Shift</th>
                <th className="p-2.5">Suhu (°C)</th>
                <th className="p-2.5">Speed (RPM)</th>
                <th className="p-2.5">Batch</th>
                <th className="p-2.5">Actual Quality</th>
                <th className="p-2.5">Status Sign-off</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.slice(0, 15).map((s, idx) => (
                <tr
                  key={idx}
                  onClick={() => onSubmissionClick(s)}
                  className="border-b border-slate-900/5 hover:bg-white/80 transition-colors cursor-pointer"
                >
                  <td className="p-2.5 text-slate-500">
                    {s.timestamp.slice(0, 10)} {s.timestamp.slice(11, 16)}
                  </td>
                  <td className="p-2.5 font-bold text-slate-900">{s.mandor}</td>
                  <td className="p-2.5 text-slate-700">{s.name}</td>
                  <td className="p-2.5 text-slate-700">{s.shift}</td>
                  <td className="p-2.5 font-bold text-slate-900">{s.temperature}°C</td>
                  <td className="p-2.5 text-slate-700">{s.pusherSpeed} RPM</td>
                  <td className="p-2.5 font-bold text-slate-900">{s.batchCount}</td>
                  <td className="p-2.5 font-bold text-emerald-600">{s.actualQuality}%</td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.signed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {s.signed ? "✓ Signed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
