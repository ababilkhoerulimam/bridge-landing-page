"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Network,
  Monitor,
  Cpu,
  Database,
  Brain,
  CheckCircle2,
  Loader2,
  Play,
  Tablet,
  BarChart3,
  Key,
  ShieldCheck,
} from "lucide-react"

export default function PrototypeHubPage() {
  const [step, setStep] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [showSelector, setShowSelector] = useState(false)
  const [todayProd, setTodayProd] = useState("22,500 unit")

  useEffect(() => {
    // Simulate system initialization check steps
    const timers = [
      setTimeout(() => setStep(1), 300), // Nginx
      setTimeout(() => setStep(2), 600), // Frontend
      setTimeout(() => setStep(3), 900), // Backend
      setTimeout(() => setStep(4), 1200), // Database
      setTimeout(() => {
        setStep(5)
        setIsReady(true)
      }, 1500), // Decision Intelligence
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  const services = [
    { key: "nginx", label: "Reverse Proxy (Nginx)", icon: Network, stepNum: 1 },
    { key: "frontend", label: "Frontend Assets", icon: Monitor, stepNum: 2 },
    { key: "backend", label: "Backend Core API", icon: Cpu, stepNum: 3 },
    { key: "database", label: "PostgreSQL Database", icon: Database, stepNum: 4 },
    { key: "di", label: "Decision Intelligence", icon: Brain, stepNum: 5 },
  ]

  return (
    <div className="min-h-screen bg-[#eef2f9] bg-[radial-gradient(circle_at_20%_30%,#ffffff,#d7e3f5_70%)] text-[#1e293b] flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-2xl text-center z-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center"
        >
          <Image
            src="/bridge-logo.png"
            alt="BRIDGE Logo"
            width={190}
            height={60}
            className="w-48 h-auto mb-2 drop-shadow-[0_4px_12px_rgba(3,11,133,0.15)]"
            priority
          />
          <h1 className="font-mono text-xl md:text-2xl font-black text-[#030b85] tracking-widest uppercase mt-1">
            Industry Intelligence Platform
          </h1>
          <p className="text-xs font-mono text-[#0f172a]/60 mt-1">
            Interactive Presentation & Demo Simulation Portal
          </p>
        </motion.div>

        {/* Glass Status Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`bg-white/65 backdrop-blur-xl border ${
            isReady ? "border-emerald-500/40 shadow-emerald-500/10" : "border-[#0f172a]/10"
          } rounded-3xl p-6 md:p-8 shadow-[0_25px_50px_rgba(30,41,59,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-500`}
        >
          {/* Header Title */}
          <div className="text-sm md:text-base font-bold uppercase tracking-wider text-[#0f172a]/70 mb-6 flex items-center justify-center gap-2">
            {isReady ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-emerald-600 font-extrabold">System Fully Operational</span>
              </>
            ) : (
              <>
                <Cpu className="w-5 h-5 text-[#030b85] animate-pulse" />
                <span>System Initialization</span>
              </>
            )}
          </div>

          {!showSelector ? (
            <>
              {/* Service Health Board */}
              <div className="flex flex-col gap-3 text-left mb-6">
                {services.map((s) => {
                  const Icon = s.icon
                  const isServiceReady = step >= s.stepNum

                  return (
                    <div
                      key={s.key}
                      className={`flex items-center justify-between p-3 px-4 rounded-xl border transition-all duration-300 ${
                        isServiceReady
                          ? "bg-[#030b85]/5 border-[#030b85]/20 text-[#1e293b]"
                          : "bg-white/50 border-[#0f172a]/5 text-[#1e293b]/60"
                      }`}
                    >
                      <div className="flex items-center gap-3 text-sm font-semibold">
                        <Icon
                          className={`w-4 h-4 ${
                            isServiceReady ? "text-emerald-500" : "text-[#0f172a]/40"
                          }`}
                        />
                        <span>{s.label}</span>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1.5 ${
                          isServiceReady
                            ? "bg-emerald-500/15 text-emerald-600"
                            : "bg-amber-500/15 text-amber-600"
                        }`}
                      >
                        {isServiceReady ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Ready
                          </>
                        ) : (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" /> Checking
                          </>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Live Metrics Summary */}
              {isReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-3 mb-6 text-center"
                >
                  <div className="bg-white/85 border border-[#030b85]/15 p-3 rounded-xl shadow-sm">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-extrabold tracking-wider">
                      Today's Output
                    </div>
                    <div className="text-sm md:text-base font-black text-[#030b85] mt-0.5">
                      {todayProd}
                    </div>
                  </div>
                  <div className="bg-white/85 border border-[#030b85]/15 p-3 rounded-xl shadow-sm">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-extrabold tracking-wider">
                      Connected Tablets
                    </div>
                    <div className="text-sm md:text-base font-black text-amber-600 mt-0.5">
                      3 Tablets
                    </div>
                  </div>
                  <div className="bg-white/85 border border-[#030b85]/15 p-3 rounded-xl shadow-sm">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-extrabold tracking-wider">
                      Sync Status
                    </div>
                    <div className="text-sm md:text-base font-black text-emerald-600 mt-0.5">
                      Demo Ready
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Progress Indicator Bar */}
              <div className="w-full h-2 bg-[#0f172a]/10 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-[#030b85] to-[#1a3ba8] transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>

              {/* Launch Button */}
              <button
                onClick={() => setShowSelector(true)}
                disabled={!isReady}
                className="w-full py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#030b85] to-[#1a3ba8] hover:from-[#1a3ba8] hover:to-[#030b85] shadow-[0_8px_28px_rgba(3,11,133,0.25)] hover:shadow-[0_12px_32px_rgba(3,11,133,0.35)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" /> Launch Simulation
              </button>
            </>
          ) : (
            /* App Cards Selector Grid */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 gap-4 text-left"
            >
              {/* Mandor App Card */}
              <Link
                href="/mandor"
                className="group bg-white/70 hover:bg-white border border-[#0f172a]/10 hover:border-[#030b85]/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[#030b85]/10 text-[#030b85] flex items-center justify-center mb-3 group-hover:bg-[#030b85] group-hover:text-white transition-colors duration-300">
                  <Tablet className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  Tablet Ops (Mandor)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  Operator shift entry, material recipe validation, and digital sign-off logbook.
                </p>
                <div className="mt-4 p-2.5 bg-[#030b85]/5 border border-[#030b85]/15 rounded-xl text-[11px] font-mono text-[#030b85] font-bold text-center flex items-center justify-center gap-1.5">
                  <Key className="w-3.5 h-3.5" /> DEMO PIN: 1234 (Hadi) | 5678 (Budi) | 9012 (Samsul)
                </div>
              </Link>

              {/* Owner App Card */}
              <Link
                href="/owner"
                className="group bg-white/70 hover:bg-white border border-[#0f172a]/10 hover:border-[#059669]/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  Owner Dashboard
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  Live production OEE metrics, material diagnostics, and prescriptive next-batch optimizations.
                </p>
                <div className="mt-4 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] font-mono text-emerald-700 font-bold text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> DEMO PASS: bridge2026
                </div>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Footer Brand */}
        <div className="mt-8 text-xs font-mono text-[#0f172a]/40 tracking-wider uppercase">
          PT BRIDGE INFRADATA INDONESIA &copy; 2026. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  )
}
