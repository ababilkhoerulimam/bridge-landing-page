"use client"

import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLenis } from "lenis/react"
import { X, MessageSquare, Mail } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isHovering, setIsHovering] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isStarterModalOpen, setIsStarterModalOpen] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })
  const lenis = useLenis()

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  })
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  const scrollToDemo = () => {
    const element = document.querySelector("#demo-form")
    if (element && lenis) {
      lenis.scrollTo(element as HTMLElement, { offset: -80 })
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Thank you! We will get in touch with you shortly.")
      setEmail("")
    }, 1000)
  }

  return (
    <footer id="pricing" ref={footerRef} className="bg-[#121212] text-white pt-20 pb-8 relative overflow-hidden">
      {/* Giant Background Watermark Text with Parallax */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
      >
        <span className="text-[22vw] font-black text-white/[0.035] tracking-tighter uppercase font-outfit leading-none whitespace-nowrap">
          BRIDGE
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12"
        >
          <span className="font-mono text-[#3b82f6] text-xs tracking-widest uppercase">
            PRICING PLANS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mt-2">
            Simple, Transparent Investment
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Starter Card */}
          <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 text-left relative overflow-hidden">
            <div className="text-xs font-mono text-white/50 tracking-widest mb-2 uppercase">STARTER</div>
            <div className="text-3xl font-black text-white">
              Rp 5.000.000<span className="text-sm font-mono text-white/40"> / month</span>
            </div>
            <div className="text-xs font-mono text-white/40 mb-4">+ Rp 15.000.000 One-time Onboarding</div>
            <ul className="space-y-2 mb-6">
              {[
                "Unlimited mandor accounts",
                "Offline data logging",
                "Hard/Soft Guard validation",
                "Live owner dashboard",
                "Email & WhatsApp support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs font-mono text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  {f}
                </li>
              ))}
            </ul>
            <motion.button
              onClick={() => setIsStarterModalOpen(true)}
              className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Pro Card */}
          <div className="bg-[#3b82f6]/10 border-2 border-[#3b82f6]/30 rounded-2xl p-6 text-left relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#3b82f6] text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
              RECOMMENDED
            </div>
            <div className="text-xs font-mono text-[#3b82f6] tracking-widest mb-2 uppercase">PRO</div>
            <div className="text-3xl font-black text-white">
              Rp 10.000.000<span className="text-sm font-mono text-white/40"> / month</span>
            </div>
            <div className="text-xs font-mono text-white/40 mb-4">+ Rp 15.000.000 One-time Onboarding</div>
            <ul className="space-y-2 mb-6">
              {[
                "Everything in Starter",
                "Decision Intelligence AI",
                "Multi-shift supervisor integrations",
                "Advanced analytics export",
                "Priority on-site support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs font-mono text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  {f}
                </li>
              ))}
            </ul>
            <motion.button
              onClick={() => setIsProModalOpen(true)}
              className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        {/* Email Form Container */}
        <motion.div
          id="demo-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto mb-12 scroll-mt-24"
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <motion.div className="flex-1 relative" whileFocus={{ scale: 1.02 }}>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for a demo..."
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 font-mono text-sm focus:outline-none focus:border-[#3b82f6] transition-all duration-300"
                whileFocus={{ borderColor: "#3b82f6" }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={
                  email.length > 0 ? { boxShadow: "0 0 20px rgba(59,130,246,0.2)" } : { boxShadow: "none" }
                }
              />
            </motion.div>
            <motion.button
              type="submit"
              className="bg-[#3b82f6] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide whitespace-nowrap relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <motion.span
                className="relative z-10"
                animate={isSubmitting ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 0.5, repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0 }}
              >
                {isSubmitting ? "Sending..." : "Request Demo"}
              </motion.span>
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image
              src="/bridge-icon.png"
              alt="BRIDGE Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain brightness-150"
            />
            <span className="text-xl font-black text-white">
              BRIDGE
            </span>
          </motion.div>

          <p className="text-white/40 font-mono text-xs">© 2026 PT Bridge Infradata Indonesia. All rights reserved.</p>

          <motion.p
            className="text-white/30 font-mono text-xs cursor-pointer"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            animate={
              isHovering
                ? {
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.1, 1],
                    color: "#3b82f6",
                  }
                : {
                    rotate: 0,
                    scale: 1,
                    color: "rgba(255,255,255,0.3)",
                  }
            }
            transition={{ duration: 0.5 }}
          >
            built on the factory floor
          </motion.p>
        </motion.div>
      </div>

      {/* Pop-up Modal: Detail Paket Starter */}
      <AnimatePresence>
        {isStarterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStarterModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            <div className="absolute pointer-events-none w-96 h-96 rounded-full bg-blue-400/25 blur-3xl animate-pulse" />
            <div className="absolute pointer-events-none w-80 h-80 rounded-full bg-sky-300/25 blur-3xl -translate-x-32 translate-y-20" />

            <motion.div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] bg-white/95 backdrop-blur-2xl text-slate-900 rounded-3xl p-6 md:p-8 border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

              <button
                onClick={() => setIsStarterModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/90 hover:bg-slate-200/90 text-slate-500 hover:text-slate-900 backdrop-blur-md border border-slate-200/80 transition-all duration-300 z-20"
                aria-label="Close Pop-up"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-[#3b82f6] font-bold mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
                </span>
                STARTER PLAN DETAILS
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
                Full Plan Breakdown & Pricing
              </h3>

              <div className="bg-blue-50/80 backdrop-blur-xl p-5 rounded-2xl border border-blue-200/70 mb-6 shadow-sm">
                <div className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider mb-1">
                  Subscription Cost
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900">
                  Rp 5.000.000 <span className="text-sm font-mono text-blue-600 font-bold">/ month</span>
                </div>
                <div className="text-xs font-mono text-slate-700 mt-2 leading-relaxed">
                  Onboarding (1x): Rp 15.000.000 (Includes Industrial Tablet, Protective Box, 3-Day Installation & Foreman Training)
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-slate-900 text-sm md:text-base mb-3 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                  What's Included?
                </h4>
                <div className="space-y-2.5">
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-[#3b82f6] font-bold block mb-0.5">Foreman Application (BRIDGE Collect):</strong> Concise digital input form & automatically prevents production data typos.
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-[#3b82f6] font-bold block mb-0.5">Owner Dashboard:</strong> Monitor production yield per shift & factory status in real-time.
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-[#3b82f6] font-bold block mb-0.5">Industrial Hardware:</strong> Samsung Galaxy Tab Active 5 (Drop, Water & Dust Resistant IP68, 8 Hours Battery) + Wall-Mounted Steel Kiosk Box (IP65).
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-slate-900 text-sm md:text-base mb-3 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Key Benefits
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-emerald-600 font-bold block mb-0.5">Anti Data Loss (Offline-First):</strong>
                    Keep recording even during power/internet blackouts, auto-syncs when signal returns.
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-emerald-600 font-bold block mb-0.5">Zero Downtime:</strong>
                    3-day installation without stopping factory machinery.
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-emerald-600 font-bold block mb-0.5">Recipe Confidentiality:</strong>
                    High-level data security (Row-Level Security), encrypted factory data.
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-emerald-600 font-bold block mb-0.5">Warranty & Support:</strong>
                    Issue assistance &lt; 4 hours &amp; damaged tablet replacement in &lt; 48 hours.
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider mb-3">
                  Contact Sales Representative
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/6289590908767?text=Halo%20BRIDGE,%20saya%20tertarik%20dengan%20Paket%20Starter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    089590908767
                  </a>
                  <a
                    href="mailto:BridgeInfradataIndonesia@gmail.com?subject=Inquiry%20BRIDGE%20Starter%20Plan"
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3.5 px-4 rounded-xl font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all duration-300 border border-white/20 backdrop-blur-md"
                  >
                    <Mail className="w-4 h-4 text-[#3b82f6]" />
                    BridgeInfradataIndonesia@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pop-up Modal: Detail Paket Pro */}
      <AnimatePresence>
        {isProModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            <div className="absolute pointer-events-none w-96 h-96 rounded-full bg-blue-400/25 blur-3xl animate-pulse" />
            <div className="absolute pointer-events-none w-80 h-80 rounded-full bg-indigo-300/25 blur-3xl -translate-x-32 translate-y-20" />

            <motion.div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] bg-white/95 backdrop-blur-2xl text-slate-900 rounded-3xl p-6 md:p-8 border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

              <button
                onClick={() => setIsProModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/90 hover:bg-slate-200/90 text-slate-500 hover:text-slate-900 backdrop-blur-md border border-slate-200/80 transition-all duration-300 z-20"
                aria-label="Close Pop-up"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-[#3b82f6] font-bold mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
                </span>
                PRO PLAN DETAILS
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">
                Full Plan Breakdown &amp; Pricing
              </h3>
              <p className="text-xs font-mono text-slate-600 mb-4">
                Advanced Digitalization Solution with Automated IoT &amp; Machine Sensor Integration
              </p>

              <div className="bg-blue-50/80 backdrop-blur-xl p-5 rounded-2xl border border-blue-200/70 mb-6 shadow-sm">
                <div className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider mb-1">
                  Subscription Cost
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900">
                  Rp 10.000.000 <span className="text-sm font-mono text-blue-600 font-bold">/ month</span>
                </div>
                <div className="text-xs font-mono text-slate-700 mt-2 leading-relaxed">
                  Onboarding (1x): Rp 15.000.000 (Includes Industrial Tablet, Protective Box, IoT Gateway, Sensor Installation &amp; Training)
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-slate-900 text-sm md:text-base mb-3 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                  What's Included?
                </h4>
                <div className="space-y-2.5">
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-[#3b82f6] font-bold block mb-0.5">All Standard Plan Features:</strong> Foreman Application (BRIDGE Collect), Industrial Samsung Tab Active 5, IP65 Kiosk Box, and Offline-First System.
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-[#3b82f6] font-bold block mb-0.5">IoT Edge Gateway Integration:</strong> Automated 24/7 logging of kiln temperature, cycle time, and machine telemetry directly from PLC/Sensors without human error.
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-[#3b82f6] font-bold block mb-0.5">Pro Dashboard &amp; Advanced Analytics:</strong> Multi-User Access, automated machine efficiency diagnostics, and deep raw material cost optimization analytics.
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-slate-900 text-sm md:text-base mb-3 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Key Benefits
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-emerald-600 font-bold block mb-0.5">Automated Machine Telemetry:</strong>
                    Critical variables logged automatically with high precision direct from machinery without manual input.
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                    <strong className="text-emerald-600 font-bold block mb-0.5">Automated Fallback (Fail-Safe):</strong>
                    If sensors/gateway experience interruption, system smoothly switches to manual foreman logging without stopping production lines.
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider mb-3">
                  Contact Sales Representative
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/6289590908767?text=Halo%20BRIDGE,%20saya%20tertarik%20dengan%20Paket%20Pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    089590908767
                  </a>
                  <a
                    href="mailto:BridgeInfradataIndonesia@gmail.com?subject=Inquiry%20BRIDGE%20Pro%20Plan"
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3.5 px-4 rounded-xl font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all duration-300 border border-white/20 backdrop-blur-md"
                  >
                    <Mail className="w-4 h-4 text-[#3b82f6]" />
                    BridgeInfradataIndonesia@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  )
}
