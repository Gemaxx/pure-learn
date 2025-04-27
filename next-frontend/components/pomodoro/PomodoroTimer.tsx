// components/pomodoro/PomodoroTimer.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Settings, Pause, RefreshCcw, Play } from 'lucide-react';
import PomodoroSettings from './PomodoroSettings';

interface PomodoroTimerProps {
  onClose: () => void;
  onStatusChange?: (isActive: boolean) => void; // Notify parent of timer status
  onTimerUpdate?: (timeString: string, type: string) => void; // New prop to update timer display
}

export default function PomodoroTimer({ onClose, onStatusChange, onTimerUpdate }: PomodoroTimerProps) {
  // Timer settings (minutes)
  const [studyTime, setStudyTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [pomodoroCount, setPomodoroCount] = useState(4);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(studyTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef(studyTime * 60);

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Get current timer type label
  const getCurrentTimerType = () => {
    if (!isBreak) return "Focus";
    return completedPomodoros % pomodoroCount === 0 ? "Long Break" : "Short Break";
  };

  // Calculate progress percentage for circle
  const calculateProgress = () => {
    const total = isBreak 
      ? (completedPomodoros % pomodoroCount === 0 ? longBreak : shortBreak) * 60
      : studyTime * 60;
    return ((total - timeLeft) / total) * 100;
  };

  // Update initial time ref when settings change
  useEffect(() => {
    if (!isActive && !isPaused) {
      if (!isBreak) {
        setTimeLeft(studyTime * 60);
        initialTimeRef.current = studyTime * 60;
      } else if (completedPomodoros % pomodoroCount === 0) {
        setTimeLeft(longBreak * 60);
        initialTimeRef.current = longBreak * 60;
      } else {
        setTimeLeft(shortBreak * 60);
        initialTimeRef.current = shortBreak * 60;
      }
    }
  }, [studyTime, shortBreak, longBreak, pomodoroCount, isBreak, completedPomodoros, isActive, isPaused]);

  // Notify parent component about timer status changes
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(isActive && !isPaused);
    }
  }, [isActive, isPaused, onStatusChange]);

  // Send timer updates to parent component
  useEffect(() => {
    if (onTimerUpdate) {
      onTimerUpdate(formatTime(), getCurrentTimerType());
    }
  }, [timeLeft, isBreak, completedPomodoros]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer logic
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set up the timer if active
    if (isActive && !isPaused && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      try {
        const beep = new Audio('/notification.mp3');
        beep.play().catch(e => console.log('Audio play failed', e));
      } catch (error) {
        console.error('Error playing sound', error);
      }
      
      // Switch between pomodoro and break
      if (!isBreak) {
        // Pomodoro completed
        const newCount = completedPomodoros + 1;
        setCompletedPomodoros(newCount);
        
        // Determine if it's time for a long break
        if (newCount % pomodoroCount === 0) {
          setTimeLeft(longBreak * 60);
          initialTimeRef.current = longBreak * 60;
        } else {
          setTimeLeft(shortBreak * 60);
          initialTimeRef.current = shortBreak * 60;
        }
        setIsBreak(true);
      } else {
        // Break completed
        setTimeLeft(studyTime * 60);
        initialTimeRef.current = studyTime * 60;
        setIsBreak(false);
      }
      
      // Automatically start the next timer
      setIsActive(true);
      setIsPaused(false);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, isPaused, timeLeft, isBreak, completedPomodoros, studyTime, shortBreak, longBreak, pomodoroCount]);

  // Handle button clicks
  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const continueTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(initialTimeRef.current);
  };

  // Toggle settings visibility
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Handle settings update
  const updateSettings = (settings: {
    studyTime: number;
    shortBreak: number;
    pomodoros: number;
    longBreak: number;
  }) => {
    setStudyTime(settings.studyTime);
    setShortBreak(settings.shortBreak);
    setLongBreak(settings.longBreak);
    setPomodoroCount(settings.pomodoros);
    
    // Update timer display only if not active or paused
    if (!isActive && !isPaused) {
      if (!isBreak) {
        setTimeLeft(settings.studyTime * 60);
        initialTimeRef.current = settings.studyTime * 60;
      } else if (completedPomodoros % settings.pomodoros === 0) {
        setTimeLeft(settings.longBreak * 60);
        initialTimeRef.current = settings.longBreak * 60;
      } else {
        setTimeLeft(settings.shortBreak * 60);
        initialTimeRef.current = settings.shortBreak * 60;
      }
    }
    
    setShowSettings(false);
  };

  if (showSettings) {
    return (
      <PomodoroSettings
        onClose={() => setShowSettings(false)}
        onSave={updateSettings}
        initialSettings={{
          studyTime,
          shortBreak,
          pomodoros: pomodoroCount,
          longBreak
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header section */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-medium">Pomodoro Timer</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSettings} 
            className="p-2"
            aria-label="Settings"
          >
            <Settings size={24} />
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
      
      {/* Timer section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Session type indicator */}
        <div className="mb-4 text-lg font-medium">
          {getCurrentTimerType()}
        </div>
        
        {/* Timer display */}
        <div className="relative w-48 h-48 mb-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl font-bold">
              {formatTime()}
            </div>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="mt-8">
          {!isActive && !isPaused ? (
            <button
              onClick={startTimer}
              className="px-12 py-3 rounded-full bg-red-500 text-white text-xl font-medium hover:bg-red-600"
            >
              Start
            </button>
          ) : isPaused ? (
            <div className="flex space-x-4">
              <button
                onClick={continueTimer}
                className="px-6 py-3 rounded-full bg-green-500 text-white text-lg font-medium hover:bg-green-600 flex items-center"
              >
                <Play size={20} className="mr-2" /> Continue
              </button>
              <button
                onClick={resetTimer}
                className="px-6 py-3 rounded-full bg-blue-500 text-white text-lg font-medium hover:bg-blue-600 flex items-center"
              >
                <RefreshCcw size={20} className="mr-2" /> Reset
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={pauseTimer}
                className="px-6 py-3 rounded-full bg-gray-500 text-white text-lg font-medium hover:bg-gray-600 flex items-center"
              >
                <Pause size={20} className="mr-2" /> Stop
              </button>
              <button
                onClick={resetTimer}
                className="px-6 py-3 rounded-full bg-blue-500 text-white text-lg font-medium hover:bg-blue-600 flex items-center"
              >
                <RefreshCcw size={20} className="mr-2" /> Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}