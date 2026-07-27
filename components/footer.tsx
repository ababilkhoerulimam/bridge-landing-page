"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"

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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [isHovering, setIsHovering] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  const footerLinks = [
    {
      title: "Products",
      links: ["BRIDGE Collect", "Owner Dashboard", "Decision Intelligence", "Pricing"],
    },
    {
      title: "Company",
      links: ["About", "Team", "Careers", "Press"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Case Studies", "Blog", "API Reference"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Data Security"],
    },
  ]

  return (
    <footer ref={footerRef} id="pricing" className="relative bg-[#121212] pt-16 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              READY TO
            </motion.span>
            <motion.span
              className="block text-[#3b82f6]"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            >
              TRANSFORM?
            </motion.span>
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
            <div className="text-xs font-mono text-white/50 tracking-widest mb-2">STARTER</div>
            <div className="text-3xl font-black text-white">
              Rp 5 Jt<span className="text-sm font-mono text-white/40">/month</span>
            </div>
            <div className="text-xs font-mono text-white/40 mb-4">+ Rp 15 Jt one-time setup</div>
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
              className="w-full bg-[#3b82f6] text-white py-3 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Pro Card */}
          <div className="bg-[#3b82f6]/10 border-2 border-[#3b82f6]/30 rounded-2xl p-6 text-left relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#3b82f6] text-white text-xs font-bold px-2 py-1 rounded-full">
              RECOMMENDED
            </div>
            <div className="text-xs font-mono text-[#3b82f6] tracking-widest mb-2">PRO</div>
            <div className="text-3xl font-black text-white">
              Rp 10 Jt<span className="text-sm font-mono text-white/40">/month</span>
            </div>
            <div className="text-xs font-mono text-white/40 mb-4">+ Rp 15 Jt one-time setup</div>
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
              className="w-full bg-[#3b82f6] text-white py-3 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.div className="flex-1 relative" whileFocus={{ scale: 1.02 }}>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@factory.com"
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
              className="bg-[#3b82f6] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide whitespace-nowrap relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleSubmit}
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
          </div>
          <motion.p
            className="text-white/40 font-mono text-xs mt-2 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Join 50+ factories in transformation. No spam, just results.
          </motion.p>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/60 font-mono text-xs max-w-xl mx-auto leading-relaxed">
            BRIDGE is a better-for-you factory platform built with offline-first reliability, ultra-simple UX, and
            Decision Intelligence. Eliminate waste starting from the floor.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-white/10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="font-bold text-white text-sm mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item}>
                    <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                      <Link
                        href="#"
                        className="text-white/60 hover:text-[#3b82f6] font-mono text-xs transition-colors inline-block"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-xl font-black">
              <span className="text-white">BRIDGE</span>
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

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[30rem] font-black text-white/[0.02] pointer-events-none select-none leading-none"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        BRIDGE
      </motion.div>
    </footer>
  )
}
