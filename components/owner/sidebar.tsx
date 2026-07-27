"use client"

import Image from "next/image"
import Link from "next/link"
import {
  LayoutDashboard,
  Brain,
  Users,
  FileText,
  Settings,
  LogOut,
  Coins,
  LineChart,
  Factory,
  AlertTriangle,
  BarChart,
  Boxes,
  Target,
  Leaf,
  Shield,
  Map,
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
}

export function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems: Array<{ id: ActiveTab; label: string; icon: any; badge?: number }> = [
    { id: "dashboard", label: "Dashboard Utama", icon: LayoutDashboard },
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
    <aside className="w-64 bg-white/70 backdrop-blur-xl border border-slate-900/10 rounded-3xl p-4 shadow-[0_25px_50px_rgba(30,41,59,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] flex flex-col h-[calc(100vh-40px)] sticky top-5 shrink-0 overflow-y-auto custom-scrollbar">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-900/10 mb-3 shrink-0">
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

      {/* Menu Navigation */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl font-sans text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
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

      {/* Sidebar Footer & Logout */}
      <div className="pt-3 border-t border-slate-900/10 mt-3 shrink-0 text-center">
        <div className="text-[10px] font-sans text-slate-500 mb-2 font-medium">PT BRIDGE INFRADATA</div>
        <button
          onClick={onLogout}
          className="w-full py-2 px-3 border border-rose-200 rounded-xl bg-rose-50/50 hover:bg-rose-100 text-rose-700 font-sans text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" /> Keluar Dashboard
        </button>
      </div>
    </aside>
  )
}
