"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { X } from "lucide-react";
import type { ResourceType, Resource } from "@/types";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resource: Resource) => void;
  resourceTypes: ResourceType[];
  selectedResourceTypeId: string | null;
 
}

export default function ResourceModal({
  isOpen,
  onClose,
  onSubmit,
  resourceTypes,
  selectedResourceTypeId,
}: ResourceModalProps) {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [resourceTypeId, setResourceTypeId] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (selectedResourceTypeId) {
      setResourceTypeId(selectedResourceTypeId);
    } else if (resourceTypes.length > 0) {
      setResourceTypeId(resourceTypes[0].id);
    }
  }, [selectedResourceTypeId, resourceTypes]);

  if (!isOpen) return null;

  const selectedResourceType = resourceTypes.find(
    (rt) => rt.id === resourceTypeId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !resourceTypeId || total <= 0) return;

    const newResource: Resource = {
      id: Date.now().toString(),
      title,
      progress: 0,
      total,
      completed: 0,
      status: "not-started",
    };

    onSubmit(newResource);
    setTitle("");
    setTotal(0);
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
            Add Resource
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
          <div className="mb-4">
            <label
              htmlFor="title"
              className={`block ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } mb-2`}
            >
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resource title"
              className={`w-full px-3 py-2 rounded-md ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
              } border`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="resourceType"
              className={`block ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } mb-2`}
            >
              Resource Type
            </label>
            <select
              id="resourceType"
              value={resourceTypeId}
              onChange={(e) => setResourceTypeId(e.target.value)}
              className={`w-full px-3 py-2 rounded-md ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              } border`}
              disabled={!!selectedResourceTypeId}
            >
              {resourceTypes.map((rt) => (
                <option key={rt.id} value={rt.id}>
                  {rt.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="total"
              className={`block ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } mb-2`}
            >
              Total {selectedResourceType?.units || "Units"}
            </label>
            <input
              id="total"
              type="number"
              min="1"
              value={total || ""}
              onChange={(e) => setTotal(Number.parseInt(e.target.value) || 0)}
              placeholder={`Total ${selectedResourceType?.units || "units"}`}
              className={`w-full px-3 py-2 rounded-md ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
              } border`}
            />
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
