"use client"
import type { CalendarTask } from "./calendar-context"
import { TaskCard } from "./task-card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { TaskForm } from "./task-form"

interface WeekViewProps {
    date: Date
    tasks: CalendarTask[]
}

export function WeekView({ date, tasks }: WeekViewProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [selectedTime, setSelectedTime] = useState<Date | null>(null)

    // Calculate the start of the week (Monday)
    const getWeekDays = (date: Date) => {
        const currentDate = new Date(date)
        const day = currentDate.getDay() // 0 is Sunday, 1 is Monday, etc.
        const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday
        
        const weekStart = new Date(currentDate)
        weekStart.setDate(diff)
        
        // Generate array for all 7 days of the week
        return Array.from({ length: 7 }, (_, i) => {
            const day = new Date(weekStart)
            day.setDate(weekStart.getDate() + i)
            return day
        })
    }
    
    const days = getWeekDays(date)

    const getTaskPosition = (task: CalendarTask, day: Date) => {
        // Check if task is on this day
        if (task.start.toDateString() !== day.toDateString()) {
            return null
        }

        const startHour = task.start.getHours() + task.start.getMinutes() / 60
        const endHour = task.end.getHours() + task.end.getMinutes() / 60
        const duration = endHour - startHour

        return {
            top: `${startHour * 60}px`,
            height: `${duration * 60}px`,
        }
    }

    const isToday = (day: Date) => day.toDateString() === new Date().toDateString()

    const handleTimeSlotClick = (day: Date, hour: number) => {
        const newDate = new Date(day)
        newDate.setHours(hour, 0, 0, 0)
        setSelectedTime(newDate)
        setShowTaskForm(true)
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex border-b">
                <div className="w-16 flex-shrink-0"></div>
                {days.map((day, i) => (
                    <div key={i} className="flex-1 text-center py-2">
                        <div className="font-semibold">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                        <div
                            className={cn(
                                "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm",
                                isToday(day) && "bg-primary text-primary-foreground",
                            )}
                        >
                            {day.getDate()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-1 overflow-y-auto">
                <div className="w-16 flex-shrink-0 border-r">
                    {hours.map((hour) => (
                        <div
                            key={hour}
                            className="h-[60px] border-b text-xs text-muted-foreground flex items-start justify-end pr-2 pt-1"
                        >
                            {`${hour.toString().padStart(2, "0")}:00`}
                        </div>
                    ))}
                </div>

                <div className="flex flex-1">
                    {days.map((day, dayIndex) => (
                        <div key={dayIndex} className="flex-1 relative border-r">
                            {hours.map((hour) => (
                                <div
                                    key={hour}
                                    className="h-[60px] border-b border-dashed relative cursor-pointer bg-white hover:bg-gray-100 transition-colors"
                                    onClick={() => handleTimeSlotClick(day, hour)}
                                >
                                    <div className="absolute left-0 right-0 bottom-0 border-b border-solid"></div>
                                </div>
                            ))}

                            {/* Tasks */}
                            {tasks.map((task) => {
                                const position = getTaskPosition(task, day)
                                if (!position) return null

                                return (
                                    <div key={task.id} className="absolute left-1 right-1 rounded-md overflow-hidden" style={position}>
                                        <TaskCard task={task} compact />
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {showTaskForm && selectedTime && (
                <TaskForm onClose={() => setShowTaskForm(false)} initialDate={selectedTime} />
            )}
        </div>
    )
}