"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCalendar } from "./calendar-context"

interface CalendarHeaderProps {
    view: "day" | "week" | "month"
    onViewChange: (view: "day" | "week" | "month") => void
}

export function CalendarHeader({ view, onViewChange }: CalendarHeaderProps) {
    const { currentDate, setCurrentDate } = useCalendar()

    const navigateToToday = () => {
        setCurrentDate(new Date())
    }

    const navigatePrevious = () => {
        const newDate = new Date(currentDate)
        
        if (view === "day") {
            newDate.setDate(newDate.getDate() - 1)
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() - 7)
        } else if (view === "month") {
            newDate.setMonth(newDate.getMonth() - 1)
        }
        
        setCurrentDate(newDate)
    }

    const navigateNext = () => {
        const newDate = new Date(currentDate)
        
        if (view === "day") {
            newDate.setDate(newDate.getDate() + 1)
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() + 7)
        } else if (view === "month") {
            newDate.setMonth(newDate.getMonth() + 1)
        }
        
        setCurrentDate(newDate)
    }

    const formatHeaderDate = () => {
        if (view === "day") {
            return currentDate.toLocaleDateString(undefined, {
                weekday: "long", 
                day: "numeric", 
                month: "long", 
                year: "numeric"
            })
        } else if (view === "week") {
            const weekStart = new Date(currentDate)
            const dayOfWeek = currentDate.getDay()
            const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Adjust for Sunday
            weekStart.setDate(diff)
            
            const weekEnd = new Date(weekStart)
            weekEnd.setDate(weekStart.getDate() + 6)
            
            return `${weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
        } else {
            return currentDate.toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
            })
        }
    }

    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={navigatePrevious}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={navigateNext}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <h1 className="text-xl font-semibold ml-2">{formatHeaderDate()}</h1>
                <Button variant="outline" className="ml-2" onClick={navigateToToday}>
                    Today
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex rounded-md overflow-hidden">
                    <Button
                        variant={view === "day" ? "default" : "outline"}
                        className="rounded-none"
                        onClick={() => onViewChange("day")}
                    >
                        Day
                    </Button>
                    <Button
                        variant={view === "week" ? "default" : "outline"}
                        className="rounded-none"
                        onClick={() => onViewChange("week")}
                    >
                        Week
                    </Button>
                    <Button
                        variant={view === "month" ? "default" : "outline"}
                        className="rounded-none"
                        onClick={() => onViewChange("month")}
                    >
                        Month
                    </Button>
                </div>
            </div>
        </header>
    )
}