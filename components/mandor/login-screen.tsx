"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Key, ArrowRight, Loader2, Lock } from "lucide-react"
import { MANDOR_USERS, MANDOR_PINS } from "@/lib/mock-data"

interface LoginScreenProps {
  onLogin: (mandorName: string) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedMandor, setSelectedMandor] = useState(MANDOR_USERS[0].name)
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!selectedMandor) {
      setError("Pilih mandor.")
      return
    }
    if (pin.length !== 4) {
      setError("PIN harus 4 digit.")
      triggerShake()
      return
    }

    setLoading(true)

    setTimeout(() => {
      if (MANDOR_PINS[selectedMandor] === pin) {
        onLogin(selectedMandor)
      } else {
        setError("PIN yang Anda masukkan salah.")
        triggerShake()
      }
      setLoading(false)
    }, 400)
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-md w-full mx-auto my-auto ${shake ? "animate-bounce" : ""}`}
    >
      <div className="text-center mb-6 flex flex-col items-center">
        <Image
          src="/bridge-logo.png"
          alt="BRIDGE"
          width={170}
          height={50}
          className="w-40 h-auto mb-2 drop-shadow-md"
          priority
        />
        <span className="block text-xs font-mono font-extrabold text-[#030b85] uppercase tracking-widest">
          Tablet Ops Portal (Mandor)
        </span>

        {/* Demo PIN banner */}
        <div className="mt-3 px-3 py-1.5 bg-[#030b85]/10 border border-[#030b85]/20 rounded-full text-[11px] font-mono text-[#030b85] font-extrabold flex items-center gap-1.5 max-w-xs">
          <Key className="w-3.5 h-3.5 flex-shrink-0" />
          <span>DEMO PIN: Hadi (1234) | Budi (5678) | Samsul (9012)</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Pilih Mandor / Technisi
          </label>
          <div className="relative">
            <select
              value={selectedMandor}
              onChange={(e) => setSelectedMandor(e.target.value)}
              className="w-full px-4 py-3 bg-white/90 border border-slate-300 rounded-2xl text-base text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#030b85] focus:border-transparent appearance-none cursor-pointer"
            >
              {MANDOR_USERS.map((user) => (
                <option key={user.name} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l0.707 0.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            PIN Sign-Off (4 Digit)
          </label>
          <div className="relative">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="••••"
              maxLength={4}
              className="w-full px-4 py-3 bg-white/90 border border-slate-300 rounded-2xl text-center text-xl tracking-[0.4em] font-mono text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#030b85] focus:border-transparent"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {error && (
          <div className="text-rose-600 text-center text-xs font-bold bg-rose-50 border border-rose-200 py-2 rounded-xl">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#030b85] to-[#1a3ba8] hover:from-[#1a3ba8] hover:to-[#030b85] shadow-[0_8px_28px_rgba(3,11,133,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Masuk Portal Mandor</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}
