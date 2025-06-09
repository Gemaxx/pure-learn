"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";

interface ResourceTypeFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function ResourceTypeForm({
  onCancel,
  onSuccess,
}: ResourceTypeFormProps) {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !units.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/resource-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, units }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create resource type");
      }

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full max-w-md mx-auto ${
        theme === "dark" ? "bg-black" : "bg-white"
      } p-6 rounded-lg shadow-lg`}
    >
      <h1
        className={`text-xl font-semibold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        } mb-6`}
      >
        Create Resource Type
      </h1>

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
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 100))}
              placeholder="Type Name ex. YouTube Video, Book..."
              className={`${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
              }`}
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
            <Input
              id="units"
              value={units}
              onChange={(e) => setUnits(e.target.value.slice(0, 100))}
              placeholder="ex. Hours, Chapters..."
              className={`${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
              }`}
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

        {error && (
          <div
            className={`mb-4 p-2 rounded text-sm ${
              theme === "dark"
                ? "bg-red-900/30 border border-red-900 text-red-200"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {error}
          </div>
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className={`${
              theme === "dark"
                ? "bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`${
              theme === "dark"
                ? "bg-white text-black hover:bg-zinc-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
