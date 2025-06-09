"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function GoalPage() {
  const params = useParams()
  const router = useRouter()
  const goalId = params.id as string

  useEffect(() => {
    router.push(`/goals/${goalId}/resources`)
  }, [goalId, router])

  return null
}
