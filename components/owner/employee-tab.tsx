"use client"

import { useMemo } from "react"
import { 
  Users, 
  BarChart, 
  GraduationCap, 
  IdCard, 
  Star,
  CheckCircle2,
  AlertTriangle
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts"
import { Submission } from "@/types/bridge"

interface EmployeeTabProps {
  submissions: Submission[]
}

export function EmployeeTab({ submissions }: EmployeeTabProps) {
  // Hardcoded mock metrics
  const data = {
    compliance_rate: 56.4
  }

  const supervisorStats = useMemo(() => {
    const stats: Record<string, any> = {
      Hadi: { shifts: 0, total_quality: 0, warnings: 0, shiftCounts: 12 },
      Budi: { shifts: 0, total_quality: 0, warnings: 0, shiftCounts: 10 },
      Samsul: { shifts: 0, total_quality: 0, warnings: 0, shiftCounts: 14 }
    }
    
    submissions.forEach(s => {
      const mandor = s.mandor || "Hadi"
      if (stats[mandor]) {
        stats[mandor].shifts += 1
        stats[mandor].total_quality += s.actualQuality || 88.0
        if (s.temperature && (s.temperature < 1100 || s.temperature > 1250)) {
          stats[mandor].warnings += 1
        }
      }
    })

    return Object.keys(stats).map(name => {
      const s = stats[name]
      const avg_yield = s.shifts > 0 
        ? parseFloat((s.total_quality / s.shifts).toFixed(1)) 
        : (name === 'Samsul' ? 87.5 : (name === 'Budi' ? 87.4 : 87.0))
      
      const compliance = s.shifts > 0 
        ? parseFloat((((s.shifts - s.warnings) / s.shifts) * 100).toFixed(1)) 
        : (name === 'Samsul' ? 58.3 : (name === 'Budi' ? 57.1 : 53.3))
      
      return {
        mandor: name,
        shifts: s.shifts || s.shiftCounts,
        grade_a: avg_yield,
        compliance: compliance,
        warnings: s.warnings,
        training_need: true // hardcoded from prototype
      }
    })
  }, [submissions])

  const compareChartData = [
    { name: 'Hadi', gradeA: 87.0, compliance: 53.3 },
    { name: 'Budi', gradeA: 87.4, compliance: 57.1 },
    { name: 'Samsul', gradeA: 87.5, compliance: 58.3 },
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <Users className="w-5 h-5 text-[#030b85]" /> Employee Performance & Supervisor Scorecard
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Compliance Rate</div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-slate-900">{data.compliance_rate}%</div>
            <div className="text-[10px] font-mono font-bold text-rose-600 mt-1.5">Perlu Peningkatan SOP</div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Active Mandor</div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-slate-900">3 Personil</div>
            <div className="text-[9px] font-mono text-slate-500 mt-1.5">Shift Pagi, Siang, Malam</div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Top Performing Mandor</div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-emerald-600 flex items-center gap-2">
              Samsul <Star className="w-4 h-4 fill-emerald-600" />
            </div>
            <div className="text-[10px] font-mono font-bold text-emerald-600 mt-1.5">Grade A Yield 87.5%</div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Training Need Alert</div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-amber-600">3 Mandor</div>
            <div className="text-[9px] font-mono text-slate-500 mt-1.5">Pengawasan SOP Kiln</div>
          </div>
        </div>
      </div>

      {/* Middle Row: Chart & Training Needs */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Chart */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[320px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <BarChart className="w-4 h-4" /> Perbandingan Grade A Yield per Mandor
          </h4>
          <div className="flex-1 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={compareChartData} margin={{ top: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tickFormatter={(val) => `${val}%`} tick={{ fontSize: 10 }} width={35} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} formatter={(val: number) => `${val}%`} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="gradeA" name="Grade A Yield (%)" fill="#030b85" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="compliance" name="Compliance Rate (%)" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={25} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Skill Gap */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[320px] overflow-y-auto custom-scrollbar flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5 sticky top-0 bg-white/60 backdrop-blur-md pb-2">
            <GraduationCap className="w-4 h-4" /> Modul Pelatihan Rekomendasi (AI Skill Gap)
          </h4>
          <div className="flex flex-col gap-3">
            <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-200">
              <div className="font-extrabold text-xs text-rose-600 flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-3.5 h-3.5" /> Mandor Hadi
              </div>
              <div className="text-[11px] text-slate-700 font-medium">
                <strong>SOP Suhu Kiln & Burner Control:</strong> Mengatasi tingkat compliance 53.3% dan pencegahan overheat pada shift malam.
              </div>
            </div>
            
            <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200">
              <div className="font-extrabold text-xs text-amber-600 flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-3.5 h-3.5" /> Mandor Budi
              </div>
              <div className="text-[11px] text-slate-700 font-medium">
                <strong>Kedisiplinan Logbook Digital:</strong> Standardisasi input data berkala dan pencatatan variabel produksi secara tepat waktu.
              </div>
            </div>

            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
              <div className="font-extrabold text-xs text-emerald-600 flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-3.5 h-3.5" /> Mandor Samsul
              </div>
              <div className="text-[11px] text-slate-700 font-medium">
                <strong>Maintenance Cetakan & Moulding Line:</strong> Pengelolaan keausan mould untuk mempertahankan Grade A Yield tertinggi (87.5%).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scorecard Table */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 flex flex-col overflow-hidden">
        <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
          <IdCard className="w-4 h-4" /> Mandor Scorecard (Live Aggregations)
        </h4>
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Mandor</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Shifts Handled</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Grade A Yield (%)</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Status</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Training Need</th>
              </tr>
            </thead>
            <tbody>
              {supervisorStats.map((s, i) => (
                <tr key={i} className="border-b border-slate-900/5 hover:bg-white/80 transition-colors">
                  <td className="p-2.5 font-bold text-slate-900">{s.mandor}</td>
                  <td className="p-2.5 text-slate-700">{s.shifts} Shift</td>
                  <td className="p-2.5 font-bold text-[#030b85]">{s.grade_a}%</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                      s.grade_a >= 85 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.grade_a >= 85 ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                      {s.grade_a >= 85 ? "Performa Baik" : "Perlu Peningkatan"}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <span className={`font-bold inline-flex items-center gap-1 text-[11px] ${
                      s.training_need ? "text-amber-600" : "text-emerald-600"
                    }`}>
                      {s.training_need ? <GraduationCap className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {s.training_need 
                        ? (s.mandor === 'Hadi' ? 'Modul SOP Suhu Kiln' : (s.mandor === 'Budi' ? 'Modul SOP Logbook Digital' : 'Modul SOP Cetakan Moulding')) 
                        : 'Sudah Terlatih'}
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
