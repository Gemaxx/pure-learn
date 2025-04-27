// components/pomodoro/PomodoroSettings.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface PomodoroSettingsProps {
  onClose: () => void; 
  onSave: (settings: {
    studyTime: number;
    shortBreak: number;
    pomodoros: number;
    longBreak: number;
  }) => void;
  initialSettings?: {
    studyTime: number;
    shortBreak: number;
    pomodoros: number;
    longBreak: number;
  };
}

export default function PomodoroSettings({ 
  onClose, 
  onSave, 
  initialSettings = {
    studyTime: 25,
    shortBreak: 5,
    pomodoros: 4,
    longBreak: 15
  }
}: PomodoroSettingsProps) {
  const [studyTime, setStudyTime] = useState(initialSettings.studyTime);
  const [shortBreak, setShortBreak] = useState(initialSettings.shortBreak);
  const [pomodoros, setPomodoros] = useState(initialSettings.pomodoros);
  const [longBreak, setLongBreak] = useState(initialSettings.longBreak);

  useEffect(() => {
    setStudyTime(initialSettings.studyTime);
    setShortBreak(initialSettings.shortBreak);
    setPomodoros(initialSettings.pomodoros);
    setLongBreak(initialSettings.longBreak);
  }, [initialSettings]);

  const handleSave = () => {
    onSave({
      studyTime,
      shortBreak,
      pomodoros,
      longBreak
    });
  };

  // Generate options for minutes (1-180)
  const generateTimeOptions = () => {
    const options = [];
    for (let i = 1; i <= 180; i++) {
      options.push(
        <option key={i} value={i}>
          {i} Minutes
        </option>
      );
    }
    return options;
  };

  // Generate options for pomodoro count (1-10)
  const generatePomodoroOptions = () => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push(
        <option key={i} value={i}>
          {i} Pomodoros
        </option>
      );
    }
    return options;
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <button onClick={onClose} className="text-black mr-4" aria-label="Back to timer">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-medium">Pomodoro Settings</h1>
      </div>
      
      {/* Settings Form */}
      <div className="flex-1 px-6 pt-8 pb-8 space-y-8">
        {/* Study Session */}
        <div className="space-y-2">
          <label htmlFor="studyTime" className="block text-base font-medium">
            Study Session
          </label>
          <select
            id="studyTime"
            value={studyTime}
            onChange={(e) => setStudyTime(Number(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-md bg-white"
          >
            {generateTimeOptions()}
          </select>
        </div>
        
        {/* Short Break */}
        <div className="space-y-2">
          <label htmlFor="shortBreak" className="block text-base font-medium">
            Short Break
          </label>
          <select
            id="shortBreak"
            value={shortBreak}
            onChange={(e) => setShortBreak(Number(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-md bg-white"
          >
            {generateTimeOptions()}
          </select>
        </div>
        
        {/* Pomodoros */}
        <div className="space-y-2">
          <label htmlFor="pomodoros" className="block text-base font-medium">
            Pomodoros
          </label>
          <select
            id="pomodoros"
            value={pomodoros}
            onChange={(e) => setPomodoros(Number(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-md bg-white"
          >
            {generatePomodoroOptions()}
          </select>
        </div>
        
        {/* Long Break */}
        <div className="space-y-2">
          <label htmlFor="longBreak" className="block text-base font-medium">
            Long Break
          </label>
          <select
            id="longBreak"
            value={longBreak}
            onChange={(e) => setLongBreak(Number(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-md bg-white"
          >
            {generateTimeOptions()}
          </select>
        </div>
        
        {/* Save Button - Not fixed, matches dropdown width */}
        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-black text-white rounded-md font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}