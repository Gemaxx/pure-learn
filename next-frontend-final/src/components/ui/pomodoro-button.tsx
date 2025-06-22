"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { usePomodoro } from '@/contexts/pomodoro-context';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PomodoroButtonProps {
  taskId: string;
  goalId: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function PomodoroButton({ 
  taskId, 
  goalId, 
  className,
  size = 'sm' 
}: PomodoroButtonProps) {
  const { state, startPomodoro, pausePomodoro, resumePomodoro } = usePomodoro();
  const router = useRouter();

  const isActiveTask = state.currentTaskId === taskId;
  const isRunning = state.isRunning && isActiveTask;

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
  };

  const handleClick = () => {
    if (isActiveTask) {
      // If this is the active task, toggle play/pause
      if (isRunning) {
        pausePomodoro();
      } else {
        resumePomodoro();
      }
    } else {
      // If this is a different task, start a new Pomodoro
      startPomodoro(taskId, goalId);
      // Navigate to the Pomodoro page
      router.push(`/goals/${goalId}/tasks/${taskId}/pomodoro`);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={cn(
        sizeClasses[size],
        'hover:scale-110 transition-transform',
        isActiveTask && 'text-primary',
        className
      )}
    >
      {isRunning ? (
        <Pause className={iconSizes[size]} />
      ) : (
        <Play className={cn(iconSizes[size], 'ml-0.5')} />
      )}
    </Button>
  );
} 