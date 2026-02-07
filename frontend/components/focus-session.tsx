"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  MoreHorizontal,
  Maximize2,
  RotateCcw,
} from "lucide-react";
import CircularProgress from "./circular-progress";
import NumericInput from "./numeric-input"; // استيراد الكمبوننت الجديد 👈

const FocusSession = () => {
  const [minutes, setMinutes] = useState(180);
  const [isActive, setIsActive] = useState(false);
  const [skipBreaks, setSkipBreaks] = useState(false);
  const [initialMinutes, setInitialMinutes] = useState(180);

  // --- Real-time Countdown Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && minutes > 0) {
      // تم تحسين الشرط لضمان التوقف عند 0
      interval = setInterval(() => {
        setMinutes((prev) => {
          const next = prev - 1;
          if (next === 0) {
            setIsActive(false);
          }
          return next;
        });
      }, 60000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes]);

  // --- Handlers ---
  const adjustTime = (amount: number) => {
    setMinutes((prev) => {
      const next = Math.max(1, Math.min(prev + amount, 360));
      setInitialMinutes(next);
      return next;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setMinutes(0);
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      const clamped = Math.max(0, Math.min(num, 360));
      setMinutes(clamped);
      setInitialMinutes(clamped);
    }
  };

  const handleInputBlur = () => {
    if (minutes < 1) {
      setMinutes(15);
      setInitialMinutes(15);
    }
  };

  const handleStart = () => {
    if (minutes > 0) {
      setInitialMinutes(minutes);
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
  };

  return (
    <div className="w-full min-w-[380px] max-w-[360px] min-h-[420px] bg-[#1c1c1c] text-white rounded-xl p-2 shadow-2xl border border-white/5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[13px] font-bold text-white/70 tracking-tight">
          Focus session
        </span>
        <div className="flex gap-0.5">
          <button className="p-2 hover:bg-white/5 rounded-md transition-colors text-white/30 hover:text-white">
            <Maximize2 size={14} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-md transition-colors text-white/30 hover:text-white">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col  items-center justify-center p-4">
        {!isActive && minutes === initialMinutes ? (
          /* SETUP MODE */
          <div className="w-full flex flex-col gap-3 items-center animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-xl font-bold  mb-1">Get ready to focus</h2>
            <p className="text-[12px] text-white/40 px-8 leading-relaxed text-center">
              We&apos;ll turn off notifications and app alerts. Longer sessions
              will include short breaks to recharge.
            </p>

            <div className="flex flex-row gap-4">
              <NumericInput
                value={minutes}
                onAdjust={adjustTime}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>

            <p className="text-[12px] font-bold text-white/40">
              You&apos;ll have{" "}
              <span className="text-white/70">
                {Math.floor(minutes / 30)} breaks
              </span>
            </p>

            {/* Checkbox logic ... (ممكن يتفصل هو كمان لاحقاً) */}
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <div
                onClick={() => setSkipBreaks(!skipBreaks)}
                className={`size-4 rounded-[4px] border flex items-center justify-center transition-all ${
                  skipBreaks
                    ? "bg-[#d4bd95] border-[#d4bd95]"
                    : "border-white/20 group-hover:border-white/40"
                }`}
              >
                {skipBreaks && (
                  <div className="size-1.5 bg-black rounded-[1px]" />
                )}
              </div>
              <span className="text-[13px] text-white/50 group-hover:text-white transition-colors">
                Skip breaks
              </span>
            </label>

            <button
              onClick={handleStart}
              className="flex items-center gap-2.5 bg-[#d4bd95] text-black px-3 py-2 rounded-lg font-bold hover:bg-[#c4ad85] transition-all active:scale-[0.98] shadow-lg text-[13px]"
            >
              <Play size={14} fill="black" />
              Start focus session
            </button>
          </div>
        ) : (
          /* ACTIVE TIMER MODE (ممكن نفصل الجزء ده برضه في Component لوحده) */
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
            <CircularProgress
              size={200}
              strokeWidth={4}
              value={initialMinutes - minutes }
              max={initialMinutes}
            >
              <div className="flex flex-col items-center justify-center translate-y-2 translate-x-[-2]">
                <span className="text-6xl font-extralight">
                  {minutes}
                </span>
                <span className="text-xs text-white/30  uppercase tracking-widest mt-1">
                  min
                </span>
              </div>
            </CircularProgress>

            <div className="flex items-center gap-4 mt-12">
              <button
                onClick={() => setIsActive(!isActive)}
                className="size-10 rounded-full bg-[#d4bd95] text-black flex items-center justify-center hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                {isActive ? (
                  <Pause size={20} fill="black" />
                ) : (
                  <Play size={20} fill="black" />
                )}
              </button>

              <button
                onClick={handleReset}
                className="size-10 rounded-full bg-white/[0.03] text-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white/60 border border-white/5 transition-all active:scale-95"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusSession;
