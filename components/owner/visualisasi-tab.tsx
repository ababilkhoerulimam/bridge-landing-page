"use client"

import { useState, useMemo } from "react"
import { 
  BarChart, 
  Gauge, 
  Database, 
  Wifi, 
  CheckCircle2, 
  BarChart3, 
  FlaskConical, 
  Boxes,
  TrendingUp,
  Unlock,
  Search
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LineChart,
  Line
} from "recharts"

interface VisualisasiTabProps {
  bdriScore: number
  phase3Unlocked: boolean
  complianceScore: number
  quality: any
  batchTrace: any[]
}

export function VisualisasiTab({ bdriScore, phase3Unlocked, complianceScore, quality, batchTrace }: VisualisasiTabProps) {
  const [searchBatch, setSearchBatch] = useState("")

  const shiftChartData = [
    { name: "Pagi", gradeA: 87.2, gradeB: 9.5, gradeC: 3.3 },
    { name: "Siang", gradeA: 88.5, gradeB: 8.2, gradeC: 3.3 },
    { name: "Malam", gradeA: 84.1, gradeB: 10.1, gradeC: 5.8 },
  ]

  const formulationChartData = [
    { name: "B001 (50/25/20)", yield: 87.4 },
    { name: "B002 (52/28/18)", yield: 85.1 },
    { name: "B003 (48/30/22)", yield: 82.3 },
    { name: "B004 (51/24/22)", yield: 88.2 },
    { name: "B005 (49/27/21)", yield: 86.0 },
  ]

  const filteredBatches = useMemo(() => {
    if (!searchBatch) return batchTrace || []
    return batchTrace.filter(b => 
      b.batch_id.toLowerCase().includes(searchBatch.toLowerCase()) ||
      b.raw_material.toLowerCase().includes(searchBatch.toLowerCase())
    )
  }, [batchTrace, searchBatch])

  // Mock data if props are missing
  const mockQuality = quality || { grade_a_yield: 88.2 }
  const mockBdri = bdriScore || 88
  const mockCompliance = complianceScore || 92
  
  const mockBatches = filteredBatches.length > 0 ? filteredBatches : [
    { batch_id: "B-2607-001", raw_material: "Clay 50% / Feldspar 25% / Quartz 20%", produced: "2026-07-26", quality: 88.5 },
    { batch_id: "B-2607-002", raw_material: "Clay 48% / Feldspar 26% / Quartz 21%", produced: "2026-07-26", quality: 84.2 },
    { batch_id: "B-2607-003", raw_material: "Clay 51% / Feldspar 24% / Quartz 20%", produced: "2026-07-26", quality: 89.1 },
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <BarChart className="w-5 h-5 text-[#030b85]" /> Visualisasi & Analytics Overview
      </div>

      {/* BDRI Score Section */}
      <div className="bg-white/45 border border-slate-900/10 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="font-mono font-bold text-base text-[#030b85] flex items-center gap-2">
            <Gauge className="w-5 h-5" /> Bridge Digital Readiness Index (BDRI Score)
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono font-black text-2xl text-[#030b85]">{Math.round(mockBdri)}%</span>
            {mockBdri >= 85 && phase3Unlocked && (
              <span className="bg-[#030b85] text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Unlock className="w-3 h-3" /> Phase 3 Unlocked
              </span>
            )}
          </div>
        </div>
        
        <div className="h-3 w-full bg-slate-900/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#030b85] to-blue-500 rounded-full transition-all duration-700" 
            style={{ width: `${Math.min(mockBdri, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between flex-wrap gap-4 text-xs font-mono font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" /> Kelengkapan Data: <strong className="text-slate-800">92%</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" /> Machine Connectivity: <strong className="text-slate-800">80%</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Quality Consistency: <strong className="text-slate-800">86%</strong>
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Compliance Score</div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-slate-900">{mockCompliance}%</div>
            <div className="text-[9px] font-mono text-slate-500 mt-1.5">Shift mencatat logbook lengkap</div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Grade A Yield</div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-slate-900">{mockQuality.grade_a_yield}%</div>
            <div className="text-[10px] font-mono font-bold text-emerald-600 flex items-center gap-1 mt-1.5">
              <TrendingUp className="w-3 h-3" /> 5.0% vs target
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Overall Plant OEE</div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-slate-900">84.2%</div>
            <div className="text-[9px] font-mono text-slate-500 mt-1.5">Target &gt; 85.0%</div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Active Kiln Status</div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-emerald-600">4 / 4 Live</div>
            <div className="text-[10px] font-mono font-bold text-emerald-600 mt-1.5">100% Operational</div>
          </div>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Shift Performance Breakdown */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4" /> Shift Performance Breakdown (Grade A/B/C)
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={shiftChartData} margin={{ top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tickFormatter={(val) => `${val}%`} tick={{ fontSize: 10 }} width={35} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                <Bar dataKey="gradeA" name="Grade A" stackId="a" fill="#030b85" radius={[0, 0, 4, 4]} barSize={35} />
                <Bar dataKey="gradeB" name="Grade B" stackId="a" fill="#f59e0b" barSize={35} />
                <Bar dataKey="gradeC" name="Grade C (Defect)" stackId="a" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={35} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Formulasi Bahan Baku */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[300px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4" /> Formulasi Bahan Baku vs Quality Yield
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formulationChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9 }} angle={-20} textAnchor="end" height={40} />
                <YAxis stroke="#64748b" domain={[75, 95]} tick={{ fontSize: 10 }} width={35} tickFormatter={(v) => `${v}%`} />
                <Tooltip />
                <Line
                  name="Quality Yield"
                  type="monotone"
                  dataKey="yield"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#059669", strokeWidth: 2, stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Batch Traceability */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 flex flex-col overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase flex items-center gap-1.5">
            <Boxes className="w-4 h-4" /> Batch Traceability & Material Log
          </h4>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari Batch ID / Material..." 
              value={searchBatch} 
              onChange={(e) => setSearchBatch(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3 py-1.5 bg-white/70 border border-slate-900/15 rounded-lg text-xs font-mono outline-none focus:border-[#030b85]/50 transition-colors"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Batch ID</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Mesin / Kiln</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Formulasi Bahan Baku</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Mandor PJ</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Tgl Production</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Quality (%)</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Status Batch</th>
              </tr>
            </thead>
            <tbody>
              {mockBatches.map((b, i) => (
                <tr key={i} className="border-b border-slate-900/5 hover:bg-white/80 transition-colors">
                  <td className="p-2.5 font-bold text-[#030b85] whitespace-nowrap">{b.batch_id}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-700">Kiln B</td>
                  <td className="p-2.5 text-slate-600">{b.raw_material}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-700">Mandor Hadi</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-500">{b.produced}</td>
                  <td className="p-2.5 whitespace-nowrap">
                    <span className={`font-bold ${b.quality >= 85 ? "text-emerald-600" : "text-amber-600"}`}>
                      {b.quality}%
                    </span>
                  </td>
                  <td className="p-2.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] inline-block ${
                      b.quality >= 85 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {b.quality >= 85 ? "PASSED (GRADE A)" : "GRADE B"}
                    </span>
                  </td>
                </tr>
              ))}
              {mockBatches.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500 italic">
                    Tidak ditemukan batch yang sesuai pencarian
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
