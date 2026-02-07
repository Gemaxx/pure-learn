import React from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  size: number;
  strokeWidth: number;
  children?: React.ReactNode;
  color?: string;
}

const CircularProgress = ({ 
  value, 
  max, 
  size, 
  strokeWidth, 
  children, 
  color = "#d4bd95" 
}: CircularProgressProps) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Ensure percentage stays between 0-100 and handle max=0 cases
  const safeMax = max <= 0 ? 1 : max;
  const percentage = Math.min(Math.max((value / safeMax) * 100, 0), 100);
  
  // Calculate offset - Note: we use (1 - percentage/100) to show progress correctly
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      className="relative flex items-center justify-center transition-transform duration-500 ease-out" 
      style={{ width: size, height: size }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="-rotate-90 drop-shadow-[0_0_8px_rgba(212,189,149,0.15)]"
      >
        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth={strokeWidth}
        />
        
        {/* Active Progress Bar */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>

      {/* Center Content Slot */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
        {children}
      </div>
    </div>
  );
};

export default CircularProgress;