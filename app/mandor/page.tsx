"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut, Tablet, Server, AlertTriangle, Archive, ListCheck } from "lucide-react"
import { LoginScreen } from "@/components/mandor/login-screen"
import { MachineForm } from "@/components/mandor/machine-form"
import { SummaryPanel } from "@/components/mandor/summary-panel"
import { ShiftTimeline } from "@/components/mandor/shift-timeline"
import { ShiftHandover } from "@/components/mandor/shift-handover"
import { SyncStatusIndicator, SyncState } from "@/components/mandor/sync-status-indicator"
import { INITIAL_MACHINES } from "@/lib/mock-data"

export default function MandorPage() {
  const [activeMandor, setActiveMandor] = useState<string | null>(null)
  const [machines, setMachines] = useState(INITIAL_MACHINES)
  const [selectedMachineId, setSelectedMachineId] = useState("m1")
  const [syncState, setSyncState] = useState<SyncState>("online")
  const [viewMode, setViewMode] = useState<"form" | "handover">("form")
  const [pendingSubmission, setPendingSubmission] = useState<any>(null)
  const [isSignedSubmitted, setIsSignedSubmitted] = useState(false)

  // Soft Guard Modal State
  const [softGuardModal, setSoftGuardModal] = useState<{
    show: boolean
    warnings: string[]
    data: any
  }>({
    show: false,
    warnings: [],
    data: null,
  })

  useEffect(() => {
    const savedMandor = localStorage.getItem("bridge_active_mandor")
    if (savedMandor) {
      setActiveMandor(savedMandor)
    }
  }, [])

  const handleLogin = (mandorName: string) => {
    setActiveMandor(mandorName)
    localStorage.setItem("bridge_active_mandor", mandorName)
  }

  const handleLogout = () => {
    setActiveMandor(null)
    localStorage.removeItem("bridge_active_mandor")
    setViewMode("form")
    setPendingSubmission(null)
    setIsSignedSubmitted(false)
  }

  const currentMachine = machines.find((m) => m.id === selectedMachineId) || machines[0]

  const handleMachineUpdate = (updated: typeof currentMachine) => {
    setMachines(machines.map((m) => (m.id === updated.id ? updated : m)))
  }

  // Soft Guard check matching Mandor.html prototype
  const checkSoftGuards = (data: typeof currentMachine) => {
    const warnings: string[] = []
    if (data.temperature > 1300) {
      warnings.push(`Suhu kiln (${data.temperature}°C) terdeteksi sangat tinggi di atas standar reguler.`)
    }
    if (data.pusherSpeed > 45) {
      warnings.push(`Kecepatan pendorong pusher (${data.pusherSpeed} RPM) terdeteksi di atas kecepatan optimal.`)
    }

    if (warnings.length > 0) {
      setSoftGuardModal({ show: true, warnings, data })
    } else {
      setPendingSubmission(data)
      setViewMode("handover")
    }
  }

  const confirmSoftGuard = () => {
    const data = softGuardModal.data
    setSoftGuardModal({ show: false, warnings: [], data: null })
    setPendingSubmission(data)
    setViewMode("handover")
  }

  const cancelSoftGuard = () => {
    setSoftGuardModal({ show: false, warnings: [], data: null })
  }

  const handleHelp = () => {
    alert(
      "PETUNJUK LAYAR OPERATOR TABLET (MANDOR)\n\n" +
        "1. Isi formulir parameter harian untuk mesin terpilih.\n" +
        "2. Sistem mendeteksi Hard Guard untuk mencegah salah input data (Suhu=0, Komposisi >100%, Batch=0).\n" +
        "3. Sistem mendeteksi Soft Guard untuk deviasi parameter ekstrim (Suhu >1300°C atau Pusher >45 RPM).\n" +
        '4. Klik "Submit Batch", isi catatan jika ada anomali, kemudian masukkan PIN untuk verifikasi Sign-Off ke server.'
    )
  }

  // Active timeline step calculation
  const currentStep = useMemo(() => {
    if (!activeMandor) return 0
    if (isSignedSubmitted) return 5
    if (viewMode === "handover") return 4
    if (currentMachine && currentMachine.temperature > 0 && currentMachine.clay > 0) return 3
    if (selectedMachineId) return 2
    return 1
  }, [activeMandor, selectedMachineId, currentMachine, viewMode, isSignedSubmitted])

  useEffect(() => {
    if (viewMode === "handover" && syncState === "success") {
      setIsSignedSubmitted(true)
    } else if (viewMode !== "handover") {
      setIsSignedSubmitted(false)
    }
  }, [viewMode, syncState])

  return (
    <div className="min-h-screen bg-[#eef2f9] bg-[radial-gradient(circle_at_20%_30%,#ffffff,#d7e3f5_70%)] text-slate-800 p-3 md:p-6 flex items-center justify-center font-sans">
      {/* Glassmorphic Container Card matching Mandor.html 1:1 */}
      <div className="bg-white/65 border border-slate-900/10 rounded-3xl w-full max-w-[1000px] h-[680px] flex flex-col p-4 md:p-6 backdrop-blur-xl shadow-[0_30px_60px_rgba(30,41,59,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] relative overflow-hidden">
        {/* Soft Guard Confirmation Modal */}
        <AnimatePresence>
          {softGuardModal.show && (
            <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white border border-slate-900/10 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center space-y-4"
              >
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-lg font-outfit font-extrabold text-slate-900">Konfirmasi Penyimpangan</h3>
                <div className="space-y-2 text-xs font-sans text-slate-700">
                  {softGuardModal.warnings.map((w, idx) => (
                    <p key={idx} className="font-semibold text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200">
                      {w}
                    </p>
                  ))}
                  <p className="text-[11px] text-slate-500 pt-2">
                    Apakah Anda yakin parameter ini sudah sesuai dengan kondisi aktual di lapangan?
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={cancelSoftGuard}
                    className="flex-1 py-2.5 px-4 rounded-full border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-sans font-bold transition-all cursor-pointer"
                  >
                    Periksa Kembali
                  </button>
                  <button
                    onClick={confirmSoftGuard}
                    className="flex-1 py-2.5 px-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-sans font-bold shadow-md transition-all cursor-pointer"
                  >
                    Ya, Konfirmasi
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Top Header Bar matching Mandor.html */}
        <div className="flex items-center justify-between border-b border-slate-900/10 pb-3 mb-3 flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/bridge-logo.png"
                alt="BRIDGE"
                width={130}
                height={36}
                className="w-28 h-auto"
                priority
              />
            </Link>
            {activeMandor && (
              <span className="text-xs font-sans text-slate-600 font-medium">
                Operator: <strong className="text-[#030b85] font-outfit font-extrabold">{activeMandor}</strong>
              </span>
            )}
          </div>

          {activeMandor && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#030b85]/10 text-[#030b85] border border-[#030b85]/15 rounded-full text-[11px] font-sans font-bold">
                <ListCheck className="w-3.5 h-3.5" />
                <span>
                  Progress Logging: {machines.filter((m) => m.temperature > 0).length} / {machines.length} Mesin
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-sans font-bold border border-emerald-200">
                <Archive className="w-3.5 h-3.5" />
                <span>Offline Queue: 0 (Synced)</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <SyncStatusIndicator syncState={syncState} />
            {activeMandor && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-full hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        {!activeMandor ? (
          <div className="flex-1 flex items-center justify-center">
            <LoginScreen onLogin={handleLogin} />
          </div>
        ) : viewMode === "handover" ? (
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ShiftHandover
              data={pendingSubmission || currentMachine}
              mandor={activeMandor}
              onLogout={handleLogout}
              onBack={() => setViewMode("form")}
              onSuccess={() => {}}
              setSyncState={setSyncState}
            />
          </div>
        ) : (
          /* Main 3-Column Grid matching Mandor.html: 180px 1fr 220px */
          <div className="grid grid-cols-[180px_1fr_220px] gap-4 flex-1 min-h-0 overflow-hidden">
            {/* Column 1: Kiln Machine Selection List */}
            <div className="flex flex-col gap-2 overflow-y-auto pr-1 border-r border-slate-900/10">
              <div className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-[#030b85]" /> Mesin Kiln
              </div>
              {machines.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMachineId(m.id)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    selectedMachineId === m.id
                      ? "bg-[#030b85]/10 border border-[#030b85]/20 shadow-xs"
                      : "bg-white/40 border border-slate-900/5 hover:bg-white/80"
                  }`}
                >
                  <div className="font-outfit font-extrabold text-xs text-slate-900">{m.name}</div>
                  <div className="text-[10px] font-sans text-slate-500 mt-0.5">
                    Suhu: {m.temperature}°C · Batch: {m.batchCount}
                  </div>
                </button>
              ))}
            </div>

            {/* Column 2: Main Machine Parameter Entry Form */}
            <div className="overflow-y-auto pr-1">
              <MachineForm
                machine={currentMachine}
                onUpdate={handleMachineUpdate}
                onSubmit={checkSoftGuards}
                isSubmitting={false}
                onHelp={handleHelp}
              />
            </div>

            {/* Column 3: Summary Panel & Shift Timeline */}
            <div className="flex flex-col gap-3 overflow-y-auto pl-1 border-l border-slate-900/10">
              <SummaryPanel machine={currentMachine} />
              <ShiftTimeline step={currentStep} isWarning={currentMachine.temperature > 1300 || currentMachine.pusherSpeed > 45} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
