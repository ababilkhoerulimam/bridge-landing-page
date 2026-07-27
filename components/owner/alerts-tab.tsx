"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Bell, Edit3, Save, X, Brain, CheckCircle2, Send, ShieldCheck as UserShield, Clock } from "lucide-react"

interface AlertItem {
  id: string
  level: "CRITICAL" | "WARNING"
  title: string
  desc: string
  time: string
  machine: string
  mandor: string
  temp: number
  defaultInst: string
  customInst?: string
}

interface DispatchedTask {
  id: string
  alertId: string
  timestamp: string
  machine: string
  mandor: string
  title: string
  instruction: string
  status: "pending" | "completed"
  isOwnerDispatched: boolean
}

export function AlertsTab() {
  const [editingAlertId, setEditingAlertId] = useState<string | null>(null)
  const [customInstructionText, setCustomInstructionText] = useState("")

  const [alertsFeed, setAlertsFeed] = useState<AlertItem[]>([
    {
      id: "alt-default-1",
      level: "CRITICAL",
      title: "Overtemperature Kiln Pembakaran",
      desc: "Suhu kiln menyimpang ke 1320°C (Soft Guard terpicu). Risiko biskuit retak termal.",
      time: new Date().toISOString(),
      machine: "Machine 3",
      mandor: "Hadi",
      temp: 1320,
      defaultInst: "Kurangi flow gas burner 6% dan percepat pusher speed 2 RPM.",
    },
    {
      id: "alt-default-2",
      level: "WARNING",
      title: "Rasio Clay Melebihi Batas Nominal",
      desc: "Penggunaan Clay pada Machine 1 mencapai 59% (Standar 50%). Risiko pembengkakan adonan.",
      time: new Date().toISOString(),
      machine: "Machine 1",
      mandor: "Budi",
      temp: 1150,
      defaultInst: "Koreksi formulasi hopper clay ke 50% dan tambahkan rasio quartz 2%.",
    },
    {
      id: "alt-default-3",
      level: "WARNING",
      title: "Fluktuasi Pusher Gearbox RPM",
      desc: "Tahanan mesin pusher meningkat +4.2% dari baseline nominal.",
      time: new Date().toISOString(),
      machine: "Machine 2",
      mandor: "Samsul",
      temp: 1180,
      defaultInst: "Lakukan pelumasan ulang gearbox pusher speed dan kalibrasi motor encoder.",
    },
  ])

  const [resolvedAlerts, setResolvedAlerts] = useState<Record<string, boolean>>({})
  const [dispatchedTasks, setDispatchedTasks] = useState<DispatchedTask[]>([])

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("bridge_dispatched_tasks")
      if (storedTasks) {
        setDispatchedTasks(JSON.parse(storedTasks))
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("bridge_dispatched_tasks", JSON.stringify(dispatchedTasks))
    } catch (e) {
      console.error(e)
    }
  }, [dispatchedTasks])

  const handleDismissAlert = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus alert anomali ini dari daftar? (Dianggap false alarm)")) {
      setAlertsFeed((prev) => prev.filter((a) => a.id !== id))
    }
  }

  const startEditingAlert = (item: AlertItem) => {
    setEditingAlertId(item.id)
    setCustomInstructionText(item.customInst || item.defaultInst)
  }

  const saveCustomInstruction = (id: string) => {
    setAlertsFeed((prev) =>
      prev.map((a) => (a.id === id ? { ...a, customInst: customInstructionText } : a)),
    )
    setEditingAlertId(null)
  }

  const dispatchTaskToMandor = (item: AlertItem) => {
    const inst = item.customInst || item.defaultInst
    const newTask: DispatchedTask = {
      id: `task-${Date.now()}`,
      alertId: item.id,
      timestamp: new Date().toISOString(),
      machine: item.machine || "Machine",
      mandor: item.mandor || "Mandor",
      title: item.title,
      instruction: inst,
      status: "pending",
      isOwnerDispatched: true,
    }

    setDispatchedTasks([newTask, ...dispatchedTasks])
    setResolvedAlerts((prev) => ({ ...prev, [item.id]: true }))
    alert(`Instruksi maintenance berhasil dikirim ke Tablet Mandor (${item.mandor})!`)
  }

  const activeCount = alertsFeed.filter((a) => !resolvedAlerts[a.id]).length
  const completedCount = dispatchedTasks.filter((t) => t.status === "completed").length

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-4">
          <div className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-wider">
            Alert Aktif Saat Ini
          </div>
          <div className="text-2xl font-mono font-black text-rose-600 my-1">{activeCount} Alert</div>
          <div className="text-xs font-mono text-rose-500">butuh tindakan lapangan</div>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            Tugas Dikirim ke Mandor
          </div>
          <div className="text-2xl font-mono font-black text-[#030b85] my-1">{dispatchedTasks.length} Tugas</div>
          <div className="text-xs font-mono text-slate-500">monitoring pengerjaan mandor</div>
        </div>

        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            Status Selesai Checked-Off
          </div>
          <div className="text-2xl font-mono font-black text-emerald-600 my-1">{completedCount} Selesai</div>
          <div className="text-xs font-mono text-slate-500">di-checklist oleh mandor tablet</div>
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <h3 className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" /> Active Deviation Alert Feed
          </h3>
          <span className="text-[11px] bg-[#030b85]/10 text-[#030b85] px-3 py-1.5 rounded-full font-mono font-extrabold flex items-center gap-1.5">
            <UserShield className="w-3.5 h-3.5" /> Owner Review & Edit Allowed
          </span>
        </div>

        <div className="space-y-4">
          {alertsFeed.length === 0 ? (
            <div className="text-center p-6 text-slate-500 font-mono text-sm border border-slate-200 border-dashed rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              Semua alert anomali telah diselesaikan / ditanggapi.
            </div>
          ) : (
            alertsFeed.map((a) => {
              const isResolved = resolvedAlerts[a.id]
              const isEditing = editingAlertId === a.id
              const currentInst = a.customInst || a.defaultInst

              return (
                <div
                  key={a.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isResolved
                      ? "bg-emerald-50/50 border-emerald-200 opacity-70"
                      : "bg-white/80 border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4 mb-2 flex-wrap">
                    <div className="flex items-center gap-2 font-mono font-bold text-sm">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          isResolved ? "text-emerald-500" : a.level === "CRITICAL" ? "text-rose-500" : "text-amber-500"
                        }`}
                      />
                      <span
                        className={
                          isResolved ? "text-emerald-700" : a.level === "CRITICAL" ? "text-rose-600" : "text-amber-600"
                        }
                      >
                        {isResolved ? "[DITUGASKAN / SELESAI] " : ""}
                        {a.level}: {a.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(a.time).toLocaleString("id-ID")}
                    </span>
                  </div>

                  <p className="text-sm font-mono text-slate-700 font-medium mb-3">{a.desc}</p>

                  <div className="bg-[#030b85]/5 border border-[#030b85]/15 p-3.5 rounded-xl mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-mono font-extrabold text-[#030b85] uppercase flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5" /> Instruksi Maintenance AI{" "}
                        {a.customInst ? "(Telah Diedit Owner)" : ""}
                      </span>
                      {!isEditing && !isResolved && (
                        <button
                          onClick={() => startEditingAlert(a)}
                          className="text-[11px] font-mono font-bold text-[#030b85] flex items-center gap-1 hover:underline"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Instruksi
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2 mt-2">
                        <textarea
                          value={customInstructionText}
                          onChange={(e) => setCustomInstructionText(e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-[#030b85]/30 rounded-lg text-sm font-mono font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#030b85]"
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setEditingAlertId(null)}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono font-bold text-slate-600 hover:bg-slate-50"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => saveCustomInstruction(a.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#047857] text-white text-xs font-mono font-bold hover:bg-[#065f46] flex items-center gap-1"
                          >
                            <Save className="w-3.5 h-3.5" /> Simpan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm font-mono text-slate-800 font-bold">{currentInst}</p>
                    )}
                  </div>

                   {!isResolved && (
                    <div className="flex flex-wrap gap-2 justify-end border-t border-slate-100 pt-3">
                      <button
                        onClick={() => handleDismissAlert(a.id)}
                        className="py-2 px-4 rounded-full border border-slate-300 text-slate-600 text-xs font-mono font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Tandai False Alarm
                      </button>
                      <button
                        onClick={() => dispatchTaskToMandor(a)}
                        className="py-2 px-4 rounded-full bg-gradient-to-r from-[#030b85] to-[#1a3ba8] text-white text-xs font-mono font-bold hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Kirim Instruksi ke Tablet
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
