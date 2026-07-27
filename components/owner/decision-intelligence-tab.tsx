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
    <div className="space-y-5 animate-in">
      {/* Top Banner */}
      <div className="bg-white/60 border border-slate-900/10 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#030b85]" />
          <div>
            <h2 className="text-base font-mono font-extrabold text-[#030b85]">
              AI Decision Intelligence & Formula Optimizer
            </h2>
            <p className="text-xs font-mono text-slate-600">
              Simulasi parameter kiln & komposisi bahan baku untuk proyeksi yield dan preskripsi tindakan.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-5">
        {/* Left Sliders Card */}
        <div className="md:col-span-6 bg-white/60 border border-slate-900/10 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-mono font-extrabold text-slate-700 uppercase flex items-center gap-1.5 border-b border-slate-900/10 pb-2">
            <Sliders className="w-4 h-4 text-[#030b85]" /> Parameter Input Simulasi Batch
          </h3>

          {/* Slider 1: Temperature */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-800">
              <span>Temperatur Kiln Pembakaran</span>
              <span className="text-[#030b85]">{temperature} °C</span>
            </div>
            <input
              type="range"
              min={800}
              max={1400}
              step={5}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-[#030b85] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>800°C</span>
              <span>Nominal: 1100-1250°C</span>
              <span>1400°C</span>
            </div>
          </div>

          {/* Slider 2: Pusher Speed */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-800">
              <span>Kecepatan Pusher Speed</span>
              <span className="text-[#030b85]">{pusherSpeed} RPM</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={1}
              value={pusherSpeed}
              onChange={(e) => setPusherSpeed(parseFloat(e.target.value))}
              className="w-full accent-[#030b85] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>10 RPM</span>
              <span>Nominal: 25-40 RPM</span>
              <span>60 RPM</span>
            </div>
          </div>

          {/* Slider 3: Clay */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-800">
              <span>Komposisi Rasio Clay (Tanah Liat)</span>
              <span className="text-[#030b85]">{clay}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={70}
              step={0.5}
              value={clay}
              onChange={(e) => setClay(parseFloat(e.target.value))}
              className="w-full accent-[#030b85] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>30%</span>
              <span>Nominal: 45-55%</span>
              <span>70%</span>
            </div>
          </div>

          {/* Feldspar & Quartz */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono font-bold text-slate-800">
                <span>Feldspar</span>
                <span>{feldspar}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                step={0.5}
                value={feldspar}
                onChange={(e) => setFeldspar(parseFloat(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono font-bold text-slate-800">
                <span>Quartz</span>
                <span>{quartz}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                step={0.5}
                value={quartz}
                onChange={(e) => setQuartz(parseFloat(e.target.value))}
                className="w-full accent-[#030b85] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="md:col-span-6 bg-white/60 border border-[#030b85]/20 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-900/10 pb-2 mb-3">
              <h3 className="text-xs font-mono font-extrabold text-[#030b85] uppercase flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-emerald-600" /> Hasil Prediksi & Rekomendasi Preskriptif
              </h3>
              <span
                className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full ${
                  analysis.risk_level === "HIGH"
                    ? "bg-rose-100 text-rose-700"
                    : analysis.risk_level === "MEDIUM"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Risk: {analysis.risk_level}
              </span>
            </div>

            {/* Grid 4 Outputs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/80 border border-slate-200 p-3 rounded-xl">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Proyeksi Grade A Yield
                </div>
                <div className="text-xl font-mono font-black text-[#030b85]">
                  {analysis.predicted_grade_a}%
                </div>
              </div>
              <div className="bg-white/80 border border-slate-200 p-3 rounded-xl">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Proyeksi Defect Rate
                </div>
                <div className="text-xl font-mono font-black text-rose-600">
                  {analysis.predicted_defect_rate}%
                </div>
              </div>
              <div className="bg-white/80 border border-slate-200 p-3 rounded-xl">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  AI Confidence Level
                </div>
                <div className="text-xl font-mono font-black text-emerald-600">
                  {analysis.confidence}%
                </div>
              </div>
              <div className="bg-white/80 border border-slate-200 p-3 rounded-xl">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Penghematan COGS (Shift)
                </div>
                <div className="text-base font-mono font-black text-slate-900">
                  {formatRupiah(analysis.expected_savings)}
                </div>
              </div>
            </div>

            {/* Risk Warning Box */}
            <div className="bg-[#030b85]/5 border border-[#030b85]/15 p-3.5 rounded-xl text-xs font-mono space-y-2">
              <div>
                <strong className="text-amber-700 font-bold block mb-0.5 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Peringatan Risiko:
                </strong>
                <p className="text-slate-700 leading-relaxed">{analysis.risk_warning}</p>
              </div>
              <div>
                <strong className="text-[#030b85] font-bold block mb-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rekomendasi Preskriptif:
                </strong>
                <p className="text-slate-700 leading-relaxed">{analysis.recommended_action}</p>
              </div>
              <div>
                <strong className="text-emerald-700 font-bold block mb-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Dampak Finansial / Bisnis:
                </strong>
                <p className="text-slate-700 leading-relaxed">{analysis.business_impact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
