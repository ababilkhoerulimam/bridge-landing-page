"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Sliders,
  Flame,
  Snowflake,
  Leaf,
  Bot,
  Compass,
  Table as TableIcon,
  Info,
  X,
  Loader2,
  Sparkles,
} from "lucide-react"

const formatRupiah = (val: number) => "Rp " + new Intl.NumberFormat("id-ID").format(val)

interface BatchItem {
  date: string
  shift: string
  grade_a: number
  reject: number
  batch_count: number
  clay?: number
  feldspar?: number
  quartz?: number
  quality_score?: number
  expected_savings?: number
}

const DEFAULT_BATCHES: BatchItem[] = [
  { date: "2026-07-27", shift: "Malam", grade_a: 95.8, reject: 4, batch_count: 296, clay: 50, feldspar: 25, quartz: 25, quality_score: 95.8, expected_savings: 18700000 },
  { date: "2026-07-26", shift: "Siang", grade_a: 78.9, reject: 18, batch_count: 281, clay: 52, feldspar: 24, quartz: 24, quality_score: 78.9, expected_savings: 15400000 },
  { date: "2026-07-25", shift: "Siang", grade_a: 77.4, reject: 22, batch_count: 242, clay: 48, feldspar: 26, quartz: 26, quality_score: 77.4, expected_savings: 15100000 },
  { date: "2026-07-24", shift: "Pagi", grade_a: 80.2, reject: 19, batch_count: 232, clay: 51, feldspar: 25, quartz: 24, quality_score: 80.2, expected_savings: 15600000 },
  { date: "2026-07-23", shift: "Malam", grade_a: 88.0, reject: 12, batch_count: 258, clay: 50, feldspar: 25, quartz: 25, quality_score: 88.0, expected_savings: 17200000 },
  { date: "2026-07-22", shift: "Pagi", grade_a: 75.1, reject: 24, batch_count: 250, clay: 54, feldspar: 23, quartz: 23, quality_score: 75.1, expected_savings: 14600000 },
  { date: "2026-07-21", shift: "Pagi", grade_a: 75.0, reject: 25, batch_count: 237, clay: 53, feldspar: 24, quartz: 23, quality_score: 75.0, expected_savings: 14600000 },
]

