import { cn } from "@/lib/utils";
import { ChevronRight, Clock } from "lucide-react";

export default function TaskItem({
  icon,
  title,
  time,
  active = false,
}: {
  icon: string;
  title: string;
  time: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg transition-all border group cursor-pointer",
        active
          ? "bg-[#252525] border-[#d4bd95]/40 shadow-xl"
          : "bg-transparent border-transparent hover:bg-white/5",
      )}
    >
      <div
        className={cn(
          "size-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
          active ? "border-[#d4bd95] bg-[#d4bd95]/10" : "border-white/20",
        )}
      >
        {active && <div className="size-2.5 bg-[#d4bd95] rounded-full" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xl shrink-0">{icon}</span>
          <div className="flex flex-col truncate">
            <span
              className={cn(
                "text-sm font-semibold truncate",
                active ? "text-white" : "text-white/70",
              )}
            >
              {title}
            </span>
            <span className="text-[11px] text-white/30 flex items-center gap-1.5 mt-0.5">
              <Clock className="size-3" /> {time}
            </span>
          </div>
        </div>
      </div>
      <ChevronRight
        className={cn(
          "size-4 text-white/20 transition-transform group-hover:translate-x-1",
          active && "text-[#d4bd95] opacity-100",
        )}
      />
    </div>
  );
}