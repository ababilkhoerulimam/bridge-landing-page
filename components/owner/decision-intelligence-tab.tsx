"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Sliders, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react"
import { analyzeBatch } from "@/lib/decision-intelligence"

const formatRupiah = (val: number) => "Rp " + new Intl.NumberFormat("id-ID").format(val)

export function DecisionIntelligenceTab() {
  const [temperature, setTemperature] = useState(1150)
  const [clay, setClay] = useState(50)
  const [feldspar, setFeldspar] = useState(25)
  const [quartz, setQuartz] = useState(20)
  const [pusherSpeed, setPusherSpeed] = useState(32)

  const analysis = analyzeBatch({
    temperature,
    clay,
    feldspar,
    quartz,
    pusherSpeed,
  })

  return (
    <div className="space-y-5 animate-in font-sans">
      {/* Top Banner */}
      <div className="bg-white/60 border border-slate-900/10 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#030b85]/10 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-[#030b85]" />
          </div>
          <div>
            <h2 className="text-base font-outfit font-extrabold text-[#030b85] tracking-wide">
              DECISION INTELLIGENCE & AI RECIPE OPTIMIZER
            </h2>
            <p className="text-xs font-sans text-slate-600">
              Simulasi parameter kiln & komposisi bahan baku untuk proyeksi yield dan preskripsi tindakan.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-5">
        {/* Left Sliders Card */}
        <div className="md:col-span-6 bg-white/60 border border-slate-900/10 rounded-2xl p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-outfit font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900/10 pb-2">
            <Sliders className="w-4 h-4 text-[#030b85]" /> PARAMETER INPUT SIMULASI BATCH
          </h3>

          {/* Slider 1: Temperature */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
              <span>Temperatur Kiln Pembakaran</span>
              <span className="text-[#030b85] font-outfit font-extrabold">{temperature} °C</span>
            </div>
            <input
              type="range"
              min={800}
              max={1400}
              step={5}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-sans text-slate-400">
              <span>800°C</span>
              <span>Nominal: 1100-1250°C</span>
              <span>1400°C</span>
            </div>
          </div>

          {/* Slider 2: Pusher Speed */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
              <span>Kecepatan Pusher Speed</span>
              <span className="text-[#030b85] font-outfit font-extrabold">{pusherSpeed} RPM</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={1}
              value={pusherSpeed}
              onChange={(e) => setPusherSpeed(parseFloat(e.target.value))}
              className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-sans text-slate-400">
              <span>10 RPM</span>
              <span>Nominal: 25-40 RPM</span>
              <span>60 RPM</span>
            </div>
          </div>

          {/* Slider 3: Clay */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
              <span>Komposisi Rasio Clay (Tanah Liat)</span>
              <span className="text-[#030b85] font-outfit font-extrabold">{clay}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={70}
              step={0.5}
              value={clay}
              onChange={(e) => setClay(parseFloat(e.target.value))}
              className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-sans text-slate-400">
              <span>30%</span>
              <span>Nominal: 45-55%</span>
              <span>70%</span>
            </div>
          </div>

          {/* Feldspar & Quartz */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                <span>Feldspar</span>
                <span className="font-outfit font-bold">{feldspar}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                step={0.5}
                value={feldspar}
                onChange={(e) => setFeldspar(parseFloat(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                <span>Quartz</span>
                <span className="font-outfit font-bold">{quartz}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                step={0.5}
                value={quartz}
                onChange={(e) => setQuartz(parseFloat(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="md:col-span-6 bg-white/60 border border-[#030b85]/20 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-center border-b border-slate-900/10 pb-2 mb-3">
              <h3 className="text-xs font-outfit font-extrabold text-[#030b85] uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-emerald-600" /> HASIL PREDIKSI & REKOMENDASI PRESKRIPTIF
              </h3>
              <span
                className={`text-[10px] font-sans font-extrabold px-2.5 py-0.5 rounded-full ${
                  analysis.risk_level === "HIGH"
                    ? "bg-rose-100 text-rose-700 border border-rose-300"
                    : analysis.risk_level === "MEDIUM"
                    ? "bg-amber-100 text-amber-700 border border-amber-300"
                    : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                }`}
              >
                Risk: {analysis.risk_level}
              </span>
            </div>

            {/* Grid 4 Outputs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/80 border border-slate-200/80 p-3 rounded-xl shadow-xs">
                <div className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide">
                  PROYEKSI GRADE A YIELD
                </div>
                <div className="text-2xl font-outfit font-black text-[#030b85]">
                  {analysis.predicted_grade_a}%
                </div>
              </div>
              <div className="bg-white/80 border border-slate-200/80 p-3 rounded-xl shadow-xs">
                <div className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide">
                  PROYEKSI DEFECT RATE
                </div>
                <div className="text-2xl font-outfit font-black text-rose-600">
                  {analysis.predicted_defect_rate}%
                </div>
              </div>
              <div className="bg-white/80 border border-slate-200/80 p-3 rounded-xl shadow-xs">
                <div className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide">
                  AI CONFIDENCE LEVEL
                </div>
                <div className="text-2xl font-outfit font-black text-emerald-600">
                  {analysis.confidence}%
                </div>
              </div>
              <div className="bg-white/80 border border-slate-200/80 p-3 rounded-xl shadow-xs">
                <div className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wide">
                  PENGHEMATAN COGS (SHIFT)
                </div>
                <div className="text-lg font-outfit font-black text-slate-900">
                  {formatRupiah(analysis.expected_savings)}
                </div>
              </div>
            </div>

            {/* Risk Warning Box */}
            <div className="bg-[#030b85]/5 border border-[#030b85]/15 p-3.5 rounded-xl text-xs font-sans space-y-2.5">
              <div>
                <strong className="text-amber-700 font-bold block mb-0.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" /> Peringatan Risiko:
                </strong>
                <p className="text-slate-700 leading-relaxed pl-5.5">{analysis.risk_warning}</p>
              </div>
              <div>
                <strong className="text-[#030b85] font-bold block mb-0.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#030b85]" /> Rekomendasi Preskriptif:
                </strong>
                <p className="text-slate-700 leading-relaxed pl-5.5">{analysis.recommended_action}</p>
              </div>
              <div>
                <strong className="text-emerald-700 font-bold block mb-0.5 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> Dampak Finansial / Bisnis:
                </strong>
                <p className="text-slate-700 leading-relaxed pl-5.5">{analysis.business_impact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
