"use client";

import React from "react";
import { CheckCircle2, Plus, MoreHorizontal, Edit2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskItem from "@/components/task-item";
import FocusSession from "@/components/focus-session";
import TaskList from "@/components/task-list";
import StatItem from "@/components/ui/state-item";
import CircularProgress from "@/components/circular-progress";

export default function FocusPage() {
  const dailyGoalHours = 4;
  const currentProgressHours = 3;

  return (
    <div className="max-w-[1100px] p-4 md:p-6 bg-[#0c0c0c] text-foreground min-h-screen animate-in fade-in duration-700">
      <div className="flex fl gap-6 items-start">
        {/* Left Column: Timer & Tasks (Wider span for better balance) */}
        <div className="lg:col-span-6 space-y-4">
          <FocusSession />
          <TaskList />
        </div>

        {/* Right Column: Stats (Compact height) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-[#1c1c1c] border-none rounded-xl shadow-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-5 border-b border-white/5">
              <CardTitle className="text-xs font-bold text-white/60 uppercase tracking-widest">
                Daily progress
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-white/30 hover:text-white"
              >
                <Edit2 className="size-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-8 px-5">
              <div className="flex justify-between w-full items-center">
                <StatItem label="Yesterday" value="4" subLabel="hours" />

                <div className="relative group">
                  <CircularProgress
                    size={150}
                    strokeWidth={8}
                    value={currentProgressHours}
                    max={dailyGoalHours}
                  >
                    <div className="flex flex-col items-center justify-center translate-y-1">
                      <span className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em] mb-0.5">
                        Daily goal
                      </span>
                      <span className="text-4xl font-light text-white leading-none">
                        4
                      </span>
                      <span className="text-[10px] text-white/40 mt-1 font-medium">
                        hours
                      </span>
                    </div>
                  </CircularProgress>
                </div>

                <StatItem label="Streak" value="0" subLabel="days" />
              </div>
              <div className="w-full h-px bg-white/5 mt-8 mb-4" />
              <p className="text-[12px] text-white/30 font-medium">
                Completed:{" "}
                <span className="text-white/60 font-bold">0 minutes</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
