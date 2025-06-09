// app/categories/[categoryId]/goals/[goalId]/tasks/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import { useTasks } from '@/lib/hooks/useTasks';
import { Play, Plus, Pause, Clock } from 'lucide-react';
import { Task } from '@/lib/types/task';
import PomodoroTimer from '@/components/pomodoro/PomodoroTimer';
import CategoriesList from '@/components/Sidebare/catygoryList';
import ResourceCards from '@/components/LearningResource/ResoursesCards';

// Main Tasks Page Component
function TasksPage() {
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks(1);
  
  // State to track if timer is running in background
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Add state for current timer value
  const [currentTime, setCurrentTime] = useState("25:00");
  const [timerType, setTimerType] = useState("Focus");
  
  const [stats, setStats] = useState({
    estimatedTime: 0,
    tasksToComplete: 0,
    elapsedTime: 0,
    completedTasks: 0
  });

  useEffect(() => {
    if (tasks) {
      const completedTasks = tasks.filter(task => task.completed).length;
      const tasksToComplete = tasks.length - completedTasks;
      
      // In a real app, you'd calculate these values based on task data
      setStats({
        estimatedTime: 120, // Example: 120 minutes
        tasksToComplete,
        elapsedTime: 45, // Example: 45 minutes
        completedTasks
      });
    }
  }, [tasks]);

  const togglePomodoro = () => {
    setShowPomodoro(!showPomodoro);
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    await addTask(taskData);
    setIsFormOpen(false);
  };

  const handleUpdateTask = async (taskId: number, taskData: Partial<Task>) => {
    await updateTask(taskId, taskData);
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId);
  };

  // Handle timer status updates
  const handleTimerStatusChange = (isActive: boolean) => {
    setIsTimerActive(isActive);
  };
  
  // Handle timer close
  const handleTimerClose = () => {
    // Keep the timer running in the background
    setShowPomodoro(false);
  };
  
  // Handle timer updates - new function
  const handleTimerUpdate = (timeString: string, type: string) => {
    setCurrentTime(timeString);
    setTimerType(type);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl relative min-h-screen pb-24">
      {/* Always render PomodoroTimer but conditionally show it */}
      <div >
        <PomodoroTimer 
          onClose={handleTimerClose} 
          onStatusChange={handleTimerStatusChange}
          onTimerUpdate={handleTimerUpdate}
        />
      </div>
      
      {!showPomodoro && (
        <>
          <h1 className="text-2xl font-medium mb-2">Tasks</h1>
          
          {/* Task List */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : tasks && tasks.length > 0 ? (
            <TaskList 
              tasks={tasks} 
              onEditTask={handleEditTask}
              onUpdateTask={handleUpdateTask} 
              onDeleteTask={handleDeleteTask}
            />
          ) : (
            <div className="text-center py-16 text-gray-500">
              No tasks found. Create a task to get started.
            </div>
          )}
          
          {/* Task Form for editing or creating */}
          {isFormOpen && (
            <TaskForm 
              isEditing={!!editingTask}
              taskId={editingTask?.id || null}
              goalId={1}
              onCreateTask={handleCreateTask}
              onUpdateTask={handleUpdateTask}
              onClose={() => {
                setIsFormOpen(false);
                setEditingTask(null);
              }}
            />
          )}
          
          {/* Add Task Button */}
          <div className="fixed bottom-16 right-6 hidden">
            <button 
              onClick={() => {
                setEditingTask(null);
                setIsFormOpen(true);
              }}
              className="bg-blue-500 text-white rounded-full flex items-center justify-center p-4 shadow-lg"
            >
              <Plus size={24} />
            </button>
          </div>
          
          {/* Fixed Pomodoro Button - Show with indicator if timer is active but without the white rectangle */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 hidden">
            <button 
              onClick={togglePomodoro}
              className={`text-white rounded-full flex items-center justify-center px-4 py-3 shadow-lg ${
                isTimerActive ? 'bg-red-500' : 'bg-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                {isTimerActive ? (
                  <>
                    <Pause size={20} />
                    <span className="font-medium text-sm">{currentTime}</span>
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    <span className="font-medium text-sm ml-1">Start Timer</span>
                  </>
                )}
              </div>
            </button>
          </div>
          
        </>
      )}
    </div>
  );
}

// Make sure to export the component
export default TasksPage;