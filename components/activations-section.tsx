"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { Factory, Users, BarChart2, Building2, X, MessageSquare, Mail } from "lucide-react"

const activations = [
  {
    id: "ceramics",
    icon: Factory,
    title: "Ceramic & Tile Factories",
    description: "Track kiln temperatures, clay ratios, and batch outputs with zero paper.",
    cta: "See Case Study",
    modalBadge: "INDUSTRY CASE STUDY",
    modalTitle: "Case Study Results: Ceramic & Tile Industry",
    modalSubtitle: null,
    modalDesc:
      "Implementing a digital logging system in the kiln firing area enables real-time detection of temperature fluctuations and raw material batch variations. Field tests demonstrate a proven reduction in product defect rates and significant production cost (COGS) savings, yielding a full investment payback in less than 3.5 months.",
    modalBenefitsTitle: null,
    modalBenefits: [],
  },
  {
    id: "mandors",
    icon: Users,
    title: "Mandors & Supervisors",
    description: "Log shifts in under 2 minutes. PIN sign-off. No typing required.",
    cta: "See the App",
    modalBadge: "USER FLOW",
    modalTitle: "Foreman Application (BRIDGE Collect)",
    modalSubtitle: null,
    modalDesc:
      "Concise digital input forms automatically prevent production data typos on the factory floor. Foremen sign off with a secure 4-digit PIN in under 2 minutes, even without an active internet connection.",
    modalBenefitsTitle: null,
    modalBenefits: [],
  },
  {
    id: "owners",
    icon: BarChart2,
    title: "Factory Owners",
    description: "Real-time OEE dashboard, yield diagnostics, and prescriptive recommendations.",
    cta: "See Dashboard",
    modalBadge: "EXECUTIVE SUITE",
    modalTitle: "Real-Time Owner Intelligence Dashboard",
    modalSubtitle: null,
    modalDesc:
      "Monitor shift production yields, machine OEE, and factory status in real time from anywhere. Receive instant automated alerts when material scrap rates exceed safe operational thresholds.",
    modalBenefitsTitle: null,
    modalBenefits: [],
  },
  {
    id: "associations",
    icon: Building2,
    title: "Industry Associations",
    description: "Support your IKM cluster with standardized digital production records.",
    cta: "Partner With Us",
    modalBadge: "GOVERNMENT & ASSOCIATION PARTNERSHIP",
    modalTitle: "Industry Association & Government Partnership",
    modalSubtitle: "Accelerating Digital Transformation for National Manufacturing & SMEs",
    modalDesc:
      "Collaborate with BRIDGE to modernize factory efficiency across your member networks. We support national digitalization initiatives (Making Indonesia 4.0) by delivering reliable, easy-to-adopt, offline-first data capture solutions tailored for industrial clusters.",
    modalBenefitsTitle: "Partnership Benefits:",
    modalBenefits: [
      "Production Data Visibility: Real-time operational insights across affiliated factories.",
      "Pilot Programs & Onsite Training: Dedicated onboarding support for association members.",
      "Cluster Incentive Schemes: Exclusive group onboarding pricing and tailored SaaS tiers.",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

export function ActivationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedActivation, setSelectedActivation] = useState<(typeof activations)[0] | null>(null)

  return (
    <section id="clients" className="relative py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <motion.span
            className="font-mono text-[#121212]/60 text-xs tracking-widest inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            WHO IT'S FOR
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-[#121212] tracking-tighter mt-2 overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            >
              BUILT FOR{" "}
            </motion.span>
            <motion.span
              className="text-[#3b82f6] inline-block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
            >
              EVERY FLOOR
            </motion.span>
          </h2>
          <motion.p
            className="text-sm text-[#121212]/60 font-mono mt-2 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            From family-owned ceramic factories to large brick clusters, BRIDGE adapts to how you already work.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {activations.map((activation) => (
            <motion.div
              key={activation.title}
              variants={itemVariants}
              onClick={() => setSelectedActivation(activation)}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              className="group bg-[#121212] rounded-2xl p-6 cursor-pointer relative overflow-hidden flex flex-col justify-between"
            >
              <motion.div
                className="absolute inset-0 bg-[#3b82f6]/0 group-hover:bg-[#3b82f6]"
                transition={{ duration: 0.4 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-11 h-11 rounded-xl bg-[#3b82f6] flex items-center justify-center mb-4 group-hover:bg-white transition-colors duration-300"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <activation.icon className="w-5 h-5 text-white group-hover:text-[#3b82f6] transition-colors duration-300" />
                </motion.div>

                <h3 className="text-lg font-black text-white group-hover:text-white tracking-tight mb-2 transition-colors duration-300">
                  {activation.title}
                </h3>
                <p className="text-white/60 group-hover:text-white/80 font-mono text-xs leading-relaxed mb-4 transition-colors duration-300">
                  {activation.description}
                </p>
              </div>

              <div className="relative z-10 pt-2">
                {activation.id === "mandors" ? (
                  <Link
                    href="/mandor"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-[#3b82f6] group-hover:text-white font-bold text-xs tracking-wide transition-colors duration-300"
                  >
                    <span>{activation.cta}</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : activation.id === "owners" ? (
                  <Link
                    href="/owner"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-[#3b82f6] group-hover:text-white font-bold text-xs tracking-wide transition-colors duration-300"
                  >
                    <span>{activation.cta}</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedActivation(activation)
                    }}
                    className="flex items-center gap-2 text-[#3b82f6] group-hover:text-white font-bold text-xs tracking-wide transition-colors duration-300 cursor-pointer"
                  >
                    <span>{activation.cta}</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Light Glassmorphism Modal */}
      <AnimatePresence>
        {selectedActivation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivation(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            <div className="absolute pointer-events-none w-96 h-96 rounded-full bg-blue-400/25 blur-3xl animate-pulse" />

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
              <button
                onClick={() => setSelectedActivation(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/90 hover:bg-slate-200/90 text-slate-500 hover:text-slate-900 backdrop-blur-md border border-slate-200/80 transition-all duration-300 z-20"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-[#3b82f6] font-bold mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
                </span>
                {selectedActivation.modalBadge}
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">
                {selectedActivation.modalTitle}
              </h3>
              {selectedActivation.modalSubtitle && (
                <p className="text-xs font-mono text-slate-600 mb-4">
                  {selectedActivation.modalSubtitle}
                </p>
              )}

              <div className="bg-blue-50/80 backdrop-blur-xl p-5 rounded-2xl border border-blue-200/70 mb-6 shadow-sm">
                <p className="text-slate-700 font-mono text-sm leading-relaxed">
                  {selectedActivation.modalDesc}
                </p>
              </div>

              {selectedActivation.modalBenefits && selectedActivation.modalBenefits.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 text-sm md:text-base mb-3 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    {selectedActivation.modalBenefitsTitle}
                  </h4>
                  <div className="space-y-2.5">
                    {selectedActivation.modalBenefits.map((benefit, idx) => {
                      const parts = benefit.split(":")
                      return (
                        <div key={idx} className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200/80 shadow-sm text-xs font-mono text-slate-700">
                          {parts.length > 1 ? (
                            <>
                              <strong className="text-emerald-600 font-bold block mb-0.5">{parts[0]}:</strong>
                              {parts.slice(1).join(":")}
                            </>
                          ) : (
                            benefit
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider mb-3">
                  Contact Sales Representative
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/6289590908767?text=Halo%20BRIDGE,%20saya%20tertarik%20dengan%20kemitraan%20Industry%20Association"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    089590908767
                  </a>
                  <a
                    href="mailto:BridgeInfradataIndonesia@gmail.com?subject=Inquiry%20BRIDGE%20Industry%20Association%20Partnership"
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
    </section>
  )
}
