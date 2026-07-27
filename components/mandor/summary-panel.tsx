"use client"

import { FileText } from "lucide-react"

interface SummaryPanelProps {
  machine: {
    name: string
    temperature: number
    pusherSpeed: number
    clay: number
    feldspar: number
    quartz: number
    batchCount: number
  } | null
}

export function SummaryPanel({ machine }: SummaryPanelProps) {
  if (!machine) {
    return <div className="text-slate-400 font-mono text-xs">Pilih mesin...</div>
  }

  const totalComposition = Math.round((machine.clay + machine.feldspar + machine.quartz) * 10) / 10
  const isOver = totalComposition > 100

  return (
    <div className="bg-white/40 border border-slate-900/10 rounded-2xl p-4 md:p-5 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-mono font-extrabold text-slate-600 uppercase tracking-wider mb-3 pb-2 border-b border-slate-900/10 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-[#030b85]" /> Summary Data Shift
        </h3>

        <div className="flex flex-col gap-2.5 text-xs font-mono">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Nama Mesin:</span>
            <strong className="text-slate-900 font-bold">{machine.name}</strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Suhu Kiln:</span>
            <strong className="text-slate-900 font-bold">{machine.temperature} °C</strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Kecepatan Pusher:</span>
            <strong className="text-slate-900 font-bold">{machine.pusherSpeed} RPM</strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Clay (Tanah Liat):</span>
            <strong className="text-slate-900 font-bold">{machine.clay}%</strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Feldspar:</span>
            <strong className="text-slate-900 font-bold">{machine.feldspar}%</strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Quartz:</span>
            <strong className="text-slate-900 font-bold">{machine.quartz}%</strong>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-slate-900/10">
            <span className="text-slate-600">Total Komposisi:</span>
            <strong className={isOver ? "text-rose-600 font-extrabold" : "text-slate-900 font-bold"}>
              {totalComposition}%
            </strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Batch Count:</span>
            <strong className="text-[#030b85] font-extrabold">{machine.batchCount} Unit</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
