import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#070709] text-white antialiased selection:bg-indigo-500/30 selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}
