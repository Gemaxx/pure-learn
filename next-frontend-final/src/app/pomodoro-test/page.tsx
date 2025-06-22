"use client";

import React, { useState } from 'react';
import { PomodoroTimer } from '@/components/ui/pomodoro-timer';
import { PomodoroSettingsModal } from '@/components/ui/pomodoro-settings-modal';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { usePomodoro } from '@/contexts/pomodoro-context';

export default function PomodoroTestPage() {
  const { state, startPomodoro, stopPomodoro } = usePomodoro();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleStartTest = () => {
    startPomodoro('test-task-1');
  };

  const handleStop = () => {
    stopPomodoro();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Pomodoro Timer Test</h1>
          <p className="text-muted-foreground mb-6">
            Test the Pomodoro timer functionality
          </p>
        </div>

        {/* Test Controls */}
        <div className="flex justify-center gap-4">
          <Button onClick={handleStartTest} disabled={state.isRunning}>
            Start Test Timer
          </Button>
          <Button onClick={handleStop} variant="outline" disabled={!state.isRunning}>
            Stop Timer
          </Button>
          <Button 
            onClick={() => setIsSettingsOpen(true)} 
            variant="outline"
            size="icon"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Timer State Info */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium mb-2">Timer State:</h3>
          <div className="text-sm space-y-1">
            <div>Current Task ID: {state.currentTaskId || 'None'}</div>
            <div>Is Running: {state.isRunning ? 'Yes' : 'No'}</div>
            <div>Mode: {state.mode}</div>
            <div>Session Count: {state.sessionCount}</div>
            <div>Remaining Time: {state.remainingTime}s</div>
          </div>
        </div>

        {/* Pomodoro Timer */}
        <div className="flex justify-center">
          <PomodoroTimer size="lg" />
        </div>

        {/* Settings Modal */}
        <PomodoroSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </div>
  );
} 