import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// 1. تعريف شكل الـ Props
interface NumericInputProps {
  value: number;
  onAdjust: (amount: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

// 2. تطبيق الـ Interface على الـ Component
export default function NumericInput({ 
  value, 
  onAdjust, 
  onChange, 
  onBlur 
}: NumericInputProps) {
  return (
    <div className="flex bg-[#2b2b2b] rounded-lg border border-white/5 overflow-hidden mb- focus-within:ring-1 focus-within:ring-[#d4bd95]/30">
      <div className="py-3 flex flex-col items-center border-r border-white/5">
        <input
          type="text"
          value={value === 0 ? "" : value}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-transparent text-4xl font-extralight tabular-nums text-center w-28 outline-none caret-[#d4bd95]"
        />
        <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]  mt-1">
          mins
        </span>
      </div>
      <div className="flex flex-col w-8 bg-white/[0.02]">
        <button
          onClick={() => onAdjust(15)}
          className="flex-1 flex items-center justify-center hover:bg-white/5 border-b border-white/5 transition-colors"
        >
          <ChevronUp size={20} className="text-white/20 hover:text-white" />
        </button>
        <button
          onClick={() => onAdjust(-15)}
          className="flex-1 flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          <ChevronDown size={20} className="text-white/20 hover:text-white" />
        </button>
      </div>
    </div>
  );
}