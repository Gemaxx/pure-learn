"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Pencil, Trash2 } from "lucide-react"
import { useCalendar, type CalendarTask } from "./calendar-context"
import { useState } from "react"
import { TaskForm } from "./task-form"
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

export function CalendarSidebar() {
    const { tasks, deleteTask } = useCalendar()
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [editingTask, setEditingTask] = useState<CalendarTask | null>(null)
    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)
    
    // Get today and tomorrow dates for filtering
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const dayAfterTomorrow = new Date(today)
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

    // Format date to display
    const formatTaskDate = (task: CalendarTask) => {
        const taskDate = new Date(task.start)
        const isToday = taskDate.toDateString() === today.toDateString()
        const isTomorrow = taskDate.toDateString() === tomorrow.toDateString()
        
        if (isToday) {
            return `Today, ${taskDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
        } else if (isTomorrow) {
            return `Tomorrow, ${taskDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
        } else {
            return `${taskDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}, ${taskDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
        }
    }

    // Handle delete task
    const handleDeleteClick = (taskId: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setDeletingTaskId(taskId)
    }

    const handleDeleteConfirm = () => {
        if (deletingTaskId) {
            deleteTask(deletingTaskId)
            setDeletingTaskId(null)
        }
    }

    // Handle edit task
    const handleEditTask = (task: CalendarTask, e: React.MouseEvent) => {
        e.stopPropagation()
        setEditingTask(task)
        setShowTaskForm(true)
    }

    const handleTaskClick = (task: CalendarTask) => {
        setEditingTask(task)
        setShowTaskForm(true)
    }

    // Filter upcoming tasks (next 7 days)
    const upcomingTasks = tasks
        .filter(task => {
            const taskDate = new Date(task.start)
            const sevenDaysFromNow = new Date(today)
            sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
            
            return taskDate >= today && taskDate < sevenDaysFromNow
        })
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .slice(0, 5) // Show only 5 upcoming tasks

    return (
        <div className="w-64 border-r p-4 bg-background">
            <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-sm">Upcoming Tasks</p>
            </div>
            
            <ScrollArea className="h-[calc(100vh-8rem)]">
                {upcomingTasks.length > 0 ? (
                    <div className="space-y-2">
                        {upcomingTasks.map(task => (
                            <div 
                                key={task.id} 
                                className="p-2 rounded hover:bg-muted/70 cursor-pointer relative group"
                                style={{ borderLeft: `4px solid ${task.color || "#4f46e5"}` }}
                                onClick={() => handleTaskClick(task)}
                            >
                                <p className="font-medium">{task.title}</p>
                                <p className="text-xs text-muted-foreground">{formatTaskDate(task)}</p>
                                {task.location && (
                                    <p className="text-xs mt-1 text-muted-foreground">📍 {task.location}</p>
                                )}
                                
                                {/* Action buttons with icons */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-1">
                                    <button 
                                        className="p-1 rounded hover:bg-muted transition-colors"
                                        onClick={(e) => handleEditTask(task, e)}
                                    >
                                        <Pencil className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                                    </button>
                                    <button 
                                        className="p-1 rounded hover:bg-muted transition-colors"
                                        onClick={(e) => handleDeleteClick(task.id, e)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-sm text-muted-foreground py-4">
                        No upcoming tasks
                    </div>
                )}
                <Separator className="my-4" />
            </ScrollArea>
            
            {showTaskForm && <TaskForm 
                onClose={() => {
                    setShowTaskForm(false)
                    setEditingTask(null)
                }} 
                existingTask={editingTask || undefined} 
            />}

            <AlertDialog open={!!deletingTaskId} onOpenChange={(open) => !open && setDeletingTaskId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Task</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this task? This action cannot be undone.
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
        </div>
    )
}