"use client"

import { useState } from "react"
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
  { date: "2026-07-27", shift: "Malam", grade_a: 91.5, reject: 10, batch_count: 296, clay: 50, feldspar: 25, quartz: 25, quality_score: 91.5, expected_savings: 15000000 },
  { date: "2026-07-26", shift: "Siang", grade_a: 78.9, reject: 2, batch_count: 281, clay: 52, feldspar: 24, quartz: 24, quality_score: 78.9, expected_savings: 12000000 },
  { date: "2026-07-25", shift: "Siang", grade_a: 77.4, reject: 15, batch_count: 242, clay: 48, feldspar: 26, quartz: 26, quality_score: 77.4, expected_savings: 11000000 },
  { date: "2026-07-24", shift: "Pagi", grade_a: 80.2, reject: 15, batch_count: 232, clay: 51, feldspar: 25, quartz: 24, quality_score: 80.2, expected_savings: 13500000 },
  { date: "2026-07-23", shift: "Malam", grade_a: 88.0, reject: 3, batch_count: 258, clay: 50, feldspar: 25, quartz: 25, quality_score: 88.0, expected_savings: 14800000 },
  { date: "2026-07-22", shift: "Pagi", grade_a: 75.1, reject: 9, batch_count: 250, clay: 54, feldspar: 23, quartz: 23, quality_score: 75.1, expected_savings: 10500000 },
  { date: "2026-07-21", shift: "Pagi", grade_a: 75.0, reject: 8, batch_count: 237, clay: 53, feldspar: 24, quartz: 23, quality_score: 75.0, expected_savings: 10200000 },
]

export function DecisionIntelligenceTab() {
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "1m" | "3m">("7d")
  const [simTemp, setSimTemp] = useState(1175)
  const [simClay, setSimClay] = useState(50)
  const [simSpeed, setSimSpeed] = useState(32)

  const [loadingPredict, setLoadingPredict] = useState(false)
  const [predictionResult, setPredictionResult] = useState<{
    clay: number
    feldspar: number
    quartz: number
    predicted_grade_a: number
    predicted_defect_rate: number
    confidence: number
    expected_savings: number
  } | null>({
    clay: 50,
    feldspar: 25,
    quartz: 25,
    predicted_grade_a: 91.5,
    predicted_defect_rate: 1.9,
    confidence: 93,
    expected_savings: 15000000,
  })

  const [selectedBatch, setSelectedBatch] = useState<BatchItem | null>(null)

  const handlePredict = () => {
    setLoadingPredict(true)
    setTimeout(() => {
      let gradeA = 91.5
      if (simTemp < 1100 || simTemp > 1250) gradeA -= Math.abs(simTemp - 1175) * 0.05
      if (simClay < 45 || simClay > 55) gradeA -= Math.abs(simClay - 50) * 0.4
      gradeA = Math.max(62.0, Math.min(98.2, parseFloat(gradeA.toFixed(1))))
      const defect = parseFloat(((100 - gradeA) * 0.22).toFixed(1))

      setPredictionResult({
        clay: simClay,
        feldspar: 25,
        quartz: 25,
        predicted_grade_a: gradeA,
        predicted_defect_rate: defect,
        confidence: 93,
        expected_savings: Math.round(15000000 * (gradeA / 91.5)),
      })
      setLoadingPredict(false)
    }, 400)
  }

  const loadScenario = (temp: number, clay: number, speed: number) => {
    setSimTemp(temp)
    setSimClay(clay)
    setSimSpeed(speed)

    let gradeA = 91.5
    if (temp < 1100 || temp > 1250) gradeA -= Math.abs(temp - 1175) * 0.05
    if (clay < 45 || clay > 55) gradeA -= Math.abs(clay - 50) * 0.4
    gradeA = Math.max(62.0, Math.min(98.2, parseFloat(gradeA.toFixed(1))))
    const defect = parseFloat(((100 - gradeA) * 0.22).toFixed(1))

    setPredictionResult({
      clay: clay,
      feldspar: 25,
      quartz: 25,
      predicted_grade_a: gradeA,
      predicted_defect_rate: defect,
      confidence: 93,
      expected_savings: Math.round(15000000 * (gradeA / 91.5)),
    })
  }

  return (
    <div className="space-y-5 animate-in font-sans">
      {/* Title */}
      <div className="text-lg md:text-xl font-outfit font-extrabold text-[#030b85] flex items-center gap-2">
        <Brain className="w-5 h-5 text-[#030b85]" /> Decision Intelligence
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

        {/* 3 Sliders Grid & Rekomendasi ML Button */}
        <div className="grid md:grid-cols-2 gap-4 items-end">
          <div className="space-y-4">
            {/* Slider 1: Zona Suhu */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                <span>Zona Suhu Pembakaran</span>
                <span className="text-[#030b85] font-outfit font-bold">{simTemp} °C</span>
              </div>
              <input
                type="range"
                min={850}
                max={1400}
                value={simTemp}
                onChange={(e) => setSimTemp(parseInt(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Slider 2: Rasio Clay */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                <span>Rasio Clay (Tanah Liat)</span>
                <span className="text-[#030b85] font-outfit font-bold">{simClay} %</span>
              </div>
              <input
                type="range"
                min={30}
                max={70}
                value={simClay}
                onChange={(e) => setSimClay(parseInt(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Slider 3: Kecepatan Pusher */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                <span>Kecepatan Pusher</span>
                <span className="text-[#030b85] font-outfit font-bold">{simSpeed} RPM</span>
              </div>
              <input
                type="range"
                min={15}
                max={60}
                value={simSpeed}
                onChange={(e) => setSimSpeed(parseInt(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Rekomendasi ML Button */}
          <div className="flex justify-end pt-2 md:pt-0">
            <button
              onClick={handlePredict}
              disabled={loadingPredict}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#030b85] to-[#1a3ba8] text-white font-sans font-extrabold text-sm shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loadingPredict ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Bot className="w-4 h-4" /> Rekomendasi ML
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Output Preskripsi Box */}
      {predictionResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-[#030b85]/20 rounded-2xl p-5 shadow-xs space-y-4"
        >
          <div className="text-sm font-outfit font-extrabold text-[#030b85] flex items-center gap-2 border-b border-slate-900/10 pb-2">
            <Compass className="w-4 h-4 text-[#030b85]" /> Preskripsi Formula & Rekomendasi ML
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/80 border border-slate-200 p-3 rounded-xl">
              <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide block">
                Yield Prediksi (Grade A)
              </span>
              <span className="text-2xl font-outfit font-black text-emerald-600 block mt-0.5">
                {predictionResult.predicted_grade_a}%
              </span>
            </div>

            <div className="bg-white/80 border border-slate-200 p-3 rounded-xl">
              <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide block">
                Defect Rate
              </span>
              <span
                className={`text-2xl font-outfit font-black block mt-0.5 ${
                  predictionResult.predicted_defect_rate > 5 ? "text-rose-600" : "text-slate-900"
                }`}
              >
                {predictionResult.predicted_defect_rate}%
              </span>
            </div>

            <div className="bg-white/80 border border-slate-200 p-3 rounded-xl">
              <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide block">
                Penghematan Finansial
              </span>
              <span className="text-base font-outfit font-black text-[#030b85] block mt-0.5">
                {formatRupiah(predictionResult.expected_savings)}
              </span>
            </div>

            <div className="bg-white/80 border border-slate-200 p-3 rounded-xl">
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
      )}

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
                  <strong className="text-[#030b85]">{formatRupiah(selectedBatch.expected_savings || 15000000)}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
