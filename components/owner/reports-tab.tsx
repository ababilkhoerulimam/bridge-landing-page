"use client"

import { useState } from "react"
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  FileDown,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Filter
} from "lucide-react"

export function ReportsTab() {
  const [reportType, setReportType] = useState("monthly")
  const [dateRange, setDateRange] = useState("2026-07")
  const [format, setFormat] = useState("pdf")

  const handleExport = () => {
    alert(`Exporting ${reportType} report for ${dateRange} in ${format.toUpperCase()} format.`)
  }

  const generatedReports = [
    { name: "Laporan Konsolidasi Produksi Juli 2026", date: "01 Aug 2026", type: "PDF", size: "2.4 MB" },
    { name: "Audit Keamanan Q2 2026", date: "15 Jul 2026", type: "PDF", size: "1.1 MB" },
    { name: "Log Raw Data Mesin Kiln (Minggu 3)", date: "21 Jul 2026", type: "CSV", size: "8.5 MB" },
    { name: "Performance Mandor Semester 1", date: "05 Jul 2026", type: "XLSX", size: "3.2 MB" }
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <FileText className="w-5 h-5 text-[#030b85]" /> Reports & Data Export
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-5">
        {/* Generate Report Form */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-6 flex flex-col h-fit">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-6 flex items-center gap-1.5 border-b border-slate-900/10 pb-3">
            <Filter className="w-4 h-4" /> Generator Laporan Baru
          </h4>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                Jenis Laporan
              </label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-white border border-slate-900/10 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-none focus:border-[#030b85]/50 transition-colors"
              >
                <option value="monthly">Konsolidasi Bulanan</option>
                <option value="daily">Laporan Harian (Shift)</option>
                <option value="quality">Quality & Yield Analysis</option>
                <option value="esg">ESG & Sustainability Report</option>
                <option value="audit">Security Audit Trail</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                Periode
              </label>
              <div className="relative">
                <CalendarIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="month" 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-white border border-slate-900/10 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-none focus:border-[#030b85]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                Format Output
              </label>
              <div className="flex gap-3">
                <button 
                  onClick={() => setFormat("pdf")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                    format === "pdf" 
                      ? "bg-rose-50 border-rose-200 text-rose-700" 
                      : "bg-white border-slate-900/10 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <FileDown className="w-4 h-4" /> PDF
                </button>
                <button 
                  onClick={() => setFormat("csv")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                    format === "csv" 
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                      : "bg-white border-slate-900/10 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" /> CSV
                </button>
              </div>
            </div>

            <button 
              onClick={handleExport}
              className="w-full mt-4 bg-[#030b85] text-white rounded-xl py-3 text-xs font-mono font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#030b85]/90 transition-colors shadow-lg shadow-[#030b85]/20"
            >
              <Download className="w-4 h-4" /> Generate Report
            </button>
          </div>
        </div>

        {/* Recent Reports List */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-6 flex flex-col h-fit">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-6 flex items-center gap-1.5 border-b border-slate-900/10 pb-3">
            <CheckCircle2 className="w-4 h-4" /> Riwayat Laporan (30 Hari Terakhir)
          </h4>
          
          <div className="space-y-3">
            {generatedReports.map((report, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-white border border-slate-900/10 rounded-xl hover:border-[#030b85]/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    report.type === "PDF" ? "bg-rose-100 text-rose-600" :
                    report.type === "CSV" ? "bg-emerald-100 text-emerald-600" :
                    "bg-[#030b85]/10 text-[#030b85]"
                  }`}>
                    {report.type === "PDF" ? <FileDown className="w-5 h-5" /> : 
                     report.type === "CSV" ? <FileSpreadsheet className="w-5 h-5" /> :
                     <FileText className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-mono font-bold text-xs text-slate-800">{report.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-2">
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span className="font-extrabold uppercase tracking-wider">{report.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg text-slate-400 hover:text-[#030b85] hover:bg-[#030b85]/10 transition-colors">
                    <Printer className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-900/10 text-center">
            <button className="text-[10px] font-mono font-bold text-[#030b85] uppercase tracking-wider hover:underline">
              Lihat Semua Laporan →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
