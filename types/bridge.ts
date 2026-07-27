export interface Submission {
  id: string // machine_id e.g. "m1"
  name: string // machine_name e.g. "Machine 1"
  shift: "Pagi" | "Siang" | "Malam"
  temperature: number
  clay: number
  feldspar: number
  quartz: number
  pusherSpeed: number
  batchCount: number
  mandor: string
  notes?: string
  timestamp: string
  signed: boolean
  actualQuality: number
}

export interface KilnStatusItem {
  machine: string
  temperature: number
  pusherSpeed?: number
  updatedAt?: string
  mandor?: string
  status: "normal" | "warning" | "critical"
  isLive?: boolean
}

export interface DispatchedTask {
  id: string
  instruction?: string
  timestamp?: string
  mandor?: string
  machine?: string
  status: "completed" | "pending" | "scheduled" | "upcoming"
  date?: string
  time?: string
  task?: string
  tech?: string
}

export interface DecisionAnalysisRequest {
  temperature: number
  clay: number
  feldspar: number
  quartz: number
  pusherSpeed: number
}

export interface DecisionAnalysisResponse {
  predicted_grade_a: number
  predicted_defect_rate: number
  confidence: number
  expected_savings: number
  risk_level: "LOW" | "MEDIUM" | "HIGH"
  risk_warning: string
  recommended_action: string
  business_impact: string
}

export interface MandorUser {
  name: string
  pin: string
}
