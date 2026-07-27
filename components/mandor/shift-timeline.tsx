"use client"

import { Route } from "lucide-react"

interface ShiftTimelineProps {
  step: number
  isWarning?: boolean
}

export function ShiftTimeline({ step, isWarning }: ShiftTimelineProps) {
  return (
    <div className="bg-white/40 border border-slate-900/10 rounded-2xl p-4 space-y-3">
      <h4 className="text-xs font-sans font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900/10 pb-2">
        <Route className="w-4 h-4 text-[#030b85]" /> Shift Timeline
      </h4>

      <div className="space-y-3 relative pl-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {/* Step 1 */}
        <div className="relative flex items-start gap-2 text-xs font-sans">
          <div
            className={`w-3 h-3 rounded-full border-2 border-white absolute -left-4 top-0.5 ${
              step >= 1 ? "bg-emerald-500 shadow-xs" : "bg-slate-300"
            }`}
          />
          <div>
            <div className="font-bold text-slate-800">Shift Started</div>
            <div className="text-[10px] text-slate-500">Operator logged in</div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex items-start gap-2 text-xs font-sans">
          <div
            className={`w-3 h-3 rounded-full border-2 border-white absolute -left-4 top-0.5 ${
              step >= 2 ? "bg-emerald-500 shadow-xs" : "bg-slate-300"
            }`}
          />
          <div>
            <div className="font-bold text-slate-800">Kiln Selected</div>
            <div className="text-[10px] text-slate-500">Target machine active</div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex items-start gap-2 text-xs font-sans">
          <div
            className={`w-3 h-3 rounded-full border-2 border-white absolute -left-4 top-0.5 ${
              step >= 3
                ? isWarning
                  ? "bg-amber-500 shadow-xs"
                  : "bg-emerald-500 shadow-xs"
                : "bg-slate-300"
            }`}
          />
          <div>
            <div className="font-bold text-slate-800">Telemetry Validated</div>
            <div className="text-[10px] text-slate-500">
              {isWarning ? "Soft guard warning triggered" : "Inputs nominal"}
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative flex items-start gap-2 text-xs font-sans">
          <div
            className={`w-3 h-3 rounded-full border-2 border-white absolute -left-4 top-0.5 ${
              step >= 4 ? "bg-emerald-500 shadow-xs" : "bg-slate-300"
            }`}
          />
          <div>
            <div className="font-bold text-slate-800">Batch Submitted</div>
            <div className="text-[10px] text-slate-500">Handover sheet prepared</div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="relative flex items-start gap-2 text-xs font-sans">
          <div
            className={`w-3 h-3 rounded-full border-2 border-white absolute -left-4 top-0.5 ${
              step >= 5 ? "bg-emerald-500 shadow-xs" : "bg-slate-300"
            }`}
          />
          <div>
            <div className="font-bold text-slate-800">Digital Sign-off</div>
            <div className="text-[10px] text-slate-500">PIN signature verified</div>
          </div>
        </div>
      </div>
    </div>
  )
}
