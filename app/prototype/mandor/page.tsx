import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BRIDGE — Tablet Ops (Mandor)",
  description: "Offline-first tablet logbook and machine operator portal",
}

export default function MandorPage() {
  return (
    <main className="w-full h-screen bg-[#eef2f9] overflow-hidden">
      <iframe
        src="/prototype/Mandor.html"
        title="BRIDGE Tablet Ops (Mandor)"
        className="w-full h-full border-0"
      />
    </main>
  )
}
