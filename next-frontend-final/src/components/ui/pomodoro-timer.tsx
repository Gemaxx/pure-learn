"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { usePomodoro } from '@/contexts/pomodoro-context';
import { cn } from '@/lib/utils';

interface PomodoroTimerProps {
  className?: string;
  showControls?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PomodoroTimer({ 
  className, 
  showControls = true, 
  size = 'md' 
}: PomodoroTimerProps) {
  const {
    state,
    startPomodoro,
    pausePomodoro,
    resumePomodoro,
    restartPomodoro,
    getFormattedTime,
    getProgress,
  } = usePomodoro();

  const { isRunning, mode, sessionCount, settings } = state;

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  const strokeWidth = {
    sm: 4,
    md: 6,
    lg: 8,
  };

  const radius = {
    sm: 60,
    md: 90,
    lg: 120,
  };

  const currentRadius = radius[size];
  const currentStrokeWidth = strokeWidth[size];
  const circumference = 2 * Math.PI * currentRadius;
  const progress = getProgress();
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getModeColor = () => {
    switch (mode) {
      case 'work':
        return 'stroke-red-500';
      case 'short-break':
        return 'stroke-green-500';
      case 'long-break':
        return 'stroke-blue-500';
      default:
        return 'stroke-red-500';
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'work':
        return 'Work';
      case 'short-break':
        return 'Short Break';
      case 'long-break':
        return 'Long Break';
      default:
        return 'Work';
    }
  };

  const handlePlayPause = () => {
    if (!state.currentTaskId) return;
    
    if (isRunning) {
      pausePomodoro();
    } else {
      if (state.remainingTime === (settings.workMinutes * 60) && mode === 'work') {
        startPomodoro(state.currentTaskId);
      } else {
        resumePomodoro();
      }
    }
  };

  const handleRestart = () => {
    if (!state.currentTaskId) return;
    restartPomodoro();
  };

  return (
    <div className={cn('flex flex-col items-center space-y-6', className)}>
      {/* Timer Circle */}
      <div className={cn('relative', sizeClasses[size])}>
        {/* Background Circle */}
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${(currentRadius + currentStrokeWidth) * 2} ${(currentRadius + currentStrokeWidth) * 2}`}
        >
          <circle
            cx={currentRadius + currentStrokeWidth}
            cy={currentRadius + currentStrokeWidth}
            r={currentRadius}
            stroke="currentColor"
            strokeWidth={currentStrokeWidth}
            fill="none"
            className="text-muted/20"
          />
          
          {/* Progress Circle */}
          <circle
            cx={currentRadius + currentStrokeWidth}
            cy={currentRadius + currentStrokeWidth}
            r={currentRadius}
            stroke="currentColor"
            strokeWidth={currentStrokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              'transition-all duration-1000 ease-linear',
              getModeColor()
            )}
            style={{
              transformOrigin: 'center',
            }}
          />
        </svg>

        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className={cn(
              'font-mono font-bold tracking-wider',
              size === 'sm' && 'text-2xl',
              size === 'md' && 'text-4xl',
              size === 'lg' && 'text-6xl'
            )}>
              {getFormattedTime()}
            </div>
            <div className={cn(
              'text-sm font-medium mt-1',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base'
            )}>
              {getModeLabel()}
            </div>
            {mode === 'work' && (
              <div className={cn(
                'text-xs text-muted-foreground mt-1',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-xs',
                size === 'lg' && 'text-sm'
              )}>
                Session {sessionCount + 1}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRestart}
            className="h-10 w-10"
            disabled={!state.currentTaskId}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            onClick={handlePlayPause}
            className="h-12 w-12 rounded-full"
            disabled={!state.currentTaskId}
          >
            {isRunning ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
} 