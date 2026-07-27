"use client"

import { useState, useEffect } from "react"
import { Brain, Bot, CheckSquare, Square, Clock, ShieldAlert } from "lucide-react"
import { DispatchedTask } from "@/types/bridge"
import { DEFAULT_TASKS } from "@/lib/mock-data"

export function MaintenanceCalendar() {
  const [dispatchedTasks, setDispatchedTasks] = useState<DispatchedTask[]>([])
  const [defaultTasks, setDefaultTasks] = useState<DispatchedTask[]>(DEFAULT_TASKS)

  useEffect(() => {
    const loadTasks = () => {
      try {
        const stored = localStorage.getItem("bridge_dispatched_tasks")
        if (stored) {
          setDispatchedTasks(JSON.parse(stored))
        }
      } catch (e) {
        console.error("Failed to load dispatched tasks:", e)
      }
    }

    loadTasks()
    const interval = setInterval(loadTasks, 2500)
    return () => clearInterval(interval)
  }, [])

  const toggleDispatchedTask = (id: string) => {
    const updated = dispatchedTasks.map((t) => {
      if (t.id === id) {
        return { ...t, status: (t.status === "completed" ? "pending" : "completed") as any }
      }
      return t
    })
    setDispatchedTasks(updated)
    try {
      localStorage.setItem("bridge_dispatched_tasks", JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
  }

  const toggleDefaultTask = (id: string) => {
    setDefaultTasks(
      defaultTasks.map((t) =>
        t.id === id
          ? { ...t, status: (t.status === "completed" ? "scheduled" : "completed") as any }
          : t,
      ),
    )
  }

  return (
    <div className="bg-white/65 border border-[#030b85]/20 rounded-2xl p-3 md:p-4 mt-2">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-900/10">
        <h4 className="text-xs font-mono font-extrabold text-[#030b85] flex items-center gap-1.5 uppercase tracking-wider">
          <Brain className="w-4 h-4 text-emerald-600" /> JADWAL SERVIS RUTIN (AI PREDICTIVE MAINTENANCE)
        </h4>
        <span className="text-[10px] font-mono font-extrabold bg-[#030b85]/10 text-[#030b85] px-2 py-0.5 rounded-full flex items-center gap-1">
          <Bot className="w-3 h-3" /> Auto-Generated AI
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {/* Render Dispatched Tasks from Owner First */}
        {dispatchedTasks.map((t) => {
          const isDone = t.status === "completed"
          return (
            <div
              key={t.id}
              onClick={() => toggleDispatchedTask(t.id)}
              className={`flex justify-between items-center p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isDone
                  ? "bg-emerald-50/80 border-emerald-300/60"
                  : "bg-[#030b85]/5 border-[#030b85]/30"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-[#030b85] flex-shrink-0" />
                )}
                <div>
                  <div
                    className={`text-xs font-mono font-extrabold ${
                      isDone ? "text-emerald-700 line-through" : "text-[#030b85]"
                    }`}
                  >
                    <ShieldAlert className="w-3 h-3 inline mr-1 text-[#030b85]" />
                    {t.instruction}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Hari Ini · {t.timestamp ? new Date(t.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "Live"} WIB | Mandor: <strong>{t.mandor}</strong> ({t.machine})
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                  isDone ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {isDone ? "✓ SELESAI" : "INSTRUKSI OWNER"}
              </span>
            </div>
          )
        })}

        {/* Render Default Tasks */}
        {defaultTasks.map((t) => {
          const isDone = t.status === "completed"
          return (
            <div
              key={t.id}
              onClick={() => toggleDefaultTask(t.id)}
              className={`flex justify-between items-center p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                isDone
                  ? "bg-emerald-50/50 border-emerald-200"
                  : "bg-white/85 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <div>
                  <div
                    className={`text-xs font-mono font-bold ${
                      isDone ? "text-emerald-700 line-through" : "text-slate-900"
                    }`}
                  >
                    {t.task}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {t.date} · {t.time} | Penanggung Jawab: <strong>{t.tech}</strong>
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                  isDone
                    ? "bg-emerald-100 text-emerald-700"
                    : t.status === "scheduled"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isDone ? "✓ SELESAI" : t.status === "scheduled" ? "TERJADWAL" : "MENDATANG"}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
