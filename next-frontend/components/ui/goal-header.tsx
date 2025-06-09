"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import Link from "next/link";

type TabType = "resources" | "tasks" | "notes" | "about";

interface GoalHeaderProps {
  title: string;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function GoalHeader({
  title,
  activeTab,
  onTabChange,
}: GoalHeaderProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-white text-black"
      } sticky top-0 z-10 shadow-sm`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Link href="/goals">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-medium">{title}</h1>
        </div>
        <button>
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="flex border-b border-zinc-800">
        {["resources", "tasks", "notes", "about"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === tab
                ? theme === "dark"
                  ? "text-white border-b-2 border-white"
                  : "text-black border-b-2 border-black"
                : theme === "dark"
                ? "text-zinc-400"
                : "text-gray-500"
            }`}
            onClick={() => onTabChange(tab as TabType)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
