"use client"

import { motion } from "framer-motion"
import { X, Cpu, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react"

interface AIDiagnosisModalProps {
  kiln: {
    machine: string
    temperature: number
    pusherSpeed?: number
    status: string
  } | null
  onClose: () => void
}

export function AIDiagnosisModal({ kiln, onClose }: AIDiagnosisModalProps) {
  if (!kiln) return null

  const isWarning = kiln.status === "warning"
  const isCritical = kiln.status === "critical"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#030b85] uppercase tracking-wider mb-3">
          <Cpu className="w-4 h-4" /> Diagnosis & Rekomendasi Preskriptif AI
        </div>

        <h3 className="text-xl font-mono font-extrabold text-slate-900 mb-4">
          Status Mesin: {kiln.machine}
        </h3>

        <div className="space-y-2 text-xs font-mono mb-4">
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Temperatur Zona:</span>
            <strong className="text-slate-900 font-bold">{kiln.temperature} °C</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Pusher Speed:</span>
            <strong className="text-slate-900 font-bold">{kiln.pusherSpeed || 32} RPM</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Status Operasi:</span>
            <strong
              className={`font-extrabold ${
                isCritical ? "text-rose-600" : isWarning ? "text-amber-600" : "text-emerald-600"
              }`}
            >
              {isCritical ? "KRITIS (DEVIASI)" : isWarning ? "WASPADA" : "NOMINAL OPTIMAL"}
            </strong>
          </div>
        </div>

        <div className="bg-[#030b85]/5 border border-[#030b85]/15 p-4 rounded-2xl text-xs font-mono text-slate-700 leading-relaxed">
          <span className="font-extrabold text-[#030b85] block mb-1 uppercase flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" /> REKOMENDASI KOREKTIF AI:
          </span>
          {kiln.temperature > 1300
            ? "Suhu kiln terlalu ekstrem tinggi. Risiko thermal crack besar pada biskuit keramik Grade-A. Rekomendasi: Kurangi flow gas burner 6% dan percepat pusher speed sebesar 2 RPM."
            : kiln.temperature < 1000
            ? "Suhu di bawah standar kematangan keramik standar SNI (underfired). Rekomendasi: Naikkan burner pressure 4% dan perlambat pusher RPM untuk meningkatkan dwell time pembakaran."
            : "Parameter kiln berada dalam zona optimal pembakaran. Tingkat kematangan Grade A diproyeksikan di atas 90%. Pertahankan rasio feed clay saat ini."}
        </div>
      </motion.div>
    </div>
  )
}
