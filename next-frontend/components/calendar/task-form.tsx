"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { type CalendarTask, useCalendar } from "./calendar-context"

interface TaskFormProps {
    onClose: () => void
    existingTask?: CalendarTask
    initialDate?: Date
}

export function TaskForm({ onClose, existingTask, initialDate }: TaskFormProps) {
    const { addTask, updateTask } = useCalendar()
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endDate, setEndDate] = useState("")
    const [endTime, setEndTime] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [color, setColor] = useState("#4f46e5")

    // Helper function to format date to local ISO string
    const formatDateForInput = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Helper function to format time to HH:MM
    const formatTimeForInput = (date: Date): string => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    useEffect(() => {
        if (existingTask) {
            setTitle(existingTask.title)
            setStartDate(formatDateForInput(existingTask.start))
            setStartTime(formatTimeForInput(existingTask.start))
            setEndDate(formatDateForInput(existingTask.end))
            setEndTime(formatTimeForInput(existingTask.end))
            setDescription(existingTask.description || "")
            setLocation(existingTask.location || "")
            setColor(existingTask.color || "#4f46e5")
        } else if (initialDate) {
            const endDateTime = new Date(initialDate)
            endDateTime.setHours(endDateTime.getHours() + 1)

            setStartDate(formatDateForInput(initialDate))
            setStartTime(formatTimeForInput(initialDate))
            setEndDate(formatDateForInput(endDateTime))
            setEndTime(formatTimeForInput(endDateTime))
        } else {
            const now = new Date()
            const oneHourLater = new Date(now)
            oneHourLater.setHours(oneHourLater.getHours() + 1)

            setStartDate(formatDateForInput(now))
            setStartTime(formatTimeForInput(now))
            setEndDate(formatDateForInput(oneHourLater))
            setEndTime(formatTimeForInput(oneHourLater))
        }
    }, [existingTask, initialDate])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Create dates with the selected date and time
        // Note: Using the direct constructor to avoid timezone issues
        const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const start = new Date(startYear, startMonth - 1, startDay, startHour, startMinute, 0);

        const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        const end = new Date(endYear, endMonth - 1, endDay, endHour, endMinute, 0);

        if (start >= end) {
            alert("End time must be after start time")
            return
        }

        const taskData = {
            title,
            start,
            end,
            description,
            location,
            color,
        }

        if (existingTask) {
            updateTask(existingTask.id, taskData)
        } else {
            addTask(taskData)
        }

        onClose()
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{existingTask ? "Edit Task" : "Add Task"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start-date">Start Date</Label>
                                <Input
                                    id="start-date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="start-time">Start Time</Label>
                                <Input
                                    id="start-time"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="end-date">End Date</Label>
                                <Input
                                    id="end-date"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Input
                                    id="end-time"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="color">Color</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="color"
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-12 h-8 p-1"
                                />
                                <span className="text-sm text-muted-foreground">Choose task color</span>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">{existingTask ? "Update" : "Create"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}