// app/components/calendar/calendar.tsx
"use client"

import { useCalendar } from "./calendar-context"
import { DayView } from "./day-view"
import { WeekView } from "./week-view"
import { MonthView } from "./month-view"

interface CalendarProps {
    view: "day" | "week" | "month"
}

export function Calendar({ view }: CalendarProps) {
    const { currentDate, tasks } = useCalendar()

    return (
        <div className="flex-1 overflow-auto">
            {view === "day" && <DayView date={currentDate} tasks={tasks} />}
            {view === "week" && <WeekView date={currentDate} tasks={tasks} />}
            {view === "month" && <MonthView date={currentDate} tasks={tasks} />}
        </div>
    )
}
