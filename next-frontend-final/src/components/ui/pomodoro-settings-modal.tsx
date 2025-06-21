"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePomodoro, type PomodoroSettings } from '@/contexts/pomodoro-context';

// Helper to generate number ranges for select options
const generateOptions = (start: number, end: number, step: number) => {
  const options = [];
  for (let i = start; i <= end; i += step) {
    options.push({ value: i.toString(), label: `${i} min` });
  }
  return options;
};

const workOptions = generateOptions(5, 120, 5);
const breakOptions = generateOptions(5, 60, 5);
const sessionOptions = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

export function PomodoroSettingsModal({ isOpen, onClose }: {isOpen: boolean, onClose: () => void}) {
  const { state, updateSettings } = usePomodoro();
  const [settings, setSettings] = useState<PomodoroSettings>(state.settings);

  useEffect(() => {
    if (isOpen) {
      setSettings(state.settings);
    }
  }, [isOpen, state.settings]);

  const handleSave = () => {
    updateSettings(settings);
    onClose();
  };

  const handleValueChange = (field: keyof PomodoroSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: parseInt(value, 10),
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pomodoro Settings"
      className="max-w-md"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="workMinutes">Work Duration</Label>
            <Select
              value={settings.workMinutes.toString()}
              onValueChange={(value) => handleValueChange('workMinutes', value)}
            >
              <SelectTrigger id="workMinutes">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {workOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortBreakMinutes">Short Break</Label>
            <Select
              value={settings.shortBreakMinutes.toString()}
              onValueChange={(value) => handleValueChange('shortBreakMinutes', value)}
            >
              <SelectTrigger id="shortBreakMinutes">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {breakOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="longBreakMinutes">Long Break</Label>
            <Select
              value={settings.longBreakMinutes.toString()}
              onValueChange={(value) => handleValueChange('longBreakMinutes', value)}
            >
              <SelectTrigger id="longBreakMinutes">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {breakOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionsBeforeLongBreak">Sessions before Long Break</Label>
             <Select
              value={settings.sessionsBeforeLongBreak.toString()}
              onValueChange={(value) => handleValueChange('sessionsBeforeLongBreak', value)}
            >
              <SelectTrigger id="sessionsBeforeLongBreak">
                <SelectValue placeholder="Select sessions count" />
              </SelectTrigger>
              <SelectContent>
                {sessionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </Modal>
  );
} 