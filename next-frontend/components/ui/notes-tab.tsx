"use client";

import { useTheme } from "@/components/theme-provider";

export default function NotesTab() {
  const { theme } = useTheme();

  return (
    <div>
      <h2
        className={`text-xl font-medium mb-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Notes
      </h2>

      <div
        className={`p-4 rounded-lg ${
          theme === "dark" ? "bg-zinc-900" : "bg-white"
        }`}
      >
        <p
          className={`${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
        >
          No notes yet. Start adding notes for this goal.
        </p>
      </div>
    </div>
  );
}
