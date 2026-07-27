"use client"

import { useState } from "react"
import { FileText, Download, CheckCircle2, Table, Calendar } from "lucide-react"
import { Submission } from "@/types/bridge"

interface ReportTabProps {
  submissions: Submission[]
}

export function ReportTab({ submissions }: ReportTabProps) {
  const [downloadMessage, setDownloadMessage] = useState("")

  const handleExportCsv = () => {
    if (!submissions.length) return

    const headers = [
      "ID",
      "Machine Name",
      "Shift",
      "Mandor",
      "Temperature (C)",
      "Pusher Speed (RPM)",
      "Clay (%)",
      "Feldspar (%)",
      "Quartz (%)",
      "Batch Count",
      "Actual Quality (%)",
      "Timestamp",
      "Notes",
    ]

    const rows = submissions.map((s) => [
      s.id,
      s.name,
      s.shift,
      s.mandor,
      s.temperature,
      s.pusherSpeed,
      s.clay,
      s.feldspar,
      s.quartz,
      s.batchCount,
      s.actualQuality,
      s.timestamp,
      `"${(s.notes || "").replace(/"/g, '""')}"`,
    ])

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `laporan_produksi_bridge_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setDownloadMessage("Laporan CSV berhasil di-download!")
    setTimeout(() => setDownloadMessage(""), 4000)
  }

  return (
    <div className="space-y-5 animate-in">
      {/* Banner */}
      <div className="bg-white/60 border border-slate-900/10 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#030b85]" />
          <div>
            <h2 className="text-base font-mono font-extrabold text-[#030b85]">
              Laporan Operasional & Export Data Produksi
            </h2>
            <p className="text-xs font-mono text-slate-600">
              Download seluruh arsip logbook mandor dalam format CSV untuk kebutuhan audit & akuntansi.
            </p>
          </div>
        </div>

        <button
          onClick={handleExportCsv}
          className="py-2.5 px-5 rounded-full text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Download Laporan CSV (.csv)
        </button>
      </div>

      {downloadMessage && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold p-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{downloadMessage}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
            Total Entry Logbook Shift
          </div>
          <div className="text-2xl font-mono font-black text-[#030b85] mt-1">
            {submissions.length} Entry
          </div>
          <p className="text-xs font-mono text-slate-500 mt-1">Tersimpan dalam memori lokal & database</p>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
            Rata-rata Yield Keseluruhan
          </div>
          <div className="text-2xl font-mono font-black text-emerald-600 mt-1">
            {submissions.length
              ? (
                  submissions.reduce((sum, s) => sum + s.actualQuality, 0) / submissions.length
                ).toFixed(1)
              : 92.4}
            %
          </div>
          <p className="text-xs font-mono text-slate-500 mt-1">Proyeksi kualitatif Grade A</p>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
            Periode Data
          </div>
          <div className="text-base font-mono font-black text-slate-900 mt-1 flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#030b85]" /> 30 Hari Terakhir
          </div>
          <p className="text-xs font-mono text-slate-500 mt-1">26 Juni 2026 - 26 Juli 2026</p>
        </div>
      </div>

      {/* Preview Table */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
        <h3 className="text-xs font-mono font-extrabold text-slate-700 uppercase mb-3 flex items-center gap-1.5">
          <Table className="w-4 h-4 text-[#030b85]" /> Preview Laporan (20 Entry Terbaru)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                <th className="p-2.5">Waktu</th>
                <th className="p-2.5">Mesin</th>
                <th className="p-2.5">Shift</th>
                <th className="p-2.5">Mandor</th>
                <th className="p-2.5">Suhu (°C)</th>
                <th className="p-2.5">Pusher (RPM)</th>
                <th className="p-2.5">Batch</th>
                <th className="p-2.5">Yield (%)</th>
              </tr>
            </thead>
            <tbody>
              {submissions.slice(0, 20).map((s, idx) => (
                <tr key={idx} className="border-b border-slate-900/5 hover:bg-white/80">
                  <td className="p-2.5 text-slate-500">{s.timestamp.slice(0, 16)}</td>
                  <td className="p-2.5 font-bold text-slate-900">{s.name}</td>
                  <td className="p-2.5 text-slate-700">{s.shift}</td>
                  <td className="p-2.5 text-slate-700">{s.mandor}</td>
                  <td className="p-2.5 font-bold text-slate-900">{s.temperature}°C</td>
                  <td className="p-2.5 text-slate-700">{s.pusherSpeed} RPM</td>
                  <td className="p-2.5 font-bold text-slate-900">{s.batchCount}</td>
                  <td className="p-2.5 font-bold text-emerald-600">{s.actualQuality}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
