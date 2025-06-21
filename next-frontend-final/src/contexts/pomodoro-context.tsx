"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type PomodoroMode = 'work' | 'short-break' | 'long-break';

export interface PomodoroSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}

export interface PomodoroState {
  currentTaskId: string | null;
  currentGoalId: string | null;
  isRunning: boolean;
  mode: PomodoroMode;
  remainingTime: number; // in seconds
  startTime: number | null; // timestamp in ms
  sessionCount: number;
  settings: PomodoroSettings;
}

interface PomodoroContextType {
  state: PomodoroState;
  startPomodoro: (taskId: string, goalId: string) => void;
  pausePomodoro: () => void;
  resumePomodoro: () => void;
  stopPomodoro: () => void;
  restartPomodoro: () => void;
  updateSettings: (settings: Partial<PomodoroSettings>) => void;
  getFormattedTime: () => string;
  getProgress: () => number;
}

const defaultSettings: PomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

const defaultState: PomodoroState = {
  currentTaskId: null,
  currentGoalId: null,
  isRunning: false,
  mode: 'work',
  remainingTime: defaultSettings.workMinutes * 60,
  startTime: null,
  sessionCount: 0,
  settings: defaultSettings,
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PomodoroState>(defaultState);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side before accessing localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load state from localStorage on mount (only on client side)
  useEffect(() => {
    if (!mounted) return;

    const savedState = localStorage.getItem('pomodoro-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Calculate remaining time based on start time
        if (parsedState.isRunning && parsedState.startTime) {
          const elapsed = Math.floor((Date.now() - parsedState.startTime) / 1000);
          const newRemainingTime = Math.max(0, parsedState.remainingTime - elapsed);
          
          setState({
            ...parsedState,
            remainingTime: newRemainingTime,
            isRunning: newRemainingTime > 0,
          });
        } else {
          setState(parsedState);
        }
      } catch (error) {
        console.error('Failed to parse pomodoro state from localStorage:', error);
      }
    }
  }, [mounted]);

  // Save state to localStorage whenever it changes (only on client side)
  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem('pomodoro-state', JSON.stringify(state));
  }, [state, mounted]);

  // Timer effect
  useEffect(() => {
    if (!mounted) return;
    
    let interval: NodeJS.Timeout | null = null;

    if (state.isRunning && state.remainingTime > 0) {
      interval = setInterval(() => {
        setState(prev => {
          const newRemainingTime = prev.remainingTime - 1;
          
          if (newRemainingTime <= 0) {
            // Timer finished, move to next mode
            return handleTimerComplete(prev);
          }
          
          return {
            ...prev,
            remainingTime: newRemainingTime,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isRunning, state.remainingTime, mounted]);

  const handleTimerComplete = (currentState: PomodoroState): PomodoroState => {
    const { mode, sessionCount, settings } = currentState;
    
    if (mode === 'work') {
      const newSessionCount = sessionCount + 1;
      const shouldTakeLongBreak = newSessionCount > 0 && newSessionCount % settings.sessionsBeforeLongBreak === 0;
      
      const nextMode = shouldTakeLongBreak ? 'long-break' : 'short-break';
      const nextDuration = shouldTakeLongBreak 
        ? settings.longBreakMinutes * 60 
        : settings.shortBreakMinutes * 60;

      return {
        ...currentState,
        isRunning: true,
        mode: nextMode,
        remainingTime: nextDuration,
        sessionCount: newSessionCount,
        startTime: Date.now(),
      };
    } else {
      // Break finished, start next work session
      return {
        ...currentState,
        isRunning: true,
        mode: 'work',
        remainingTime: settings.workMinutes * 60,
        startTime: Date.now(),
      };
    }
  };

  const startPomodoro = useCallback((taskId: string, goalId: string) => {
    setState(prev => ({
      ...prev,
      currentTaskId: taskId,
      currentGoalId: goalId,
      isRunning: true,
      mode: 'work',
      remainingTime: prev.settings.workMinutes * 60,
      startTime: Date.now(),
      sessionCount: 0,
    }));
  }, []);

  const pausePomodoro = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: false,
      startTime: null,
    }));
  }, []);

  const resumePomodoro = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: true,
      startTime: Date.now(),
    }));
  }, []);

  const stopPomodoro = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: false,
      currentTaskId: null,
      currentGoalId: null,
      mode: 'work',
      remainingTime: prev.settings.workMinutes * 60,
      startTime: null,
      sessionCount: 0,
    }));
  }, []);

  const restartPomodoro = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: false,
      currentTaskId: null,
      currentGoalId: null,
      mode: 'work',
      remainingTime: prev.settings.workMinutes * 60,
      startTime: null,
      sessionCount: 0,
    }));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<PomodoroSettings>) => {
    setState(prev => {
      const updatedSettings = { ...prev.settings, ...newSettings };
      let newRemainingTime = prev.remainingTime;
      
      // Update remaining time if it's the current mode's duration
      if (prev.mode === 'work') {
        newRemainingTime = updatedSettings.workMinutes * 60;
      } else if (prev.mode === 'short-break') {
        newRemainingTime = updatedSettings.shortBreakMinutes * 60;
      } else if (prev.mode === 'long-break') {
        newRemainingTime = updatedSettings.longBreakMinutes * 60;
      }
      
      return {
        ...prev,
        settings: updatedSettings,
        remainingTime: newRemainingTime,
      };
    });
  }, []);

  const getFormattedTime = useCallback(() => {
    if (!mounted) return '00:00';
    
    const minutes = Math.floor(state.remainingTime / 60);
    const seconds = state.remainingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [state.remainingTime, mounted]);

  const getProgress = useCallback(() => {
    if (!mounted) return 0;
    
    const { mode, remainingTime, settings } = state;
    let totalTime: number;
    
    switch (mode) {
      case 'work':
        totalTime = settings.workMinutes * 60;
        break;
      case 'short-break':
        totalTime = settings.shortBreakMinutes * 60;
        break;
      case 'long-break':
        totalTime = settings.longBreakMinutes * 60;
        break;
      default:
        totalTime = settings.workMinutes * 60;
    }
    
    return ((totalTime - remainingTime) / totalTime) * 100;
  }, [state, mounted]);

  const value: PomodoroContextType = {
    state,
    startPomodoro,
    pausePomodoro,
    resumePomodoro,
    stopPomodoro,
    restartPomodoro,
    updateSettings,
    getFormattedTime,
    getProgress,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
} 
