"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Timer } from 'lucide-react';
import { usePomodoro } from '@/contexts/pomodoro-context';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function PomodoroIndicator() {
  const { state, getFormattedTime } = usePomodoro();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { currentTaskId, currentGoalId, mode } = state;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentTaskId) {
    return null;
  }

  const getModeLabel = () => {
    switch (mode) {
      case 'work':
        return 'Work';
      case 'short-break':
        return 'Break';
      case 'long-break':
        return 'Long Break';
      default:
        return 'Work';
    }
  };

  const getModeColor = () => {
    switch (mode) {
      case 'work':
        return 'text-red-500';
      case 'short-break':
        return 'text-green-500';
      case 'long-break':
        return 'text-blue-500';
      default:
        return 'text-red-500';
    }
  };

  const handleClick = () => {
    if (currentTaskId && currentGoalId) {
      router.push(`/goals/${currentGoalId}/tasks/${currentTaskId}/pomodoro`);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="flex items-center gap-2 h-8 px-3 hover:bg-accent"
    >
      <Timer className={cn('h-4 w-4', getModeColor())} />
      <span className="font-mono text-sm font-medium">
        {getFormattedTime()}
      </span>
      <span className={cn('text-xs', getModeColor())}>
        {getModeLabel()}
      </span>
    </Button>
  );
} 