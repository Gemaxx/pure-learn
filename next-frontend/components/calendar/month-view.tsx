"use client"

import type { CalendarTask } from "./calendar-context"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { TaskForm } from "./task-form"
import { TaskCard } from "./task-card"

interface MonthViewProps {
    date: Date
    tasks: CalendarTask[]
}

export function MonthView({ date, tasks }: MonthViewProps) {
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    // Get the first day of the month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    
    // Get the last day of the month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    
    // Get the day of the week for the first day (0 for Sunday, 1 for Monday, etc.)
    // We adjust it to make Monday the first day of the week
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7
    
    // Total days to display (including days from previous and next months to fill the grid)
    const totalDays = 42 // 6 rows of 7 days
    
    // Generate all days for the month view
    const days: { date: Date; isCurrentMonth: boolean }[] = []
    
    // Add days from previous month
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = new Date(date.getFullYear(), date.getMonth() - 1, prevMonthLastDay - i)
        days.push({ date: day, isCurrentMonth: false })
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = new Date(date.getFullYear(), date.getMonth(), i)
        days.push({ date: day, isCurrentMonth: true })
    }
    
    // Add days from next month to fill the grid
    const remainingDays = totalDays - days.length
    for (let i = 1; i <= remainingDays; i++) {
        const day = new Date(date.getFullYear(), date.getMonth() + 1, i)
        days.push({ date: day, isCurrentMonth: false })
    }
    
    // Group days into rows (6 rows of 7 days)
    const rows: { date: Date; isCurrentMonth: boolean }[][] = []
    for (let i = 0; i < days.length; i += 7) {
        rows.push(days.slice(i, i + 7))
    }

    // Check if a date is today
    const isToday = (day: Date) => day.toDateString() === new Date().toDateString()

    // Get tasks for a specific day
    const getTasksForDay = (day: Date) => {
        return tasks.filter(task => 
            task.start.toDateString() === day.toDateString() || 
            task.end.toDateString() === day.toDateString()
        )
    }

    const handleDayClick = (date: Date) => {
        const newDate = new Date(date)
        setSelectedDate(newDate)
        setShowTaskForm(true)
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-7 text-center py-2 border-b">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="font-semibold">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 h-full">
                {rows.flat().map((day, i) => {
                    const dayTasks = getTasksForDay(day.date)
                    
                    return (
                        <div
                            key={i}
                            className={cn(
                                "min-h-[100px] p-1 border-b border-r cursor-pointer transition-colors",
                                day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                                !day.isCurrentMonth && "text-gray-400",
                                "hover:bg-gray-100",
                                isToday(day.date) && "bg-blue-50"
                            )}
                            onClick={() => handleDayClick(day.date)}
                        >
                            <div className={cn(
                                "text-right p-1",
                                isToday(day.date) && "font-bold"
                            )}>
                                {day.date.getDate()}
                            </div>
                            <div className="space-y-1 mt-1">
                                {dayTasks.slice(0, 3).map((task) => (
                                    <div
                                        key={task.id}
                                        className="text-xs p-1 rounded truncate"
                                        style={{
                                            backgroundColor: task.color || "#4f46e5",
                                            color: "white",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedDate(day.date)
                                            // Open task form with existing task
                                        }}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                                {dayTasks.length > 3 && (
                                    <div className="text-xs text-muted-foreground text-center">
                                        +{dayTasks.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {showTaskForm && selectedDate && (
                <TaskForm onClose={() => setShowTaskForm(false)} initialDate={selectedDate} />
            )}
        </div>
    )
}