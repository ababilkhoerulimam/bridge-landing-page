import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BRIDGE — Prototype System Launcher",
  description: "Industry Intelligence Platform Prototype Portal Launcher",
}

export default function PrototypePortalPage() {
  return (
    <main className="w-full h-screen bg-[#eef2f9] overflow-hidden">
      <iframe
        src="/prototype/index.html"
        title="BRIDGE Industry Intelligence Platform"
        className="w-full h-full border-0"
      />
    </main>
  )
}
