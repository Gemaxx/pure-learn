// app/components/calendar/day-view.tsx
"use client"
import type { CalendarTask } from "./calendar-context"
import { TaskCard } from "./task-card"
import { useState } from "react"
import { TaskForm } from "./task-form"

interface DayViewProps {
    date: Date
    tasks: CalendarTask[]
}

export function DayView({ date, tasks }: DayViewProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const dayTasks = tasks.filter((task) => task.start.toDateString() === date.toDateString() || task.end.toDateString() === date.toDateString())
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [selectedTime, setSelectedTime] = useState<Date | null>(null)

    const getTaskPosition = (task: CalendarTask) => {
        const startHour = task.start.getHours() + task.start.getMinutes() / 60
        const endHour = task.end.getHours() + task.end.getMinutes() / 60
        const duration = endHour - startHour

        return {
            top: `${startHour * 60}px`,
            height: `${duration * 60}px`,
        }
    }

    const handleTimeSlotClick = (hour: number) => {
        const newDate = new Date(date)
        newDate.setHours(hour, 0, 0, 0)
        setSelectedTime(newDate)
        setShowTaskForm(true)
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex border-b py-2 px-4">
                <div className="w-16"></div>
                <div className="flex-1 text-center">
                    <div className="font-semibold">{date.toLocaleDateString(undefined, { weekday: 'long' })}</div>
                    <div className="text-sm text-muted-foreground">{date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
            </div>

            <div className="flex flex-1 overflow-y-auto">
                <div className="w-16 flex-shrink-0 border-r">
                    {hours.map((hour) => (
                        <div
                            key={hour}
                            className="h-[60px] border-b text-xs text-muted-foreground flex items-start justify-end pr-2 pt-1"
                        >
                            {`${hour.toString().padStart(2, '0')}:00`}
                        </div>
                    ))}
                </div>

                <div className="flex-1 relative">
                    {hours.map((hour) => (
                        <div
                            key={hour}
                            className="h-[60px] border-b border-dashed relative cursor-pointer bg-white hover:bg-gray-100 transition-colors"
                            onClick={() => handleTimeSlotClick(hour)}
                        >
                            <div className="absolute left-0 right-0 bottom-0 border-b border-solid"></div>
                        </div>
                    ))}

                    {/* Tasks */}
                    {dayTasks.map((task) => (
                        <div
                            key={task.id}
                            className="absolute left-1 right-1 rounded-md overflow-hidden"
                            style={getTaskPosition(task)}
                        >
                            <TaskCard task={task} />
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
