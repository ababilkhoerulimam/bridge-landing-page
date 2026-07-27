"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Coins,
  LineChart,
  Factory,
  Brain,
  AlertTriangle,
  BarChart,
  Users,
  Boxes,
  Target,
  Leaf,
  Shield,
  FileText,
  Map,
  Settings,
  LogOut,
  Play,
  Pause,
  RotateCcw,
  User,
  CheckCircle2,
} from "lucide-react"

export type ActiveTab =
  | "dashboard"
  | "financial"
  | "quality"
  | "operational"
  | "ai"
  | "alerts"
  | "visualisasi"
  | "employee"
  | "inventory"
  | "target"
  | "sustainability"
  | "audit_trail"
  | "report"
  | "factory_map"
  | "settings"

interface SidebarProps {
  activeTab: ActiveTab
  setActiveTab: (tab: ActiveTab) => void
  onLogout: () => void
  isSimulating: boolean
  onToggleSimulation: () => void
  onResetDatabase: () => void
  lastSyncTime: string
}

export function Sidebar({
  activeTab,
  setActiveTab,
  onLogout,
  isSimulating,
  onToggleSimulation,
  onResetDatabase,
  lastSyncTime,
}: SidebarProps) {
  const menuItems: Array<{ id: ActiveTab; label: string; icon: any; badge?: number }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "financial", label: "Financial & Cost", icon: Coins },
    { id: "quality", label: "Quality Metrics", icon: LineChart },
    { id: "operational", label: "Operational", icon: Factory },
    { id: "ai", label: "Decision Intelligence", icon: Brain },
    { id: "alerts", label: "Alerts & Anomalies", icon: AlertTriangle, badge: 2 },
    { id: "visualisasi", label: "Visualisasi", icon: BarChart },
    { id: "employee", label: "Employee Performance", icon: Users },
    { id: "inventory", label: "Inventory & Materials", icon: Boxes },
    { id: "target", label: "Target & Goals", icon: Target },
    { id: "sustainability", label: "Sustainability", icon: Leaf },
    { id: "audit_trail", label: "Audit Trail", icon: Shield },
    { id: "report", label: "Reports Export", icon: FileText },
    { id: "factory_map", label: "Factory Map", icon: Map },
    { id: "settings", label: "Pengaturan Pabrik", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-xl border border-slate-900/10 rounded-3xl p-4 shadow-[0_25px_50px_rgba(30,41,59,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] flex flex-col h-[calc(100vh-40px)] sticky top-5 shrink-0 overflow-hidden">
      {/* Brand Logo Header (Fixed at top) */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-900/10 mb-2 shrink-0">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/bridge-logo.png"
            alt="BRIDGE Logo"
            width={130}
            height={36}
            className="w-32 h-auto"
            priority
          />
        </Link>
      </div>

      {/* Menu Navigation List (Scrollable in middle) */}
      <nav className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto custom-scrollbar py-1 pr-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl font-sans text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? "bg-[#030b85]/10 text-[#030b85] border border-[#030b85]/25 font-bold"
                  : "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1 text-left">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#030b85]" : "text-slate-500"}`} />
                <span className="leading-tight text-left flex-1 whitespace-normal">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 && (
                <span className="text-[9px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full shrink-0 ml-1">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Sidebar Footer Controls (Fixed at bottom) */}
      <div className="pt-2 border-t border-slate-900/10 mt-2 shrink-0 text-center space-y-1.5">
        {/* Mulai / Hentikan Simulasi Button */}
        <button
          onClick={onToggleSimulation}
          className={`w-full py-1.5 px-3 border rounded-xl font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isSimulating
              ? "bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100"
              : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-2xs"
          }`}
        >
          {isSimulating ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
              <span>Hentikan Simulasi Pabrik</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-slate-800 text-slate-800" />
              <span>Mulai Simulasi Pabrik</span>
            </>
          )}
        </button>

        {/* Reset Demo Database Button */}
        <button
          onClick={onResetDatabase}
          className="w-full py-1.5 px-3 border border-rose-300 bg-rose-50/60 hover:bg-rose-100 text-rose-700 font-sans text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Demo Database
        </button>

        {/* Owner & Live Sync Badge */}
        <div className="pt-1 text-[11px] font-sans space-y-0.5">
          <div className="font-bold text-slate-700 flex items-center justify-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-600" /> Owner
          </div>
          <div className="text-emerald-600 font-bold text-[10px] flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Sinkron Terakhir: {lastSyncTime}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-1.5 px-3 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-sans text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <LogOut className="w-3.5 h-3.5 text-slate-700" /> Logout
        </button>
      </div>
    </aside>
  )
}
