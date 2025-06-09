"use client";

import type React from "react";

import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { X } from "lucide-react";
import type { ResourceType } from "@/types";

interface ResourceTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resourceType: ResourceType) => void;
  activeColumn: string | null;
}

export default function ResourceTypeModal({
  isOpen,
  onClose,
  onSubmit,
}: ResourceTypeModalProps) {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !units.trim()) return;

    const newResourceType: ResourceType = {
      id: Date.now().toString(),
      name,
      units,
      resources: [],
    };

    onSubmit(newResourceType);
    setName("");
    setUnits("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-md p-6 rounded-lg ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Create Resource Type
          </h2>
          <button onClick={onClose}>
            <X
              className={`h-5 w-5 ${
                theme === "dark" ? "text-zinc-400" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className={`block ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } mb-2`}
            >
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 100))}
                placeholder="Type Name ex. YouTube Video, Book..."
                className={`w-full px-3 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
                } border`}
              />
              <span
                className={`absolute right-2 bottom-2 text-xs ${
                  theme === "dark" ? "text-zinc-500" : "text-gray-500"
                }`}
              >
                {name.length}/100
              </span>
            </div>
          </div>

          <div className="mb-8">
            <label
              htmlFor="units"
              className={`block ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } mb-2`}
            >
              Units
            </label>
            <div className="relative">
              <input
                id="units"
                value={units}
                onChange={(e) => setUnits(e.target.value.slice(0, 100))}
                placeholder="ex. Hours, Chapters..."
                className={`w-full px-3 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
                } border`}
              />
              <span
                className={`absolute right-2 bottom-2 text-xs ${
                  theme === "dark" ? "text-zinc-500" : "text-gray-500"
                }`}
              >
                {units.length}/100
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                theme === "dark"
                  ? "bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              } border`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md ${
                theme === "dark"
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
