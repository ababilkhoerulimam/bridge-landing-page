"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Edit3, Clock, AlertOctagon, Send, HelpCircle, Loader2 } from "lucide-react"
import { MaintenanceCalendar } from "./maintenance-calendar"

interface MachineData {
  id: string
  name: string
  temperature: number
  clay: number
  feldspar: number
  quartz: number
  pusherSpeed: number
  batchCount: number
  shift?: "Pagi" | "Siang" | "Malam"
}

interface MachineFormProps {
  machine: MachineData
  onUpdate: (updated: MachineData) => void
  onSubmit: (data: MachineData) => void
  isSubmitting: boolean
  onHelp?: () => void
}

export function MachineForm({
  machine,
  onUpdate,
  onSubmit,
  isSubmitting,
  onHelp,
}: MachineFormProps) {
  const [local, setLocal] = useState<MachineData>({ ...machine })
  const [selectedShift, setSelectedShift] = useState<"Pagi" | "Siang" | "Malam">("Pagi")
  const [showSoftGuard, setShowSoftGuard] = useState(false)

  useEffect(() => {
    setLocal({ ...machine })
  }, [machine])

  const handleChange = (key: keyof MachineData, val: number) => {
    const updated = { ...local, [key]: val }
    setLocal(updated)
    onUpdate(updated)
  }

  const getStatus = (val: number, min: number, max: number) => {
    if (val < min) return "low"
    if (val > max) return "high"
    return "nominal"
  }

  const tempStatus = getStatus(local.temperature, 800, 1400)
  const clayStatus = getStatus(local.clay, 40, 60)
  const speedStatus = getStatus(local.pusherSpeed, 10, 50)

  const isTempZero = local.temperature === 0
  const totalComp = Math.round((local.clay + local.feldspar + local.quartz) * 10) / 10
  const isCompositionOver = totalComp > 100
  const isBatchZero = local.batchCount <= 0
  const isHardGuard = isTempZero || isCompositionOver || isBatchZero
  const isSoftGuard = local.temperature > 1300 || local.pusherSpeed > 45

  const handleFormSubmit = () => {
    if (isHardGuard) return
    if (isSoftGuard) {
      setShowSoftGuard(true)
      return
    }
    onSubmit({ ...local, shift: selectedShift })
  }

  const confirmSoftGuard = () => {
    setShowSoftGuard(false)
    onSubmit({ ...local, shift: selectedShift })
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Form Header Badge */}
      <div className="text-xs font-mono font-extrabold text-[#030b85] bg-[#030b85]/5 px-3 py-2 rounded-xl border border-[#030b85]/15 flex items-center gap-2">
        <Edit3 className="w-4 h-4 text-[#030b85]" /> Entry Logbook Parameter Firing Kiln & Formulasi Resep (Awal Shift)
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-2 gap-3">
        {/* Temp Input */}
        <div className="bg-white/50 border border-slate-900/10 rounded-2xl p-3.5 relative">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-mono font-extrabold text-slate-600 uppercase">
              Temperatur Kiln
            </span>
            <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
              °C
            </span>
          </div>
          <input
            type="number"
            value={local.temperature}
            onChange={(e) => handleChange("temperature", parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
            min={0}
            max={1600}
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
            <span>Rentang: 800-1400°C</span>
            {isTempZero ? (
              <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">
                ⚠️ BLOKIR 0°C
              </span>
            ) : tempStatus === "nominal" ? (
              <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                ✓ Nominal
              </span>
            ) : tempStatus === "high" ? (
              <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                ▲ Tinggi
              </span>
            ) : (
              <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                ▼ Rendah
              </span>
            )}
          </div>
        </div>

        {/* Pusher Speed Input */}
        <div className="bg-white/50 border border-slate-900/10 rounded-2xl p-3.5 relative">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-mono font-extrabold text-slate-600 uppercase">
              Kecepatan Pusher
            </span>
            <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
              RPM
            </span>
          </div>
          <input
            type="number"
            value={local.pusherSpeed}
            onChange={(e) => handleChange("pusherSpeed", parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
            min={0}
            max={99}
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
            <span>Rentang: 10-50 RPM</span>
            {speedStatus === "nominal" ? (
              <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                ✓ Nominal
              </span>
            ) : speedStatus === "high" ? (
              <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                ▲ Tinggi
              </span>
            ) : (
              <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                ▼ Rendah
              </span>
            )}
          </div>
        </div>

        {/* Clay Ratio Input */}
        <div className="bg-white/50 border border-slate-900/10 rounded-2xl p-3.5 relative">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-mono font-extrabold text-slate-600 uppercase">
              Rasio Clay (Tanah Liat)
            </span>
            <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
              %
            </span>
          </div>
          <input
            type="number"
            value={local.clay}
            onChange={(e) => handleChange("clay", parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
            min={0}
            max={100}
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
            <span>Rentang: 40-60%</span>
            {clayStatus === "nominal" ? (
              <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                ✓ Nominal
              </span>
            ) : clayStatus === "high" ? (
              <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                ▲ Tinggi
              </span>
            ) : (
              <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                ▼ Rendah
              </span>
            )}
          </div>
        </div>

        {/* Batch Count Input */}
        <div className="bg-white/50 border border-slate-900/10 rounded-2xl p-3.5 relative">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-mono font-extrabold text-slate-600 uppercase">
              Jumlah Batch
            </span>
            <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
              Unit
            </span>
          </div>
          <input
            type="number"
            value={local.batchCount}
            onChange={(e) => handleChange("batchCount", parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
            min={0}
            max={999}
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
            <span>Pencatatan unit produksi</span>
          </div>
        </div>
      </div>

      {/* Second Row: Shift & Recipe Mix summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/50 border border-slate-900/10 rounded-2xl p-3 flex items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-slate-600 uppercase flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#030b85]" /> Shift Kerja
          </span>
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value as any)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none cursor-pointer"
          >
            <option value="Pagi">Pagi</option>
            <option value="Siang">Siang</option>
            <option value="Malam">Malam</option>
          </select>
        </div>

        <div className="bg-white/50 border border-slate-900/10 rounded-2xl p-3 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-600 uppercase">
            Material Campuran
          </span>
          <span className="text-xs font-mono font-bold text-slate-900">
            Feldspar {local.feldspar}% / Quartz {local.quartz}%
          </span>
        </div>
      </div>

      {/* AI Maintenance Widget */}
      <MaintenanceCalendar />

      {/* Hard Guard Error Alerts */}
      {isTempZero && (
        <div className="bg-rose-50 border border-rose-300 p-3 rounded-xl text-rose-700 text-xs font-mono font-bold flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 flex-shrink-0" />
          <span>Blokir: Temperatur Kiln terdeteksi 0°C. Silakan masukkan angka termometer sebenarnya.</span>
        </div>
      )}
      {isCompositionOver && (
        <div className="bg-rose-50 border border-rose-300 p-3 rounded-xl text-rose-700 text-xs font-mono font-bold flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 flex-shrink-0" />
          <span>Blokir: Rasio total bahan baku melebihi 100% (terhitung: {totalComp}%). Kurangi rasio komposisi.</span>
        </div>
      )}
      {isBatchZero && (
        <div className="bg-rose-50 border border-rose-300 p-3 rounded-xl text-rose-700 text-xs font-mono font-bold flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 flex-shrink-0" />
          <span>Blokir: Jumlah batch harus lebih besar dari 0.</span>
        </div>
      )}

      {/* Submit Actions */}
      <div className="flex gap-3 mt-auto pt-2">
        <button
          onClick={handleFormSubmit}
          disabled={isHardGuard || isSubmitting}
          className={`flex-1 py-3 px-6 rounded-full font-mono text-xs md:text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            isHardGuard
              ? "bg-slate-400 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-[#030b85] to-[#1a3ba8] hover:from-[#1a3ba8] hover:to-[#030b85] shadow-[0_8px_28px_rgba(3,11,133,0.3)]"
          }`}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Logbook Batch</span>
            </>
          )}
        </button>

        {onHelp && (
          <button
            onClick={onHelp}
            className="px-4 py-3 border border-slate-300 rounded-full text-xs font-mono font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" /> Help
          </button>
        )}
      </div>

      {/* Soft Guard Modal */}
      {showSoftGuard && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
          >
            <div className="p-4 bg-amber-50 border-b border-amber-100 flex gap-3 items-start">
              <AlertOctagon className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-mono font-bold text-amber-900 mb-1">
                  Peringatan: Deviasi Operasional!
                </h3>
                <p className="text-xs font-mono text-amber-800 leading-relaxed">
                  {local.temperature > 1300 && "Suhu terlalu tinggi (>1300°C). "}
                  {local.pusherSpeed > 45 && "Kecepatan pusher terlalu tinggi (>45 RPM). "}
                  Data ini berisiko menghasilkan produk defect. Apakah Anda yakin ingin melanjutkan?
                </p>
              </div>
            </div>
            <div className="p-4 flex gap-3 bg-slate-50">
              <button
                onClick={() => setShowSoftGuard(false)}
                className="flex-1 py-2 px-4 border border-slate-300 rounded-full font-mono text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmSoftGuard}
                className="flex-1 py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-mono text-xs font-bold cursor-pointer shadow-lg shadow-amber-600/20"
              >
                Lanjutkan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
