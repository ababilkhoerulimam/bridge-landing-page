import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "BRIDGE | Digitize Your Factory Floor",
  description:
    "Offline-first production intelligence for Indonesian building material SMEs. Eliminate paper logbooks, reduce 8-12% material waste.",
  keywords: [
    "bridge",
    "factory management",
    "offline logbook",
    "IKM digitalization",
    "mandor app",
    "production intelligence",
  ],
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <ClickSpark
          sparkColor="#3b82f6"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing="ease-out"
        >
          <LenisProvider>{children}</LenisProvider>
        </ClickSpark>
        <Analytics />
      </body>
    </html>
  )
}
