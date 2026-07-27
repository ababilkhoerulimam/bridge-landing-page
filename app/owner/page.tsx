"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, ArrowRight, Loader2, Settings as SettingsIcon, CheckCircle2 } from "lucide-react"
import { Sidebar, ActiveTab } from "@/components/owner/sidebar"
import { DashboardTab } from "@/components/owner/dashboard-tab"
import { DecisionIntelligenceTab } from "@/components/owner/decision-intelligence-tab"
import { MandorManagementTab } from "@/components/owner/mandor-management-tab"
import { ReportTab } from "@/components/owner/report-tab"
import { AlertsTab } from "@/components/owner/alerts-tab"
import { FinancialTab } from "@/components/owner/financial-tab"
import { QualityTab } from "@/components/owner/quality-tab"
import { OperationalTab } from "@/components/owner/operational-tab"
import { AIDiagnosisModal } from "@/components/owner/ai-diagnosis-modal"
import { QCModal } from "@/components/owner/qc-modal"
import { Submission, KilnStatusItem } from "@/types/bridge"
import { generateInitialSubmissions, INITIAL_KILNS } from "@/lib/mock-data"

export default function OwnerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [loading, setLoading] = useState(false)

  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard")
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [kilns, setKilns] = useState<KilnStatusItem[]>(INITIAL_KILNS)

  const [selectedKiln, setSelectedKiln] = useState<KilnStatusItem | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    // Check local auth
    const savedAuth = localStorage.getItem("bridge_owner_auth")
    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }

    // Load or generate initial submissions
    try {
      const storedSubmissions = localStorage.getItem("bridge_submissions")
      if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions))
      } else {
        const generated = generateInitialSubmissions()
        setSubmissions(generated)
        localStorage.setItem("bridge_submissions", JSON.stringify(generated.slice(-200)))
      }

      // Load stored kilns if any
      const storedKilns = localStorage.getItem("bridge_kiln_status")
      if (storedKilns) {
        const dict = JSON.parse(storedKilns)
        const kilnArray = Object.values(dict) as KilnStatusItem[]
        if (kilnArray.length) {
          setKilns(kilnArray)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Poll localStorage for mandor updates every 3s
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      try {
        const storedSubmissions = localStorage.getItem("bridge_submissions")
        if (storedSubmissions) {
          setSubmissions(JSON.parse(storedSubmissions))
        }
        const storedKilns = localStorage.getItem("bridge_kiln_status")
        if (storedKilns) {
          const dict = JSON.parse(storedKilns)
          const kilnArray = Object.values(dict) as KilnStatusItem[]
          if (kilnArray.length) {
            setKilns(kilnArray)
          }
        }
      } catch (e) {
        console.error(e)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    if (password === "bridge2026") {
      setLoading(true)
      setTimeout(() => {
        setIsAuthenticated(true)
        localStorage.setItem("bridge_owner_auth", "true")
        setLoading(false)
      }, 400)
    } else {
      setAuthError("Password yang Anda masukkan salah (Password Demo: bridge2026).")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("bridge_owner_auth")
  }

  const handleQcVerify = (id: string) => {
    const updated = submissions.map((s) => (s.id === id ? { ...s, signed: true } : s))
    setSubmissions(updated)
    try {
      localStorage.setItem("bridge_submissions", JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#eef2f9] bg-[radial-gradient(circle_at_20%_30%,#ffffff,#d7e3f5_70%)] text-slate-800 p-4 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-slate-900/10 rounded-3xl p-8 shadow-2xl text-center"
        >
          <div className="flex flex-col items-center mb-6">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/bridge-logo.png"
                alt="BRIDGE"
                width={170}
                height={50}
                className="w-40 h-auto mb-2 drop-shadow-md"
                priority
              />
            </Link>
            <span className="block text-xs font-mono font-extrabold text-[#030b85] uppercase tracking-widest">
              Executive Owner Intelligence Dashboard
            </span>
            <div className="mt-3 px-3 py-1.5 bg-[#030b85]/10 border border-[#030b85]/20 rounded-full text-[11px] font-mono text-[#030b85] font-extrabold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> DEMO PASS: bridge2026
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5 text-left">
                Password Eksekutif Owner
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password..."
                  className="w-full px-4 py-3 bg-white/90 border border-slate-300 rounded-2xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authError && (
              <div className="text-rose-600 text-xs font-mono font-bold bg-rose-50 border border-rose-200 py-2 rounded-xl">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full text-sm font-mono font-bold text-white bg-gradient-to-r from-[#030b85] to-[#1a3ba8] hover:from-[#1a3ba8] hover:to-[#030b85] shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Masuk Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#eef2f9] bg-[radial-gradient(circle_at_20%_30%,#ffffff,#d7e3f5_70%)] text-slate-800 p-4 md:p-6 flex justify-center">
      <div className="max-w-[1440px] w-full flex gap-5 items-start">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-10">
          <div className="bg-white/65 backdrop-blur-xl border border-slate-900/10 rounded-3xl p-5 md:p-6 shadow-[0_25px_50px_rgba(30,41,59,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <h1 className="text-xl md:text-2xl font-mono font-black text-[#030b85] uppercase tracking-tight mb-5 pb-3 border-b border-slate-900/10 flex items-center gap-2">
              {activeTab === "dashboard" && "Dashboard Utama"}
              {activeTab === "financial" && "Financial & Cost Analytics"}
              {activeTab === "quality" && "Quality Metrics"}
              {activeTab === "operational" && "Operational Metrics"}
              {activeTab === "ai" && "Decision Intelligence & AI Recipe Optimizer"}
              {activeTab === "alerts" && "Alerts & Anomalies"}
              {activeTab === "visualisasi" && "Data Visualisasi 3D"}
              {activeTab === "employee" && "Employee Performance & KPI"}
              {activeTab === "inventory" && "Inventory & Materials Management"}
              {activeTab === "target" && "Target & Goals Tracking"}
              {activeTab === "sustainability" && "Sustainability & ESG Reporting"}
              {activeTab === "audit_trail" && "Security & Audit Trail"}
              {activeTab === "report" && "Laporan Operasional Produksi"}
              {activeTab === "factory_map" && "Factory Interactive Map"}
              {activeTab === "settings" && "Pengaturan Konfigurasi Pabrik"}
            </h1>

            {activeTab === "dashboard" && (
              <DashboardTab
                submissions={submissions}
                kilns={kilns}
                onKilnClick={(k) => setSelectedKiln(k)}
                onSubmissionClick={(s) => setSelectedSubmission(s)}
              />
            )}

            {activeTab === "financial" && <FinancialTab submissions={submissions} />}

            {activeTab === "quality" && <QualityTab submissions={submissions} />}

            {activeTab === "operational" && <OperationalTab submissions={submissions} />}

            {activeTab === "ai" && <DecisionIntelligenceTab />}

            {activeTab === "employee" && <MandorManagementTab />}

            {activeTab === "alerts" && <AlertsTab />}

            {activeTab === "report" && <ReportTab submissions={submissions} />}

            {/* Placeholders for other tabs */}
            {["visualisasi", "inventory", "target", "sustainability", "audit_trail", "factory_map"].includes(activeTab) && (
              <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-10 text-center">
                <h3 className="font-mono font-extrabold text-slate-700 text-lg mb-2">Module Under Construction</h3>
                <p className="font-mono text-sm text-slate-500">This module is currently being migrated from the original prototype.</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-4 bg-white/60 border border-slate-900/10 rounded-2xl p-5 font-mono text-xs text-slate-700">
                <div className="flex items-center gap-2 text-[#030b85] font-extrabold text-sm border-b border-slate-900/10 pb-2">
                  <SettingsIcon className="w-4 h-4" /> System & Factory Configuration
                </div>
                <div className="space-y-2">
                  <div><strong>Nama Pabrik:</strong> PT Keramik Utama West Java</div>
                  <div><strong>Lokasi Kluster:</strong> Plered, Purwakarta, Jawa Barat</div>
                  <div><strong>Target Harian:</strong> 30.000 Unit / Hari</div>
                  <div><strong>Versi Platform:</strong> BRIDGE Core Intelligence v2.6.0</div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center gap-2 mt-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Semua modul terhubung dan beroperasi nominal.</span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <AIDiagnosisModal kiln={selectedKiln} onClose={() => setSelectedKiln(null)} />
      <QCModal
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        onVerify={handleQcVerify}
      />
    </div>
  )
}
