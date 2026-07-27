import { Submission, KilnStatusItem, DispatchedTask, MandorUser } from "@/types/bridge"

export const MANDOR_USERS: MandorUser[] = [
  { name: "Hadi", pin: "1234" },
  { name: "Budi", pin: "5678" },
  { name: "Samsul", pin: "9012" },
]

export const MANDOR_PINS: Record<string, string> = {
  Hadi: "1234",
  Budi: "5678",
  Samsul: "9012",
}

export const INITIAL_MACHINES = [
  {
    id: "m1",
    name: "Machine 1",
    temperature: 1150,
    clay: 50,
    feldspar: 25,
    quartz: 20,
    pusherSpeed: 35,
    batchCount: 120,
  },
  {
    id: "m2",
    name: "Machine 2",
    temperature: 1080,
    clay: 48,
    feldspar: 28,
    quartz: 22,
    pusherSpeed: 28,
    batchCount: 98,
  },
  {
    id: "m3",
    name: "Machine 3",
    temperature: 1250,
    clay: 55,
    feldspar: 22,
    quartz: 18,
    pusherSpeed: 42,
    batchCount: 145,
  },
]

export const INITIAL_KILNS: KilnStatusItem[] = [
  { machine: "Machine 1", temperature: 1150, pusherSpeed: 35, status: "normal" },
  { machine: "Machine 2", temperature: 1080, pusherSpeed: 28, status: "normal" },
  { machine: "Machine 3", temperature: 1250, pusherSpeed: 42, status: "normal" },
]

export const DEFAULT_TASKS: DispatchedTask[] = [
  {
    id: "def-1",
    date: "Hari Ini (26 Jul)",
    time: "08:00 WIB",
    task: "Pembersihan Nozzle Burner & Gas Filter Kiln B",
    status: "completed",
    tech: "Hadi",
  },
  {
    id: "def-2",
    date: "Besok (27 Jul)",
    time: "14:00 WIB",
    task: "Penggantian Pelumas Gearbox Pusher Speed Kiln A",
    status: "scheduled",
    tech: "Budi",
  },
  {
    id: "def-3",
    date: "Rabu (29 Jul)",
    time: "09:00 WIB",
    task: "Kalibrasi Sensor Thermocouple & Suhu Kiln C",
    status: "upcoming",
    tech: "Samsul",
  },
]

// Generate 30 days of historical data for initial seed
export function generateInitialSubmissions(): Submission[] {
  const submissions: Submission[] = []
  const mandors = ["Hadi", "Budi", "Samsul"]
  const shifts: Array<"Pagi" | "Siang" | "Malam"> = ["Pagi", "Siang", "Malam"]
  const baseDate = new Date("2026-07-26T00:00:00.000Z")

  let idCounter = 1

  for (let dayOffset = 30; dayOffset >= 0; dayOffset--) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() - dayOffset)
    const dateStr = date.toISOString().slice(0, 10)

    for (const shift of shifts) {
      for (const m of INITIAL_MACHINES) {
        const mandor = mandors[idCounter % mandors.length]
        const tempVar = (idCounter * 7) % 50 - 25
        const temp = m.temperature + tempVar
        const clay = Math.round((m.clay + ((idCounter % 5) - 2) * 0.5) * 10) / 10
        const feldspar = Math.round((m.feldspar + ((idCounter % 3) - 1) * 0.5) * 10) / 10
        const quartz = Math.round((m.quartz + ((idCounter % 4) - 2) * 0.5) * 10) / 10
        const speed = Math.round((m.pusherSpeed + ((idCounter % 6) - 3) * 0.8) * 10) / 10
        const batch = m.batchCount + ((idCounter % 15) - 7)

        let yieldScore = 90.0
        if (temp < 1100 || temp > 1250) {
          yieldScore -= Math.abs(temp - 1175) * 0.05
        }
        if (clay < 45 || clay > 55) {
          yieldScore -= Math.abs(clay - 50) * 0.4
        }
        yieldScore = Math.max(65.0, Math.min(97.8, Math.round(yieldScore * 10) / 10))

        submissions.push({
          id: m.id,
          name: m.name,
          shift,
          temperature: temp,
          clay,
          feldspar,
          quartz,
          pusherSpeed: speed,
          batchCount: batch,
          mandor,
          notes: idCounter % 6 === 0 ? "Fluktuasi suhu kiln minor" : "Semua parameter normal",
          timestamp: `${dateStr}T${shift === "Pagi" ? "08:00" : shift === "Siang" ? "16:00" : "23:00"}:00Z`,
          signed: true,
          actualQuality: yieldScore,
        })
        idCounter++
      }
    }
  }

  return submissions
}

// Generate 30 days shift statistics for chart
export function generateShiftChartData() {
  const days: Array<{
    date: string
    shift: string
    grade_a: number
    grade_b: number
    grade_c: number
  }> = []

  const baseDate = new Date("2026-07-26")
  for (let i = 29; i >= 0; i--) {
    const d = new Date(baseDate)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    for (const shift of ["Pagi", "Siang", "Malam"]) {
      const gradeA = Math.round((85 + Math.sin(i + (shift === "Pagi" ? 1 : 2)) * 8) * 10) / 10
      const gradeB = Math.round((10 + Math.cos(i) * 4) * 10) / 10
      const gradeC = Math.round(Math.max(1, 100 - gradeA - gradeB) * 10) / 10

      days.push({
        date: dateStr,
        shift,
        grade_a: gradeA,
        grade_b: gradeB,
        grade_c: gradeC,
      })
    }
  }
  return days
}
