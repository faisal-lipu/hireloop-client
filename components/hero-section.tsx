"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  Building2,
  MapPin,
  RotateCw,
  Search,
  Star,
  UserSearch,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const trendingPositions = [
  "Product Designer",
  "AI engineering",
  "Dev-ops Engineer",
] as const

const stats = [
  {
    icon: RotateCw,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Building2,
    value: "12K",
    label: "Companies",
  },
  {
    icon: UserSearch,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
] as const

export function HeroSection() {
  const router = useRouter()
  const [jobTitle, setJobTitle] = React.useState("")
  const [location, setLocation] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (jobTitle.trim()) params.set("q", jobTitle.trim())
    if (location.trim()) params.set("location", location.trim())
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleTrendingClick = (position: string) => {
    setJobTitle(position)
  }

  return (
    <section className="relative overflow-hidden pt-6 pb-8 sm:pt-8 sm:pb-12 md:pt-10 md:pb-14">
      {/* Background Figma Starfield — authentic faint stars with zero purple wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
      >
        <Image
          src="/images/globe2.png"
          alt=""
          fill
          priority
          className="object-cover object-top opacity-85"
        />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        {/* Top Badge with Fading Hairline Accent Lines */}
        <div className="flex items-center justify-center gap-3">
          <div
            aria-hidden="true"
            className="hidden h-px w-16 bg-linear-to-r from-transparent via-white/20 to-white/5 sm:block md:w-28"
          />
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 sm:px-3.5 sm:py-1.5",
              "bg-[#161619]/90 backdrop-blur-md",
              "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.6)]"
            )}
          >
            <span className="flex size-4 items-center justify-center text-amber-500">
              <Briefcase className="size-3.5 fill-amber-500/25" />
            </span>
            <span className="text-xs font-semibold text-white">50,000+</span>
            <span className="text-[10px] font-semibold tracking-wider text-white/50 uppercase sm:text-[11px]">
              NEW JOBS THIS MONTH
            </span>
          </div>
          <div
            aria-hidden="true"
            className="hidden h-px w-16 bg-linear-to-l from-transparent via-white/20 to-white/5 sm:block md:w-28"
          />
        </div>

        {/* Main Headline */}
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.15]">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="mt-2.5 max-w-xl text-pretty text-xs text-neutral-400 sm:mt-3 sm:text-sm md:text-base leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Responsive Search Bar Form */}
        <form
          onSubmit={handleSearch}
          className={cn(
            "mt-5 w-full max-w-2xl rounded-2xl border border-white/10 p-1.5 sm:mt-6 sm:p-2",
            "bg-[#121214]/90 backdrop-blur-md",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_45px_-12px_rgba(0,0,0,0.8)]",
            "transition-all duration-200 focus-within:border-white/20 focus-within:shadow-[0_20px_45px_-10px_rgba(99,102,241,0.25)]"
          )}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* Input: Job title */}
            <div className="flex flex-1 items-center gap-2.5 px-3 py-1 sm:py-0">
              <Search
                aria-hidden="true"
                className="size-5 shrink-0 text-white/50"
              />
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job title, skill or company"
                aria-label="Job title, skill or company"
                className="w-full bg-transparent text-sm text-white placeholder:text-neutral-400 focus:outline-none"
              />
            </div>

            {/* Desktop Hairline Divider */}
            <div
              aria-hidden="true"
              className="hidden h-6 w-px bg-white/15 sm:block mx-1"
            />
            {/* Mobile Divider */}
            <div
              aria-hidden="true"
              className="h-px w-full bg-white/5 sm:hidden"
            />

            {/* Input: Location */}
            <div className="flex flex-1 items-center gap-2.5 px-3 py-1 sm:py-0">
              <MapPin
                aria-hidden="true"
                className="size-5 shrink-0 text-white/50"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or Remote"
                aria-label="Location or Remote"
                className="w-full bg-transparent text-sm text-white placeholder:text-neutral-400 focus:outline-none"
              />
            </div>

            {/* Submit Button — Rounded Squircle */}
            <Button
              type="submit"
              size="icon"
              aria-label="Search jobs"
              className={cn(
                "size-10 shrink-0 rounded-xl sm:size-11 sm:rounded-2xl",
                "bg-linear-to-br from-[#606bf6] to-[#7154f8]",
                "shadow-[0_0_20px_rgba(96,107,246,0.5)] transition-all duration-200",
                "hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(96,107,246,0.7)] active:scale-95",
                "text-white"
              )}
            >
              <Search className="size-5" />
            </Button>
          </div>
        </form>

        {/* Trending Positions */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:mt-3.5">
          <span className="font-normal text-white/50">Trending Position</span>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {trendingPositions.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => handleTrendingClick(pos)}
                className={cn(
                  "rounded-full border border-white/10 bg-white/4 px-3 py-0.5 text-xs text-white/70 sm:py-1",
                  "transition-all duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white",
                  "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                )}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Social Proof Text on Globe */}
        <div className="relative z-10 mx-auto mt-14 max-w-xl px-4 text-center sm:mt-20 md:mt-24">
          <p className="text-base font-normal tracking-tight text-white/80 sm:text-lg md:text-xl">
            Assisting over{" "}
            <span className="font-semibold text-white">
              15,000 job seekers
            </span>
            <br />
            find their dream positions.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="relative z-20 mt-8 w-full max-w-5xl sm:mt-10 md:mt-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className={cn(
                    "group flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-left",
                    "border border-white/10 bg-[#0e0e13]/90 backdrop-blur-md",
                    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_16px_36px_-8px_rgba(0,0,0,0.85)]",
                    "min-h-33.75 sm:min-h-36.25",
                    "transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-[#121218]/95"
                  )}
                >
                  {/* Top Icon */}
                  <div className="flex items-center text-white/55 transition-colors group-hover:text-white">
                    <Icon className="size-4.5 sm:size-5" />
                  </div>

                  {/* Stat Value & Label */}
                  <div className="mt-4 sm:mt-5">
                    <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-normal text-white/50 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
