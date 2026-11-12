import * as React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-[#070709] text-white antialiased selection:bg-indigo-500/30 selection:text-white">
 
      <main className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:py-12">
        {/* Ambient atmospheric glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-80 bg-linear-to-tr from-[#7A72FF]/15 via-[#6366F1]/10 to-transparent blur-[120px] rounded-full" />
          <div className="absolute bottom-10 right-1/4 w-87.5 h-62.5 bg-purple-500/5 blur-[100px] rounded-full" />
        </div>

        {/* Auth card container */}
        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  )
}
