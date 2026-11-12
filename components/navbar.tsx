"use client"

import * as React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils"

const navLinks = [
  {
    title: "Browse Jobs",
    href: "/jobs",
  },
  {
    title: "Company",
    href: "/company",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
] as const

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        {/* Floating pill navbar — charcoal surface, hairline top highlight, soft drop */}
        <nav
          className={cn(
            "mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 rounded-xl",
            "border border-white/10 bg-[#222224] pr-2 pl-3 sm:pr-3 sm:pl-4",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_12px_32px_-12px_rgba(0,0,0,0.7)]",
            "backdrop-blur supports-backdrop-filter:bg-[#222224]/95"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="HireLoop home"
            className="flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={154}
              height={44}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-lg px-3 text-sm transition-colors outline-none select-none",
                      "focus-visible:ring-2 focus-visible:ring-ring/50",
                      active
                        ? "bg-white/6 font-semibold text-white"
                        : "font-medium text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-1.5 md:flex">
            <span
              aria-hidden
              className="mx-1.5 h-4 w-px bg-white/20 block"
            />
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              render={<Link href="/sign-in" />}
              className="text-white/80 hover:bg-white/10 hover:text-white"
            >
              Sign In
            </Button>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/sign-up" />}
              className="shadow-[0_0_0_1px_rgba(122,114,255,0.45),0_0_18px_rgba(122,114,255,0.3)]"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Open navigation menu"
                  className="text-white/80 hover:bg-white/10 hover:text-white md:hidden"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-white/10 bg-[#1c1c1e] text-white"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    aria-label="HireLoop home"
                    onClick={() => setOpen(false)}
                  >
                    <Image
                      src="/images/logo.png"
                      alt="HireLoop"
                      width={154}
                      height={44}
                      className="h-8 w-auto"
                    />
                  </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  HireLoop navigation menu
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1 px-3">
                  {navLinks.map((link) => {
                    const active = pathname.startsWith(link.href)
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex h-10 items-center rounded-lg px-3 text-sm transition-colors outline-none select-none",
                            active
                              ? "bg-white/8 font-semibold text-white"
                              : "font-medium text-white/70 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {link.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <SheetFooter className="mt-2 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="lg"
                    nativeButton={false}
                    render={<Link href="/sign-in" />}
                    onClick={() => setOpen(false)}
                    className="justify-start text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={<Link href="/sign-up" />}
                    onClick={() => setOpen(false)}
                    className="shadow-[0_0_0_1px_rgba(122,114,255,0.45),0_0_18px_rgba(122,114,255,0.3)]"
                  >
                    Get Started
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
