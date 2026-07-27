"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Send, CheckCircle2, X, Plus, ShieldCheck } from "lucide-react"
import { MANDOR_USERS } from "@/lib/mock-data"

export function MandorManagementTab() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [instruction, setInstruction] = useState("")
  const [selectedMandor, setSelectedMandor] = useState(MANDOR_USERS[0].name)
  const [selectedMachine, setSelectedMachine] = useState("Machine 1")
  const [toastMessage, setToastMessage] = useState("")

  const handleDispatch = () => {
    if (!instruction) return

    const newTask = {
      id: `task-${Date.now()}`,
      instruction,
      timestamp: new Date().toISOString(),
      mandor: selectedMandor,
      machine: selectedMachine,
      status: "pending" as const,
    }

    try {
      const stored = localStorage.getItem("bridge_dispatched_tasks")
      const current = stored ? JSON.parse(stored) : []
      current.unshift(newTask)
      localStorage.setItem("bridge_dispatched_tasks", JSON.stringify(current))
    } catch (e) {
      console.error(e)
    }

    setToastMessage(`Instruksi berhasil dikirim ke tablet Mandor ${selectedMandor}!`)
    setIsModalOpen(false)
    setInstruction("")
    setTimeout(() => setToastMessage(""), 4000)
  }

  const mandorsList = [
    { name: "Hadi", shifts: 120, avgQuality: "94.2%", lastActive: "Hari Ini (08:15 WIB)", status: "Active" },
    { name: "Budi", shifts: 98, avgQuality: "91.8%", lastActive: "Kemarin (16:30 WIB)", status: "Active" },
    { name: "Samsul", shifts: 145, avgQuality: "95.5%", lastActive: "Hari Ini (07:45 WIB)", status: "Active" },
  ]

  return (
    <div className="space-y-5 animate-in">
      {/* Banner */}
      <div className="bg-white/60 border border-slate-900/10 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#030b85]" />
          <div>
            <h2 className="text-base font-mono font-extrabold text-[#030b85]">
              Manajemen Operator Mandor & Instruksi Lapangan
            </h2>
            <p className="text-xs font-mono text-slate-600">
              Kirim instruksi servis & pemeliharaan langsung ke tablet ops mandor secara real-time.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-5 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r from-[#030b85] to-[#1a3ba8] hover:from-[#1a3ba8] hover:to-[#030b85] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Dispatch Instruksi Servis Baru
        </button>
      </div>

      {toastMessage && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold p-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mandors Performance Table */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
        <h3 className="text-xs font-mono font-extrabold text-slate-700 uppercase mb-3">
          Daftar Mandor Terdaftar & Performa Shift
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                <th className="p-3">Nama Mandor</th>
                <th className="p-3">Total Shift Terdaftar</th>
                <th className="p-3">Rata-Rata Output Yield</th>
                <th className="p-3">Aktif Terakhir</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mandorsList.map((m) => (
                <tr key={m.name} className="border-b border-slate-900/5 hover:bg-white/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#030b85]" /> {m.name}
                  </td>
                  <td className="p-3 text-slate-700">{m.shifts} Shift</td>
                  <td className="p-3 font-bold text-emerald-600">{m.avgQuality}</td>
                  <td className="p-3 text-slate-500">{m.lastActive}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedMandor(m.name)
                        setIsModalOpen(true)
                      }}
                      className="px-3 py-1 bg-[#030b85]/10 text-[#030b85] hover:bg-[#030b85] hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Kirim Tugas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative space-y-4"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#030b85] uppercase tracking-wider">
                <Send className="w-4 h-4" /> Dispatch Instruksi Servis ke Tablet Mandor
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                  Pilih Mandor Tujuan
                </label>
                <select
                  value={selectedMandor}
                  onChange={(e) => setSelectedMandor(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none"
                >
                  {MANDOR_USERS.map((u) => (
                    <option key={u.name} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                  Pilih Mesin / Area
                </label>
                <select
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none"
                >
                  <option value="Machine 1">Machine 1 (Kiln A)</option>
                  <option value="Machine 2">Machine 2 (Kiln B)</option>
                  <option value="Machine 3">Machine 3 (Kiln C)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                  Instruksi Servis / Pemeliharaan
                </label>
                <textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Contoh: Pembersihan filter gas burner & penggantian pelumas pusher speed..."
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none h-24 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDispatch}
                  disabled={!instruction}
                  className="flex-1 py-3 px-4 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r from-[#030b85] to-[#1a3ba8] hover:from-[#1a3ba8] hover:to-[#030b85] disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Kirim Instruksi Now
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-3 px-6 rounded-full text-xs font-mono font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
