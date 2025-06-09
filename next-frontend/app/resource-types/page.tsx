"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export default function ResourceTypesPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-zinc-950" : "bg-gray-100"
      } p-6`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Resource Types
          </h1>
          <Link href="/resource-types/new">
            <Button
              className={`${
                theme === "dark"
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Create New
            </Button>
          </Link>
        </div>

        <div
          className={`${
            theme === "dark" ? "bg-zinc-900" : "bg-white"
          } rounded-lg p-4 shadow-md`}
        >
          <p
            className={`${
              theme === "dark" ? "text-zinc-400" : "text-gray-500"
            }`}
          >
            No resource types found. Create your first one!
          </p>
        </div>
      </div>
    </div>
  );
}