export function DecisionIntelligenceTab() {
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "1m" | "3m">("7d")
  const [simTemp, setSimTemp] = useState(1175)
  const [simClay, setSimClay] = useState(50)
  const [simSpeed, setSimSpeed] = useState(32)

  const [loadingPredict, setLoadingPredict] = useState(false)
  const [isAiOptimized, setIsAiOptimized] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<BatchItem | null>(null)

  // Thermodynamic & Physic loss mathematical calculation (Live dynamic updates as sliders move)
  const predictionResult = useMemo(() => {
    const deltaTemp = Math.abs(simTemp - 1175) * 0.05
    const deltaClay = Math.abs(simClay - 50) * 0.4
    const deltaSpeed = Math.abs(simSpeed - 32) * 0.3

    const rawYield = 96.0 - deltaTemp - deltaClay - deltaSpeed
    const predicted_grade_a = Math.max(58.0, Math.min(96.0, parseFloat(rawYield.toFixed(1))))
    const predicted_defect_rate = Math.max(0.8, parseFloat(((100 - predicted_grade_a) * 0.22).toFixed(1)))
    const expected_savings = Math.round(predicted_grade_a * 195000)

    const totalDev = (deltaTemp + deltaClay + deltaSpeed) / 3
    const confidence = Math.max(82, Math.min(96, Math.round(96 - totalDev)))

    return {
      clay: simClay,
      feldspar: Math.round((100 - simClay) / 2),
      quartz: 100 - simClay - Math.round((100 - simClay) / 2),
      predicted_grade_a,
      predicted_defect_rate,
      confidence,
      expected_savings,
    }
  }, [simTemp, simClay, simSpeed])

  // AI Auto-Optimizer: Automatically snaps sliders to optimal sweet spot (1175°C, 50% Clay, 32 RPM)
  const handleAiOptimize = () => {
    setLoadingPredict(true)
    setTimeout(() => {
      setSimTemp(1175)
      setSimClay(50)
      setSimSpeed(32)
      setIsAiOptimized(true)
      setLoadingPredict(false)
      setTimeout(() => setIsAiOptimized(false), 3000)
    }, 450)
  }

  const loadScenario = (temp: number, clay: number, speed: number) => {
    setSimTemp(temp)
    setSimClay(clay)
    setSimSpeed(speed)
  }

  return (
    <div className="space-y-5 animate-in font-sans">
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-lg md:text-xl font-outfit font-extrabold text-[#030b85] flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#030b85]" /> Decision Intelligence & AI Recipe Optimizer
        </div>
        <span className="text-[11px] font-sans font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Live Dynamic Simulation Active
        </span>
      </div>

      {/* Simulator Panel Card */}
      <div className="bg-white/60 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-5 shadow-xs space-y-4">
        <h4 className="text-xs font-outfit font-extrabold text-[#030b85] uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#030b85]" /> Panel Simulator Telemetri & Decision Intelligence AI
        </h4>

        {/* Preset Scenario Buttons */}
        <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-slate-900/10">
          <button
            onClick={() => loadScenario(1320, 52, 42)}
            className="px-3 py-1.5 rounded-full border border-rose-300 bg-rose-50/60 hover:bg-rose-100 text-rose-700 text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-rose-600" /> 1. Suhu Ekstrem (Thermal Crack)
          </button>
          <button
            onClick={() => loadScenario(950, 48, 24)}
            className="px-3 py-1.5 rounded-full border border-amber-300 bg-amber-50/60 hover:bg-amber-100 text-amber-700 text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Snowflake className="w-3.5 h-3.5 text-amber-600" /> 2. Suhu Rendah (Underfired)
          </button>
          <button
            onClick={() => loadScenario(1175, 50, 32)}
            className="px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-700 text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" /> 3. Skenario 3 (Optimasi Hijau)
          </button>
        </div>

        {/* 3 Sliders Grid & Rekomendasi ML Auto-Optimizer Button */}
        <div className="grid md:grid-cols-2 gap-5 items-end">
          <div className="space-y-4">
            {/* Slider 1: Zona Suhu */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                <span>Zona Suhu Pembakaran</span>
                <span className="text-[#030b85] font-outfit font-extrabold">{simTemp} °C</span>
              </div>
              <input
                type="range"
                min={850}
                max={1400}
                value={simTemp}
                onChange={(e) => setSimTemp(parseInt(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg transition-all"
              />
              <div className="flex justify-between text-[10px] font-sans text-slate-400">
                <span>850 °C (Dingin)</span>
                <span className="text-emerald-700 font-bold">1175 °C (Optimal)</span>
                <span>1400 °C (Panas)</span>
              </div>
            </div>

            {/* Slider 2: Rasio Clay */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                <span>Rasio Clay (Tanah Liat)</span>
                <span className="text-[#030b85] font-outfit font-extrabold">{simClay} %</span>
              </div>
              <input
                type="range"
                min={30}
                max={70}
                value={simClay}
                onChange={(e) => setSimClay(parseInt(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg transition-all"
              />
              <div className="flex justify-between text-[10px] font-sans text-slate-400">
                <span>30 %</span>
                <span className="text-emerald-700 font-bold">50 % (Ideal)</span>
                <span>70 %</span>
              </div>
            </div>

            {/* Slider 3: Kecepatan Pusher */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                <span>Kecepatan Pusher</span>
                <span className="text-[#030b85] font-outfit font-extrabold">{simSpeed} RPM</span>
              </div>
              <input
                type="range"
                min={15}
                max={60}
                value={simSpeed}
                onChange={(e) => setSimSpeed(parseInt(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg transition-all"
              />
              <div className="flex justify-between text-[10px] font-sans text-slate-400">
                <span>15 RPM</span>
                <span className="text-emerald-700 font-bold">32 RPM (Ideal)</span>
                <span>60 RPM</span>
              </div>
            </div>
          </div>

          {/* Rekomendasi ML Auto-Optimizer Button */}
          <div className="flex flex-col justify-end gap-2 pt-2 md:pt-0">
            <p className="text-[11px] font-sans text-slate-500">
              *Klik <strong className="text-[#030b85]">Rekomendasi ML</strong> untuk otomatis menyelaraskan parameter ke resep dengan Yield terbaik.
            </p>
            <button
              onClick={handleAiOptimize}
              disabled={loadingPredict}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#030b85] via-[#1a3ba8] to-[#030b85] text-white font-sans font-extrabold text-sm shadow-md hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loadingPredict ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Bot className="w-5 h-5 text-amber-300" /> Rekomendasi ML (Auto-Optimize Yield)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Output Preskripsi Box (Dynamic Real-time Values) */}
      <motion.div
        key={`${simTemp}-${simClay}-${simSpeed}`}
        initial={{ opacity: 0.8, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/70 backdrop-blur-xl border rounded-2xl p-5 shadow-xs space-y-4 transition-all ${
          isAiOptimized ? "border-emerald-500 ring-2 ring-emerald-400/30" : "border-[#030b85]/20"
        }`}
      >
        <div className="text-sm font-outfit font-extrabold text-[#030b85] flex items-center justify-between border-b border-slate-900/10 pb-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#030b85]" /> Preskripsi Formula & Rekomendasi ML
          </div>
          {isAiOptimized && (
            <span className="text-xs font-sans font-bold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Formula Optimal Diterapkan!
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Yield Prediksi */}
          <div className="bg-white/80 border border-slate-200 p-3.5 rounded-xl">
            <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide block">
              Yield Prediksi (Grade A)
            </span>
            <span
              className={`text-2xl font-outfit font-black block mt-0.5 ${
                predictionResult.predicted_grade_a >= 90
                  ? "text-emerald-600"
                  : predictionResult.predicted_grade_a >= 80
                  ? "text-amber-600"
                  : "text-rose-600"
              }`}
            >
              {predictionResult.predicted_grade_a}%
            </span>
          </div>

          {/* Defect Rate */}
          <div className="bg-white/80 border border-slate-200 p-3.5 rounded-xl">
            <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide block">
              Defect Rate
            </span>
            <span
              className={`text-2xl font-outfit font-black block mt-0.5 ${
                predictionResult.predicted_defect_rate > 4.0 ? "text-rose-600" : "text-slate-900"
              }`}
            >
              {predictionResult.predicted_defect_rate}%
            </span>
          </div>

          {/* Penghematan Finansial */}
          <div className="bg-white/80 border border-slate-200 p-3.5 rounded-xl">
            <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide block">
              Penghematan Finansial
            </span>
            <span className="text-base font-outfit font-black text-[#030b85] block mt-0.5">
              {formatRupiah(predictionResult.expected_savings)}
            </span>
          </div>

          {/* Confidence Score */}
          <div className="bg-white/80 border border-slate-200 p-3.5 rounded-xl">
            <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide block">
              Confidence Score
            </span>
            <span className="text-2xl font-outfit font-black text-slate-900 block mt-0.5">
              {predictionResult.confidence}%
            </span>
          </div>
        </div>

        {/* Formula Recommendation Banner */}
        <div className="bg-[#030b85]/5 border border-[#030b85]/15 p-3.5 rounded-xl space-y-1">
          <span className="text-xs font-sans font-extrabold text-[#030b85] uppercase tracking-wider block">
            REKOMENDASI FORMULA BAHAN BAKU
          </span>
          <span className="text-sm font-sans font-bold text-slate-800 block">
            Clay: {predictionResult.clay}% · Feldspar: {predictionResult.feldspar}% · Quartz: {predictionResult.quartz}%
          </span>
        </div>
      </motion.div>

      {/* Daily Batch Data Table */}
      <div className="bg-white/60 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-xs font-outfit font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <TableIcon className="w-4 h-4 text-[#030b85]" /> Data Batch Harian ({selectedPeriod})
          </h4>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as "7d" | "1m" | "3m")}
            className="px-3 py-1 bg-white border border-slate-300 rounded-full text-xs font-sans font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="7d">7 Hari Terakhir (7d)</option>
            <option value="1m">1 Bulan Terakhir (1m)</option>
            <option value="3m">3 Bulan Terakhir (3m)</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans text-left border-collapse">
            <thead>
              <tr className="bg-[#030b85]/5 text-[#030b85] font-bold border-b border-slate-900/10">
                <th className="p-2.5">Tanggal</th>
                <th className="p-2.5">Shift</th>
                <th className="p-2.5">Grade A (%)</th>
                <th className="p-2.5">Reject (unit)</th>
                <th className="p-2.5">Batch</th>
              </tr>
            </thead>
            <tbody>
              {DEFAULT_BATCHES.map((b, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedBatch(b)}
                  className="border-b border-slate-900/5 hover:bg-slate-900/5 transition-colors cursor-pointer"
                >
                  <td className="p-2.5 font-semibold text-slate-800">{b.date}</td>
                  <td className="p-2.5 font-medium text-slate-700">{b.shift}</td>
                  <td className="p-2.5 font-bold text-[#030b85]">{b.grade_a.toFixed(1)}%</td>
                  <td className="p-2.5 font-medium text-rose-600">{b.reject}</td>
                  <td className="p-2.5 font-medium text-slate-800">{b.batch_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Detail Modal */}
      <AnimatePresence>
        {selectedBatch && (
          <div
            onClick={() => setSelectedBatch(null)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h3 className="text-base font-outfit font-extrabold text-[#030b85] flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#030b85]" /> Detail Batch Produksi
                </h3>
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Tanggal</span>
                  <strong className="text-slate-800">{selectedBatch.date}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Shift</span>
                  <strong className="text-slate-800">{selectedBatch.shift}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Grade A (%)</span>
                  <strong className="text-[#030b85]">{selectedBatch.grade_a.toFixed(1)}%</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Reject (unit)</span>
                  <strong className="text-rose-600">{selectedBatch.reject}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Batch Count</span>
                  <strong className="text-slate-800">{selectedBatch.batch_count}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Rasio Clay / Feldspar / Quartz</span>
                  <strong className="text-slate-800">
                    {selectedBatch.clay}% / {selectedBatch.feldspar}% / {selectedBatch.quartz}%
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Quality Score</span>
                  <strong className="text-emerald-600">{selectedBatch.quality_score}%</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">COGS Savings</span>
                  <strong className="text-[#030b85]">{formatRupiah(selectedBatch.expected_savings || 18700000)}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
