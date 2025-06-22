"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChromeIcon as Google } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { SignUpForm } from "@/components/auth/signup-form"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function HomePageClient() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const closeModals = () => {
    setIsSignUpModalOpen(false)
    setIsLoginModalOpen(false)
  }

  // During SSR or before hydration, render a simpler version
  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="w-full py-6 h-12 bg-secondary rounded-lg"></div>
        <div className="w-full h-10 bg-secondary rounded-lg"></div>
        <div className="w-full h-10 bg-secondary rounded-lg"></div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">

        <Button className="w-full" onClick={() => setIsSignUpModalOpen(true)}>
          Sign Up
        </Button>

        <Button className="w-full" variant="secondary" onClick={() => setIsLoginModalOpen(true)}>
          Log In
        </Button>

        <div className="text-center">
          <a href="#features" className="text-sm hover:underline">
            Explore Features
          </a>
        </div>
      </div>

      <Modal isOpen={isSignUpModalOpen} onClose={closeModals} title="Sign Up">
        <SignUpForm onSuccess={closeModals} onCancel={closeModals} />
      </Modal>

      <Modal isOpen={isLoginModalOpen} onClose={closeModals} title="Log In">
        <LoginForm onSuccess={closeModals} onCancel={closeModals} />
      </Modal>
    </>
  )
} 