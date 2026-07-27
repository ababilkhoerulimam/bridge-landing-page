import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BRIDGE — Owner Dashboard",
  description: "Executive manufacturing analytics, OEE diagnostics, and Decision Intelligence",
}

export default function OwnerPage() {
  return (
    <main className="w-full h-screen bg-[#eef2f9] overflow-hidden">
      <iframe
        src="/prototype/owner.html"
        title="BRIDGE Owner Dashboard"
        className="w-full h-full border-0"
      />
    </main>
  )
}
