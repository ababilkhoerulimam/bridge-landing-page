"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useLenis } from "lenis/react"
import { Menu, X } from "lucide-react"

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80 })
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    if (id === "#demo-form") {
      const input = element?.querySelector("input")
      if (input) {
        setTimeout(() => input.focus(), 600)
      }
    }
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Products", href: "#flavor" },
    { label: "Clients", href: "#clients" },
    { label: "Pricing", href: "#pricing" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#121212]/95 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image
              src="/bridge-icon.png"
              alt="BRIDGE Logo"
              width={34}
              height={34}
              className={`w-8 h-8 object-contain transition-all duration-300 ${
                scrolled ? "brightness-200 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" : ""
              }`}
            />
            <span
              className={`text-2xl font-black tracking-tighter ${scrolled ? "text-white" : "text-[#121212]"}`}
            >
              BRIDGE
            </span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className={`text-sm font-medium tracking-wide transition-colors relative ${
                scrolled ? "text-white/80 hover:text-[#3b82f6]" : "text-[#121212]/80 hover:text-[#121212]"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#3b82f6] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={() => scrollToSection("#demo-form")}
          className="hidden md:block bg-[#3b82f6] text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59,130,246,0.3)",
                "0 0 40px rgba(59,130,246,0.6)",
                "0 0 20px rgba(59,130,246,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          />
          <span className="relative z-10">Request Demo</span>
        </motion.button>

        <motion.button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className={scrolled ? "text-white" : "text-[#121212]"} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className={scrolled ? "text-white" : "text-[#121212]"} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-[#121212]/95 backdrop-blur-md border-b border-white/10 overflow-hidden px-6 py-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.label}
                  custom={i}
                  variants={linkVariants}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-white/80 hover:text-[#3b82f6] text-lg font-medium py-2 transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                custom={navLinks.length}
                variants={linkVariants}
                onClick={() => scrollToSection("#demo-form")}
                className="bg-[#3b82f6] text-white py-3 rounded-full font-bold text-center mt-2"
              >
                Request Demo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
