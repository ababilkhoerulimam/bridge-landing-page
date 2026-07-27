"use client"

import { WifiOff, RefreshCw, CheckCircle2, AlertTriangle, Radio } from "lucide-react"

export type SyncState = "offline" | "syncing" | "success" | "error" | "online"

interface SyncStatusIndicatorProps {
  syncState: SyncState
}

export function SyncStatusIndicator({ syncState }: SyncStatusIndicatorProps) {
  let label = "Offline - Local Storage"
  let colorClass = "text-slate-500"
  let Icon = WifiOff

  if (syncState === "syncing") {
    label = "Menghubungkan ke Server..."
    colorClass = "text-[#030b85]"
    Icon = RefreshCw
  } else if (syncState === "success") {
    label = "Sinkronisasi Berhasil"
    colorClass = "text-emerald-600"
    Icon = CheckCircle2
  } else if (syncState === "error") {
    label = "Koneksi Bermasalah (Penyimpanan Lokal)"
    colorClass = "text-rose-600"
    Icon = AlertTriangle
  } else if (syncState === "online") {
    label = "Sistem Online"
    colorClass = "text-emerald-600"
    Icon = Radio
  }

  return (
    <div className={`flex items-center gap-1.5 text-xs font-semibold ${colorClass}`}>
      <Icon className={`w-3.5 h-3.5 ${syncState === "syncing" ? "animate-spin" : ""}`} />
      <span>{label}</span>
    </div>
  )
}
