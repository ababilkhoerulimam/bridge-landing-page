"use client"

import type React from "react"

import { motion, AnimatePresence, useSpring } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLenis } from "lenis/react"

const products = [
  {
    id: 1,
    name: "BRIDGE Collect",
    tagline: "For Mandors",
    description:
      "Offline-first tablet logbook. Log kiln temperatures, clay ratios, and batch outputs in under 2 minutes. No internet needed.",
    image: "/images/mandor-collect.jpg",
    bgColor: "from-[#3b82f6]/20 via-[#3b82f6]/10 to-transparent",
    accentColor: "#3b82f6",
    badges: ["Offline SQLite", "Hard Guards", "PIN Sign-off", "Auto-Sync"],
  },
  {
    id: 2,
    name: "Owner Dashboard",
    tagline: "For Factory Owners",
    description:
      "Real-time OEE metrics, material yield trends, and shift-level diagnostics. See your whole operation at a glance.",
    image: "/images/owner-dashboard.jpg",
    bgColor: "from-[#10b981]/20 via-[#10b981]/10 to-transparent",
    accentColor: "#10b981",
    badges: ["Real-time OEE", "Yield Analytics", "Shift Reports", "Cloud Backup"],
  },
  {
    id: 3,
    name: "Decision Intelligence",
    tagline: "AI Optimization",
    description:
      "Prescriptive next-batch material recipe recommendations tailored to your local clay characteristics. Reduce waste, maximize yield.",
    image: "/images/decision-intelligence.jpg",
    bgColor: "from-[#f59e0b]/20 via-[#f59e0b]/10 to-transparent",
    accentColor: "#f59e0b",
    badges: ["Recipe Optimizer", "Clay Intelligence", "Waste Reduction", "Predictive"],
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
}

export function FlavorCarousel() {
  const [[page, direction], setPage] = useState([0, 0])
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const lenis = useLenis()

  const productIndex = Math.abs(page % products.length)
  const currentProduct = products[productIndex]

  const scrollToDemo = () => {
    const element = document.querySelector("#demo-form")
    if (element && lenis) {
      lenis.scrollTo(element as HTMLElement, { offset: -80 })
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    const input = element?.querySelector("input")
    if (input) {
      setTimeout(() => input.focus(), 600)
    }
  }

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateY.set(x * 5)
    rotateX.set(-y * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
    setActiveProductIndex((prev) => (prev + newDirection + products.length) % products.length)
  }

  const nextProduct = () => paginate(1)
  const prevProduct = () => paginate(-1)

  return (
    <section id="flavor" className="relative py-16 bg-white overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentProduct.bgColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        key={currentProduct.id}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <motion.span
            className="font-mono text-[#121212]/60 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            OUR PRODUCTS
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-[#121212] tracking-tighter mt-2">
            Integrated Factory Solution
          </h2>
        </motion.div>

        {/* Carousel Wrapper */}
        <div className="relative max-w-5xl mx-auto min-h-[480px] flex items-center">
          {/* Navigation Arrows on the sides of the card */}
          <motion.button
            onClick={prevProduct}
            className="absolute left-0 md:-left-4 z-20 w-12 h-12 rounded-full bg-white/90 shadow-xl border border-[#121212]/10 flex items-center justify-center text-[#121212] hover:bg-[#121212] hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous Product"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextProduct}
            className="absolute right-0 md:-right-4 z-20 w-12 h-12 rounded-full bg-white/90 shadow-xl border border-[#121212]/10 flex items-center justify-center text-[#121212] hover:bg-[#121212] hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next Product"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="w-full px-4 md:px-12"
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-[#121212]/10 shadow-2xl relative overflow-hidden"
              >
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 relative h-64 md:h-80 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 p-4">
                    <Image
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      fill
                      className="object-contain p-2"
                      priority
                      unoptimized
                    />
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <span
                        className="text-xs font-mono font-bold tracking-widest uppercase"
                        style={{ color: currentProduct.accentColor }}
                      >
                        {currentProduct.tagline}
                      </span>
                      <motion.h3
                        className="text-3xl md:text-4xl font-black text-[#121212] tracking-tighter mt-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      >
                        {currentProduct.name}
                      </motion.h3>
                    </div>

                    <motion.p
                      className="text-sm text-[#121212]/60 font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentProduct.description}
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {currentProduct.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-1 rounded-full text-xs font-mono"
                          style={{
                            backgroundColor: `${currentProduct.accentColor}18`,
                            color: currentProduct.accentColor,
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </motion.div>

                    <motion.button
                      onClick={scrollToDemo}
                      className="px-6 py-3 rounded-full font-bold text-sm tracking-wide w-full md:w-auto relative overflow-hidden text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      style={{ backgroundColor: currentProduct.accentColor }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative z-10">Request a Demo</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              onClick={() => {
                const newDirection = index > productIndex ? 1 : -1
                setPage([index, newDirection])
              }}
              className="h-2 rounded-full transition-all"
              style={{
                backgroundColor: index === productIndex ? product.accentColor : "#12121220",
              }}
              animate={{
                width: index === productIndex ? 28 : 10,
              }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
