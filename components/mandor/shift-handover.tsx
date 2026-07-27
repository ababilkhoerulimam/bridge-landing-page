"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Lock, AlertTriangle, Loader2, ArrowLeft } from "lucide-react"
import { MANDOR_PINS } from "@/lib/mock-data"

interface ShiftHandoverProps {
  data: {
    id: string
    name: string
    temperature: number
    clay: number
    feldspar: number
    quartz: number
    pusherSpeed: number
    batchCount: number
    shift?: string
  }
  mandor: string
  onLogout: () => void
  onBack: () => void
  onSuccess: (submissionData: any) => void
  setSyncState: (state: any) => void
}

export function ShiftHandover({
  data,
  mandor,
  onLogout,
  onBack,
  onSuccess,
  setSyncState,
}: ShiftHandoverProps) {
  const [notes, setNotes] = useState("")
  const [rejectUnits, setRejectUnits] = useState(2)
  const [signPin, setSignPin] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const totalBatch = Math.max(1, data.batchCount || 100)
  const validReject = Math.max(0, Math.min(totalBatch, rejectUnits || 0))
  const calculatedYield = Math.max(
    60.0,
    Math.min(99.0, Math.round(((totalBatch - validReject) / totalBatch) * 100 * 10) / 10),
  ).toFixed(1)

  const handleSignOff = () => {
    setError("")
    if (signPin.length !== 4) {
      setError("Masukkan PIN 4 digit.")
      return
    }

    setLoading(true)
    setSyncState("syncing")

    setTimeout(() => {
      if (MANDOR_PINS[mandor] !== signPin) {
        setError("PIN Salah.")
        setSyncState("error")
        setLoading(false)
        return
      }

      const entry = {
        id: data.id,
        name: data.name,
        shift: data.shift || "Pagi",
        temperature: data.temperature,
        clay: data.clay,
        feldspar: data.feldspar,
        quartz: data.quartz,
        pusherSpeed: data.pusherSpeed,
        batchCount: totalBatch,
        mandor,
        notes: notes || "Semua parameter normal",
        timestamp: new Date().toISOString(),
        signed: true,
        actualQuality: parseFloat(calculatedYield),
      }

      // Save to localStorage
      try {
        const stored = localStorage.getItem("bridge_submissions")
        const submissions = stored ? JSON.parse(stored) : []
        submissions.push(entry)
        localStorage.setItem("bridge_submissions", JSON.stringify(submissions.slice(-200)))

        const storedKilns = localStorage.getItem("bridge_kiln_status")
        const kilnsDict = storedKilns ? JSON.parse(storedKilns) : {}
        kilnsDict[data.name] = {
          machine: data.name,
          temperature: data.temperature,
          pusherSpeed: data.pusherSpeed,
          updatedAt: new Date().toISOString(),
          mandor,
          status: data.temperature > 1300 ? "critical" : data.temperature < 1000 ? "warning" : "normal",
          isLive: true,
        }
        localStorage.setItem("bridge_kiln_status", JSON.stringify(kilnsDict))
      } catch (e) {
        console.error(e)
      }

      setSyncState("success")
      setLoading(false)
      setIsDone(true)
      onSuccess(entry)
      setTimeout(() => setSyncState("online"), 3000)
    }, 500)
  }

  if (isDone) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 my-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-mono font-extrabold text-slate-900 mb-2">
          Digital Sign-Off Berhasil!
        </h3>
        <p className="text-xs font-mono text-slate-600 mb-6 max-w-sm">
          Data batch pembakaran telah berhasil diverifikasi dengan PIN dan disimpan secara offline (auto-sync saat online).
        </p>
        <button
          onClick={onLogout}
          className="py-3 px-8 rounded-full text-xs font-mono font-bold text-white bg-[#030b85] hover:bg-[#1a3ba8] shadow-lg transition-all cursor-pointer"
        >
          Selesai & Serah Terima Shift
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 max-w-lg mx-auto w-full my-auto"
    >
      <div className="flex items-center justify-between border-b border-slate-900/10 pb-3">
        <button
          onClick={onBack}
          className="text-xs font-mono font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <h3 className="text-sm font-mono font-extrabold text-[#030b85] uppercase">
          Verifikasi PIN Sign-Off Shift Handover
        </h3>
      </div>

      {/* Summary Box */}
      <div className="bg-white/70 border border-slate-900/10 rounded-2xl p-4 text-xs font-mono space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-600">Operator Mandor:</span>
          <strong className="text-[#030b85] font-bold">{mandor}</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Mesin / Shift:</span>
          <strong className="text-slate-900 font-bold">{data.name} ({data.shift || "Pagi"})</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Suhu & Speed:</span>
          <strong className="text-slate-900 font-bold">{data.temperature}°C / {data.pusherSpeed} RPM</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Total Batch / Proyeksi Yield:</span>
          <strong className="text-emerald-600 font-bold">{totalBatch} Unit ({calculatedYield}%)</strong>
        </div>
      </div>

      {/* Reject Count Input */}
      <div>
        <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
          Estimasi Unit Reject (Penyusunan/Cacat Visual)
        </label>
        <input
          type="number"
          value={rejectUnits}
          onChange={(e) => setRejectUnits(parseInt(e.target.value) || 0)}
          min={0}
          max={totalBatch}
          className="w-full px-3 py-2 bg-white/80 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
        />
      </div>

      {/* Anomaly Notes Input */}
      <div>
        <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
          Catatan Anomali Opsional
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tuliskan catatan jika ada fluktuasi gas atau masalah teknis mesin..."
          className="w-full px-3 py-2 bg-white/80 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#030b85] h-20 resize-none"
        />
      </div>

      {/* PIN Verification Input */}
      <div>
        <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
          PIN Sign-Off Mandor (4 Digit)
        </label>
        <div className="relative">
          <input
            type="password"
            value={signPin}
            onChange={(e) => setSignPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="••••"
            maxLength={4}
            className="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-center text-lg tracking-[0.3em] font-mono text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#030b85]"
          />
          <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {error && (
        <div className="text-rose-600 text-center text-xs font-mono font-bold bg-rose-50 border border-rose-200 py-2 rounded-xl flex items-center justify-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleSignOff}
        disabled={loading}
        className="w-full py-3.5 rounded-full text-xs md:text-sm font-mono font-bold text-white bg-gradient-to-r from-[#030b85] to-[#1a3ba8] hover:from-[#1a3ba8] hover:to-[#030b85] shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-1"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>Konfirmasi Sign-Off Digital</span>
          </>
        )}
      </button>
    </motion.div>
  )
}
