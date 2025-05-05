// app/components/calendar/calendar-context.tsx
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type CalendarContextType = {
    currentDate: Date
    setCurrentDate: (date: Date) => void
    tasks: CalendarTask[]
    addTask: (task: Omit<CalendarTask, "id">) => void
    updateTask: (id: string, task: Partial<CalendarTask>) => void
    deleteTask: (id: string) => void
}

export type CalendarTask = {
    id: string
    title: string
    start: Date
    end: Date
    description?: string
    location?: string
    color?: string
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined)

export function CalendarProvider({ children }: { children: React.ReactNode }) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [tasks, setTasks] = useState<CalendarTask[]>([])

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem("calendar-tasks")
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
                    ...task,
                    start: new Date(task.start),
                    end: new Date(task.end),
                }))
                setTasks(parsedTasks)
            } catch (error) {
                console.error("Failed to parse saved tasks:", error)
            }
        }
    }, [])

    // Save tasks to localStorage when they change
    useEffect(() => {
        localStorage.setItem("calendar-tasks", JSON.stringify(tasks))
    }, [tasks])

    const addTask = (task: Omit<CalendarTask, "id">) => {
        const newTask = {
            ...task,
            id: Math.random().toString(36).substring(2, 9),
        }
        setTasks((prev) => [...prev, newTask])
    }

    const updateTask = (id: string, updatedTask: Partial<CalendarTask>) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
    }

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    return (
        <CalendarContext.Provider
            value={{
                currentDate,
                setCurrentDate,
                tasks,
                addTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </CalendarContext.Provider>
    )
}

export function useCalendar() {
    const context = useContext(CalendarContext)
    if (context === undefined) {
        throw new Error("useCalendar must be used within a CalendarProvider")
    }
    return context
}
