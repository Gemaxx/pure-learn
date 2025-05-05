"use client"

import type React from "react"

import { type CalendarTask, useCalendar } from "./calendar-context"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { TaskForm } from "./task-form"
import { Pencil, Trash2 } from "lucide-react"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"

interface TaskCardProps {
    task: CalendarTask
    compact?: boolean
}

export function TaskCard({ task, compact = false }: TaskCardProps) {
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const { deleteTask } = useCalendar()

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowTaskForm(true)
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowTaskForm(true)
    }

    const handleDeleteConfirm = () => {
        deleteTask(task.id)
        setShowDeleteDialog(false)
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowDeleteDialog(true)
    }

    return (
        <>
            <div
                className={cn("p-2 text-white overflow-hidden cursor-pointer relative group", compact && "p-1 text-xs")}
                style={{ backgroundColor: task.color || "#4f46e5" }}
                onClick={handleClick}
            >
                <div className="font-medium">{task.title}</div>
                {!compact && (
                    <>
                        <div className="text-xs opacity-90">
                            {task.start.toLocaleString()} - {task.end.toLocaleString()}
                        </div>
                        {task.location && <div className="text-xs mt-1 opacity-90">{task.location}</div>}
                    </>
                )}
                
                {/* Edit and Delete buttons */}
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex space-x-1">
                    <button 
                        className="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-all"
                        onClick={handleEdit}
                    >
                        <Pencil className="h-3 w-3 text-white" />
                    </button>
                    <button 
                        className="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-all"
                        onClick={handleDeleteClick}
                    >
                        <Trash2 className="h-3 w-3 text-white" />
                    </button>
                </div>
            </div>

            {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} existingTask={task} />}
            
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Task</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{task.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}