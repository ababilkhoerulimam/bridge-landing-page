"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { useLenis } from "lenis/react"
import { X } from "lucide-react"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.3,
    },
  },
}

export function HeroSection() {
  const ref = useRef(null)
  const lenis = useLenis()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element && lenis) {
      lenis.scrollTo(element as HTMLElement, { offset: -80 })
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    if (id === "#demo-form") {
      const input = element?.querySelector("input")
      if (input) {
        setTimeout(() => input.focus(), 600)
      }
    }
  }
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y = useSpring(rawY, springConfig)

  const rawTextX1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const textX1 = useSpring(rawTextX1, springConfig)

  const rawTextX2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const textX2 = useSpring(rawTextX2, springConfig)

  const rawScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const scale = useSpring(rawScale, springConfig)

  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const opacity = useSpring(rawOpacity, springConfig)

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white noise-overlay"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#3b82f6]/5 to-white" />

      <motion.div
        className="absolute top-20 left-10 w-24 h-24 rounded-full bg-[#3b82f6]/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-[#3b82f6]/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div style={{ opacity }} className="space-y-5">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 bg-[#121212] text-white px-3 py-1.5 rounded-full text-xs font-mono tracking-wider"
            >
              <motion.span
                className="w-2 h-2 bg-[#3b82f6] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              OFFLINE-FIRST FACTORY INTELLIGENCE
            </motion.div>

            <div className="space-y-1 overflow-hidden">
              <motion.h1
                style={{ x: textX1 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212] leading-[0.9]"
              >
                <motion.span
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="inline-block"
                >
                  DIGITIZE YOUR
                </motion.span>
              </motion.h1>
              <motion.h1
                style={{ x: textX2 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212] leading-[0.9]"
              >
                <motion.span
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="inline-block text-[#3b82f6]"
                >
                  FACTORY FLOOR
                </motion.span>
              </motion.h1>
              <motion.p
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="text-lg md:text-xl font-mono text-[#121212]/60 tracking-tight pt-2 max-w-md"
              >
                No internet required. No paper needed. Production data that actually works on the factory floor.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-3 pt-2"
            >
              <motion.button
                onClick={() => scrollToSection("#demo-form")}
                className="bg-[#3b82f6] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Request a Demo</span>
                <motion.svg
                  className="w-4 h-4 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.button>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="border-2 border-[#121212] text-[#121212] px-6 py-3 rounded-full font-bold text-sm tracking-wide relative overflow-hidden"
                whileHover={{ scale: 1.02, backgroundColor: "#121212", color: "#fff" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                See How It Works
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex flex-wrap gap-4 pt-2"
            >
              {["Offline-First", "2-Min Logging", "Hard/Soft Guards", "Live Dashboard"].map((benefit, i) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2 text-xs font-mono text-[#121212]/60"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full" />
                  {benefit}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y, scale }} className="relative flex justify-center">
            <motion.div variants={scaleInVariants} initial="hidden" animate="visible" className="relative">
              <motion.div
                className="absolute inset-0 bg-[#3b82f6]/20 blur-[80px] rounded-full scale-75"
                animate={{
                  scale: [0.75, 0.85, 0.75],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/image.jpg"
                  alt="BRIDGE Dashboard — Offline-First Factory Floor Intelligence"
                  width={500}
                  height={375}
                  className="relative z-10 rounded-2xl shadow-2xl border border-gray-200"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="w-5 h-8 border-2 border-[#121212]/30 rounded-full flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-2 bg-[#121212]/30 rounded-full"
                animate={{ y: [0, 6, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Pop-up Modal: Light Glassmorphism Theme */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Ambient Background Glow Orbs for Light Refraction */}
            <div className="absolute pointer-events-none w-80 h-80 rounded-full bg-blue-400/25 blur-3xl animate-pulse" />
            <div className="absolute pointer-events-none w-64 h-64 rounded-full bg-sky-300/25 blur-3xl -translate-x-32 translate-y-20" />

            {/* Light Glassmorphism Card Container */}
            <motion.div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-xl max-h-[85vh] bg-white/85 backdrop-blur-2xl text-slate-900 rounded-3xl p-6 md:p-8 border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Top Glass Highlight Rim */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/90 hover:bg-slate-200/90 text-slate-500 hover:text-slate-900 backdrop-blur-md border border-slate-200/80 transition-all duration-300"
                aria-label="Close Pop-up"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag Header */}
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full bg-blue-50/80 backdrop-blur-md border border-blue-200/60 text-[#3b82f6] font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
                </span>
                HOW BRIDGE WORKS
              </div>

              {/* Modal Title */}
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-4">
                How Does BRIDGE Work?
              </h3>

              {/* Light Glass Inner Text Box */}
              <p className="text-slate-700 font-mono text-sm leading-relaxed mb-6 bg-white/70 backdrop-blur-xl p-5 rounded-2xl border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                BRIDGE is an offline production logging system built for building material manufacturers to stop raw material waste and data leaks. Your foremen simply tap buttons on a tablet with zero internet required, while you as the factory owner instantly receive transparent, accurate daily summaries of product quality and material efficiency.
              </p>

              {/* Footer Actions with Light Glass Finish */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    scrollToSection("#demo-form")
                  }}
                  className="flex-1 bg-[#3b82f6] hover:bg-blue-600 text-white py-3.5 px-5 rounded-xl font-bold text-sm tracking-wide text-center transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_25px_rgba(59,130,246,0.5)]"
                >
                  Request a Demo Now
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-sm tracking-wide text-center transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
