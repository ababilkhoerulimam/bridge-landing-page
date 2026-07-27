"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, ClipboardCheck, CheckCircle2 } from "lucide-react"
import { Submission } from "@/types/bridge"

interface QCModalProps {
  submission: Submission | null
  onClose: () => void
  onVerify: (id: string) => void
}

export function QCModal({ submission, onClose, onVerify }: QCModalProps) {
  const [rejectCount, setRejectCount] = useState(0)
  const [category, setCategory] = useState("Normal")

  if (!submission) return null

  const batchCount = submission.batchCount || 100
  const calculatedYield = Math.max(60, Math.min(100, (((batchCount - rejectCount) / batchCount) * 100))).toFixed(1)

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
          <ClipboardCheck className="w-4 h-4" /> Detail Logbook Mandor & Verifikasi QC
        </div>

        <h3 className="text-xl font-mono font-extrabold text-slate-900 mb-4">
          {submission.name} ({submission.shift} Shift)
        </h3>

        <div className="space-y-2 text-xs font-mono mb-6">
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Operator Mandor:</span>
            <strong className="text-[#030b85] font-bold">{submission.mandor}</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Temperatur Kiln:</span>
            <strong className="text-slate-900 font-bold">{submission.temperature} °C</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Pusher Speed:</span>
            <strong className="text-slate-900 font-bold">{submission.pusherSpeed} RPM</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Komposisi Formula:</span>
            <strong className="text-slate-900 font-bold">
              Clay {submission.clay}% / Feldspar {submission.feldspar}% / Quartz {submission.quartz}%
            </strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Jumlah Batch / Proyeksi Yield:</span>
            <strong className="text-emerald-600 font-bold">
              {submission.batchCount} Unit ({submission.actualQuality}%)
            </strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Catatan Anomali:</span>
            <strong className="text-slate-700 italic">{submission.notes || "Semua normal"}</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Status Sign-off:</span>
            <strong className={submission.signed ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
              {submission.signed ? "✓ Verified Digital PIN" : "Pending Sign-Off"}
            </strong>
          </div>
        </div>

        {!submission.signed && (
          <div className="space-y-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                Input Reject / Cacat (Unit)
              </label>
              <input
                type="number"
                min={0}
                max={batchCount}
                value={rejectCount}
                onChange={(e) => setRejectCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono font-bold text-[#030b85] focus:outline-none focus:ring-2 focus:ring-[#030b85]"
              />
            </div>
            <div>
              <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                Kalkulasi Yield Grade A Aktual (%)
              </label>
              <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-mono font-black text-emerald-700">
                {calculatedYield}% Grade A Yield
              </div>
            </div>
            <div>
              <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                Kategori Anomali / Defect
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
              >
                <option value="Normal">Normal (Sesuai SOP Standar)</option>
                <option value="Retak Termal">Retak Termal (Overheat Kiln)</option>
                <option value="Deformasi Penyusutan">Deformasi Penyusutan (Tinggi Clay)</option>
                <option value="Kematangan Tidak Seragam">Kematangan Tidak Seragam (Pusher RPM)</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {!submission.signed && (
            <button
              onClick={() => {
                onVerify(submission.id)
                onClose()
              }}
              className="flex-1 py-3 px-4 rounded-full text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Verifikasi QC Ini
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-full text-xs font-mono font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  )
}
