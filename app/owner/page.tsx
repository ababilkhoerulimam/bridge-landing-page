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
import { VisualisasiTab } from "@/components/owner/visualisasi-tab"
import { EmployeeTab } from "@/components/owner/employee-tab"
import { InventoryTab } from "@/components/owner/inventory-tab"
import { TargetTab } from "@/components/owner/target-tab"
import { SustainabilityTab } from "@/components/owner/sustainability-tab"
import { AuditTab } from "@/components/owner/audit-tab"
import { FactoryMapTab } from "@/components/owner/factory-map-tab"
import { ReportsTab } from "@/components/owner/reports-tab"
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
  const [isSimulating, setIsSimulating] = useState(true)

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

  // Poll localStorage & simulate live telemetry fluctuations every 3s
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      try {
        const storedSubmissions = localStorage.getItem("bridge_submissions")
        if (storedSubmissions) {
          setSubmissions(JSON.parse(storedSubmissions))
        }

        // Live telemetry simulation
        setKilns((prevKilns) =>
          prevKilns.map((kiln) => {
            if (!isSimulating) return kiln
            const deltaTemp = Math.floor(Math.random() * 5) - 2
            const newTemp = Math.max(1050, Math.min(1330, kiln.currentTemp + deltaTemp))
            const status =
              newTemp > 1300 || newTemp < 1080 ? "critical" : newTemp > 1250 || newTemp < 1100 ? "warning" : "normal"
            return {
              ...kiln,
              currentTemp: newTemp,
              status,
              lastUpdated: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            }
          })
        )
      } catch (e) {
        console.error(e)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isAuthenticated, isSimulating])

  const [lastSyncTime, setLastSyncTime] = useState("")

  useEffect(() => {
    setLastSyncTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB")
  }, [])

  const handleResetDatabase = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset seluruh database demo ke kondisi awal? Data input lokal mandor & tugas akan dibersihkan.")) {
      localStorage.removeItem("bridge_submissions")
      localStorage.removeItem("bridge_kiln_status")
      localStorage.removeItem("bridge_dispatched_tasks")
      window.location.reload()
    }
  }

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
            <Image
              src="/bridge-logo.png"
              alt="BRIDGE Logo"
              width={160}
              height={45}
              className="w-36 h-auto mb-2"
              priority
            />
            <h2 className="text-base font-outfit font-extrabold text-[#030b85] uppercase tracking-wide">
              Owner Executive Portal
            </h2>
            <p className="text-xs font-sans text-slate-600">Autentikasi Akses Executive Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-sans font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password Akses Owner
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password Demo (bridge2026)"
                  className="w-full px-4 py-3 bg-white/90 border border-slate-300 rounded-2xl text-sm font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-sans text-rose-700 font-semibold">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full text-sm font-sans font-bold text-white bg-gradient-to-r from-[#030b85] to-[#1a3ba8] hover:from-[#1a3ba8] hover:to-[#030b85] shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
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
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          isSimulating={isSimulating}
          onToggleSimulation={() => setIsSimulating(!isSimulating)}
          onResetDatabase={handleResetDatabase}
          lastSyncTime={lastSyncTime || "Baru Saja"}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-10">
          <div className="bg-white/65 backdrop-blur-xl border border-slate-900/10 rounded-3xl p-5 md:p-6 shadow-[0_25px_50px_rgba(30,41,59,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5 pb-3 border-b border-slate-900/10">
              <h1 className="text-xl md:text-2xl font-outfit font-extrabold text-[#030b85] uppercase tracking-tight flex items-center gap-2">
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

              {/* Live Simulation Toggle Button */}
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`px-3 py-1.5 rounded-full font-sans text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isSimulating
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700"
                    : "bg-slate-200/80 border-slate-300 text-slate-600"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSimulating ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                <span>Simulasi Telemetri Pabrik: <strong>{isSimulating ? "AKTIF" : "NONAKTIF"}</strong></span>
              </button>
            </div>

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

            {activeTab === "employee" && <EmployeeTab submissions={submissions} />}

            {activeTab === "alerts" && <AlertsTab />}

            {activeTab === "report" && <ReportsTab />}

            {activeTab === "visualisasi" && <VisualisasiTab bdriScore={85} phase3Unlocked={true} complianceScore={92} quality={88} batchTrace={[]} />}
            {activeTab === "inventory" && <InventoryTab />}
            {activeTab === "target" && <TargetTab />}
            {activeTab === "sustainability" && <SustainabilityTab />}
            {activeTab === "audit_trail" && <AuditTab submissions={submissions} />}
            {activeTab === "factory_map" && <FactoryMapTab />}

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
