"use client"
import { useRouter } from "next/navigation"
import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Briefcase, UserCheck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-clients"


export default function SignUpPage() {
   const router = useRouter()
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "candidate", // 'candidate' (Job Seeker) | 'employer'
    agreeToTerms: false,
  })

  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  // Handle standard input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Handle account type selection
  const handleAccountTypeChange = (type: "candidate" | "employer") => {
    setFormData((prev) => ({
      ...prev,
      accountType: type,
    }))
  }

  // Event handler that collects form data on submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data, error } = await authClient.signUp.email({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    })

    if (error) {
      toast.error(error.message || "Failed to create account")
      return
    }

    toast.success("Account created successfully!")
    router.push("/")
  }

  // Google sign up click handler
  const handleGoogleSignUp = () => {
    console.log("Google Sign-Up Triggered")
    // TODO: Integrate social sign-in:
    // await authClient.signIn.social({ provider: "google" })
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#161618]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all">
      {/* Page Toggle Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-white/4 border border-white/10 mb-6">
        <Link
          href="/sign-in"
          className="flex items-center justify-center py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white transition-all"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="flex items-center justify-center py-2 text-sm font-semibold rounded-lg bg-white/10 text-white shadow-sm transition-all"
        >
          Sign Up
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Create your account</h1>
        <p className="text-sm text-zinc-400 mt-1.5">
          Join HireLoop to find your dream role or hire top talent
        </p>
      </div>

      {/* Google Sign Up */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignUp}
        className="w-full h-10 border-white/10 bg-white/3 hover:bg-white/8 text-white flex items-center justify-center gap-2.5 rounded-xl transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span className="text-sm font-medium">Continue with Google</span>
      </Button>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="border-t border-white/10 w-full" />
        <span className="absolute bg-[#161618] px-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">
          or register with email
        </span>
      </div>

      {/* Account Type Selection */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
          I want to
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleAccountTypeChange("candidate")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-medium transition-all cursor-pointer",
              formData.accountType === "candidate"
                ? "border-[#7A72FF] bg-[#7A72FF]/10 text-white shadow-sm"
                : "border-white/10 bg-white/2 text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <UserCheck className="h-4 w-4" />
            <span>Find a Job</span>
          </button>
          <button
            type="button"
            onClick={() => handleAccountTypeChange("employer")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-medium transition-all cursor-pointer",
              formData.accountType === "employer"
                ? "border-[#7A72FF] bg-[#7A72FF]/10 text-white shadow-sm"
                : "border-white/10 bg-white/2 text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Briefcase className="h-4 w-4" />
            <span>Hire Talent</span>
          </button>
        </div>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-medium text-zinc-300">
            Full Name
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <User className="h-4 w-4" />
            </div>
            <Input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Sarah Connor"
              value={formData.name}
              onChange={handleChange}
              className="h-10 pl-9 rounded-xl border-white/10 bg-white/3 text-white placeholder:text-zinc-500 focus-visible:border-[#7A72FF] focus-visible:ring-[#7A72FF]/30"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="block text-xs font-medium text-zinc-300">
            Work or personal email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Mail className="h-4 w-4" />
            </div>
            <Input
              id="signup-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-10 pl-9 rounded-xl border-white/10 bg-white/3 text-white placeholder:text-zinc-500 focus-visible:border-[#7A72FF] focus-visible:ring-[#7A72FF]/30"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="signup-password" className="block text-xs font-medium text-zinc-300">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Create a strong password (min 8 chars)"
              value={formData.password}
              onChange={handleChange}
              className="h-10 pl-9 pr-10 rounded-xl border-white/10 bg-white/3 text-white placeholder:text-zinc-500 focus-visible:border-[#7A72FF] focus-visible:ring-[#7A72FF]/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-xs font-medium text-zinc-300">
            Confirm Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="h-10 pl-9 pr-10 rounded-xl border-white/10 bg-white/3 text-white placeholder:text-zinc-500 focus-visible:border-[#7A72FF] focus-visible:ring-[#7A72FF]/30"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Agree to terms */}
        <div className="flex items-start gap-2 pt-1">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            required
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#7A72FF] accent-[#7A72FF] focus:ring-[#7A72FF]/50"
          />
          <label htmlFor="agreeToTerms" className="text-xs text-zinc-400 select-none cursor-pointer leading-relaxed">
            I agree to the{" "}
            <Link href="/terms" className="text-zinc-300 underline hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-zinc-300 underline hover:text-white">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 mt-3 rounded-xl bg-[#7A72FF] hover:bg-[#6D65F6] text-white font-medium flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(122,114,255,0.35)] transition-all cursor-pointer"
        >
          <span>Create Account</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Bottom Toggle Link */}
      <div className="mt-6 text-center text-xs text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#8B85FF] hover:text-[#A5A0FF] hover:underline transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
