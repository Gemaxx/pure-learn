"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChromeIcon as Google } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { SignUpForm } from "@/components/auth/signup-form"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
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
      <div className="flex flex-col items-center min-h-[calc(100vh-3.5rem)] p-4 md:p-8">
        <div className="max-w-md w-full mx-auto mt-12 md:mt-24 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Unlock your Learning Potential</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              PureLearn iamework that provides learners with all tools, utilities and best practices they
              need to achieve their learning goals.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-full py-6 h-12 bg-secondary rounded-lg"></div>
            <div className="w-full h-10 bg-secondary rounded-lg"></div>
            <div className="w-full h-10 bg-secondary rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-3.5rem)] p-4 md:p-8">
      <div className="max-w-md w-full mx-auto mt-12 md:mt-24 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Unlock your Learning Potential</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            PureLearn is a Learning Framework that provides learners with all tools, utilities and best practices they
            need to achieve their learning goals.
          </p>
        </div>

        <div className="space-y-4">
          <Button className="w-full py-6" variant="outline">
            <Google className="mr-2 h-5 w-5" />
            Get Started With Google
          </Button>

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
      </div>

      <Modal isOpen={isSignUpModalOpen} onClose={closeModals} title="Sign Up">
        <SignUpForm onSuccess={closeModals} onCancel={closeModals} />
      </Modal>

      <Modal isOpen={isLoginModalOpen} onClose={closeModals} title="Log In">
        <LoginForm onSuccess={closeModals} onCancel={closeModals} />
      </Modal>
    </div>
  )
}
