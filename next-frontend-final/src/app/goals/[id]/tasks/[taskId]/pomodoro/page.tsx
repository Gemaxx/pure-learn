"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { PomodoroTimer } from '@/components/ui/pomodoro-timer';
import { PomodoroSettingsModal } from '@/components/ui/pomodoro-settings-modal';
import { usePomodoro } from '@/contexts/pomodoro-context';
import { useAuth } from '@/contexts/auth-context';
import { getTaskDetails, type Task } from '@/services/task-service';

export default function PomodoroPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { state, startPomodoro } = usePomodoro();
  
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const taskId = params.taskId as string;
  const goalId = params.id as string;

  useEffect(() => {
    const fetchTask = async () => {
      if (!user?.id || !taskId) return;

      setIsLoading(true);
      setError(null);

      try {
        const taskData = await getTaskDetails(user.id, taskId);
        setTask(taskData);
      } catch (err) {
        setError('Failed to load task details');
        console.error('Error fetching task:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [user?.id, taskId]);

  useEffect(() => {
    // Auto-start Pomodoro if not already running for this task
    if (task && state.currentTaskId !== taskId) {
      startPomodoro(taskId, goalId);
    }
  }, [task, taskId, goalId, state.currentTaskId, startPomodoro]);

  const handleBack = () => {
    router.push(`/goals/${goalId}/tasks`);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-6 w-32 bg-secondary rounded"></div>
            <div className="h-8 w-8 bg-secondary rounded"></div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-secondary rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="text-destructive">
            {error || 'Task not found'}
          </div>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tasks
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettingsClick}
          className="h-8 w-8"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Task Info */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
        <p className="text-muted-foreground">
          Focus on this task with the Pomodoro Technique
        </p>
      </div>

      {/* Pomodoro Timer */}
      <div className="flex justify-center">
        <PomodoroTimer size="lg" />
      </div>

      {/* Session Info */}
      <div className="text-center mt-8 space-y-2">
        <div className="text-sm text-muted-foreground">
          Current Session: {state.sessionCount + 1}
        </div>
        <div className="text-sm text-muted-foreground">
          {state.mode === 'work' && (
            <span>
              {state.sessionCount % state.settings.sessionsBeforeLongBreak === 0
                ? 'Long break next'
                : `${state.settings.sessionsBeforeLongBreak - (state.sessionCount % state.settings.sessionsBeforeLongBreak)} sessions until long break`}
            </span>
          )}
          {state.mode === 'short-break' && 'Short break - rest and recharge'}
          {state.mode === 'long-break' && 'Long break - take a well-deserved rest'}
        </div>
      </div>

      {/* Settings Modal */}
      <PomodoroSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
} 