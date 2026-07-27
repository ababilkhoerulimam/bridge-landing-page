"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { LogOut, ArrowLeft, Tablet } from "lucide-react"
import { LoginScreen } from "@/components/mandor/login-screen"
import { MachineForm } from "@/components/mandor/machine-form"
import { SummaryPanel } from "@/components/mandor/summary-panel"
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

  useEffect(() => {
    // Check if mandor session saved in localStorage
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
  }

  const currentMachine = machines.find((m) => m.id === selectedMachineId) || machines[0]

  const handleMachineUpdate = (updated: typeof currentMachine) => {
    setMachines(machines.map((m) => (m.id === updated.id ? updated : m)))
  }

  const handleFormSubmit = (data: typeof currentMachine) => {
    setPendingSubmission(data)
    setViewMode("handover")
  }

  return (
    <div className="min-h-screen bg-[#eef2f9] bg-[radial-gradient(circle_at_20%_30%,#ffffff,#d7e3f5_70%)] text-slate-800 p-3 md:p-6 flex items-center justify-center">
      {/* Glassmorphic Container Card (matching Mandor.html 1:1) */}
      <div className="bg-white/65 border border-slate-900/10 rounded-3xl w-full max-w-5xl min-h-[680px] flex flex-col p-4 md:p-8 backdrop-blur-xl shadow-[0_30px_60px_rgba(30,41,59,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] relative overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-900/10 pb-4 mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/bridge-logo.png"
                alt="BRIDGE"
                width={140}
                height={40}
                className="w-32 h-auto"
                priority
              />
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#030b85]/10 text-[#030b85] rounded-full text-[11px] font-sans font-extrabold uppercase">
              <Tablet className="w-3.5 h-3.5" /> Tablet Ops Portal
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SyncStatusIndicator syncState={syncState} />

            {activeMandor && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans font-bold text-slate-700 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-full">
                  Mandor: <strong className="text-[#030b85] font-outfit">{activeMandor}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-full hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        {!activeMandor ? (
          <LoginScreen onLogin={handleLogin} />
        ) : viewMode === "handover" ? (
          <ShiftHandover
            data={pendingSubmission || currentMachine}
            mandor={activeMandor}
            onLogout={handleLogout}
            onBack={() => setViewMode("form")}
            onSuccess={() => {}}
            setSyncState={setSyncState}
          />
        ) : (
          <div className="flex flex-col flex-1 gap-4">
            {/* Machine Selection Tabs */}
            <div className="flex gap-2">
              {machines.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMachineId(m.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-outfit font-extrabold transition-all cursor-pointer ${
                    selectedMachineId === m.id
                      ? "bg-[#030b85] text-white shadow-md"
                      : "bg-white/60 text-slate-700 hover:bg-white/90 border border-slate-900/10"
                  }`}
                >
                  {m.name} ({m.temperature}°C)
                </button>
              ))}
            </div>

            {/* Main Form & Summary Grid */}
            <div className="grid md:grid-cols-12 gap-4 flex-1">
              <div className="md:col-span-8">
                <MachineForm
                  machine={currentMachine}
                  onUpdate={handleMachineUpdate}
                  onSubmit={handleFormSubmit}
                  isSubmitting={false}
                />
              </div>
              <div className="md:col-span-4">
                <SummaryPanel machine={currentMachine} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
