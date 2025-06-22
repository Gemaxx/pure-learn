"use client";

import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { usePomodoro } from '@/contexts/pomodoro-context';

export default function TestSSRPage() {
  const { user, isAuthenticated } = useAuth();
  const { state } = usePomodoro();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">SSR Test Page</h1>
      
      <div className="space-y-4">
        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-semibold">✅ SSR Test Results:</h2>
          <p>If you can see this page, SSR is working correctly!</p>
        </div>

        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-semibold">Auth Context:</h2>
          <p>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>User: {user ? user.name : 'None'}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="font-semibold">Pomodoro Context:</h2>
          <p>Is Running: {state.isRunning ? 'Yes' : 'No'}</p>
          <p>Current Task: {state.currentTaskId || 'None'}</p>
          <p>Mode: {state.mode}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded">
          <h2 className="font-semibold">Navigation:</h2>
          <a href="/" className="text-blue-600 hover:underline">Go to Home Page</a>
        </div>
      </div>
    </div>
  );
} 