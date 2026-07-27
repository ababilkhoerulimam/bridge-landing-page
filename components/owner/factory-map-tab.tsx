"use client"

import { Map, Lock, Zap, Box, Compass } from "lucide-react"

export function FactoryMapTab() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500 h-full flex flex-col">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <Map className="w-5 h-5 text-[#030b85]" /> Factory Interactive Map (Digital Twin)
      </div>

      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-8 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[500px]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-900/5 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-slate-400" />
          </div>
          
          <h2 className="text-2xl font-mono font-black text-slate-800 mb-3">
            3D Factory Digital Twin
          </h2>
          
          <p className="text-sm font-mono text-slate-600 mb-8 leading-relaxed">
            Interactive factory map and spatial analytics are currently under development. This module is scheduled for release in <strong className="text-[#030b85]">Phase 4</strong>.
          </p>

          <div className="w-full bg-white/80 border border-slate-900/10 rounded-xl p-5 text-left">
            <h3 className="text-xs font-mono font-extrabold text-slate-800 uppercase mb-4 border-b border-slate-900/10 pb-2">
              Planned Features
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm font-mono text-slate-600">
                <Box className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Real-time AGV Tracking</strong>
                  Live positioning of Automated Guided Vehicles across the factory floor.
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm font-mono text-slate-600">
                <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Thermal Heatmaps</strong>
                  Spatial visualization of temperature distribution across kilns and cooling zones.
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm font-mono text-slate-600">
                <Compass className="w-4 h-4 text-[#030b85] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Remote Asset Control</strong>
                  Direct interaction with factory equipment through the digital interface.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
