// app/calendar/page.tsx
"use client"

import { useState } from "react"
import { Calendar } from "@/components/calendar/calendar"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar"
import { CalendarProvider } from "@/components/calendar/calendar-context"

export default function CalendarPage() {
  const [view, setView] = useState<"day" | "week" | "month">("month")

  return (
    <div className="flex flex-col h-screen bg-background">
      <CalendarProvider>
        <CalendarHeader view={view} onViewChange={setView} />
        <div className="flex flex-1 overflow-hidden">
          <CalendarSidebar />
          <Calendar view={view} />
        </div>
      </CalendarProvider>
    </div>
  )
}