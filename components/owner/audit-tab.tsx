"use client"

import { useMemo, useState } from "react"
import { 
  ShieldCheck, 
  Search,
  Lock,
  UserCheck,
  AlertOctagon,
  Ban,
  TerminalSquare
} from "lucide-react"
import { Submission } from "@/types/bridge"

interface AuditTabProps {
  submissions: Submission[]
}

export function AuditTab({ submissions }: AuditTabProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const logs = useMemo(() => {
    // Generate some mock logs based on submissions
    const generatedLogs = submissions.map((s, i) => {
      const isReject = s.temperature && (s.temperature < 1100 || s.temperature > 1250)
      
      return {
        id: `LOG-${1000 + i}`,
        timestamp: s.timestamp || new Date().toISOString(),
        user: s.mandor || "System",
        role: s.mandor ? "Mandor" : "Automated",
        ip: `192.168.1.${10 + (i % 50)}`,
        activity: s.mandor ? "Submit Form Logbook" : "Sensor Data Sync",
        status: isReject ? "Blocked (Out of Range)" : "Success",
        type: isReject ? "warning" : "info"
      }
    })

    // Add some generic security logs
    generatedLogs.unshift(
      {
        id: `LOG-SEC-01`,
        timestamp: new Date().toISOString(),
        user: "Admin (Owner)",
        role: "Owner",
        ip: "10.0.0.5",
        activity: "Login Dashboard",
        status: "Success",
        type: "info"
      },
      {
        id: `LOG-SEC-02`,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        user: "Unknown",
        role: "Guest",
        ip: "45.22.11.9",
        activity: "Attempt Login",
        status: "Failed (Bad Password)",
        type: "danger"
      }
    )

    return generatedLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [submissions])

  const filteredLogs = logs.filter(l => 
    l.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const anomalies = logs.filter(l => l.type === "warning").length
  const denied = logs.filter(l => l.type === "danger").length

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <ShieldCheck className="w-5 h-5 text-[#030b85]" /> Security & Audit Trail
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> Sistem Keamanan Aktif
          </div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-emerald-600">Secure</div>
            <div className="text-[10px] font-mono font-bold text-slate-500 mt-1.5">End-to-End Encryption</div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[#030b85]" /> Total Aktivitas (24J)
          </div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-[#030b85]">{logs.length}</div>
            <div className="text-[10px] font-mono font-bold text-slate-500 mt-1.5">Log Tercatat</div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-amber-600" /> Anomali Terdeteksi
          </div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-amber-600">{anomalies}</div>
            <div className="text-[10px] font-mono font-bold text-slate-500 mt-1.5">Parameter Out-of-Bounds</div>
          </div>
        </div>
        
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Ban className="w-3.5 h-3.5 text-rose-600" /> Akses Ditolak
          </div>
          <div>
            <div className="text-xl md:text-2xl font-mono font-black text-rose-600">{denied}</div>
            <div className="text-[10px] font-mono font-bold text-slate-500 mt-1.5">Failed Logins</div>
          </div>
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 flex flex-col overflow-hidden h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase flex items-center gap-1.5">
            <TerminalSquare className="w-4 h-4" /> System Access & Security Log
          </h4>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari user, aktivitas..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3 py-1.5 bg-white/70 border border-slate-900/15 rounded-lg text-xs font-mono outline-none focus:border-[#030b85]/50 transition-colors"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Timestamp</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">User & Role</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">IP Address</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Activity</th>
                <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, i) => (
                <tr key={i} className="border-b border-slate-900/5 hover:bg-white/80 transition-colors">
                  <td className="p-2.5 font-bold text-slate-600">
                    {new Date(log.timestamp).toLocaleString('id-ID', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit', second: '2-digit'
                    })}
                  </td>
                  <td className="p-2.5">
                    <div className="font-bold text-slate-900">{log.user}</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">{log.role}</div>
                  </td>
                  <td className="p-2.5 text-slate-600 font-mono text-[11px]">{log.ip}</td>
                  <td className="p-2.5 font-medium text-slate-700">{log.activity}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                      log.type === "info" ? "bg-emerald-100 text-emerald-700" :
                      log.type === "warning" ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        log.type === "info" ? "bg-emerald-500" :
                        log.type === "warning" ? "bg-amber-500" :
                        "bg-rose-500"
                      }`}></span>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500 italic">
                    Tidak ada log yang sesuai pencarian
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
