"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Plus, Tag, ExternalLink, MoreVertical } from "lucide-react";
import ResourceTypeModal from "@/components/resource-type-modal";
import ResourceModal from "@/components/resource-modal";
import type { ResourceType, Resource } from "@/types";
import ProgressBar from "@/components/progress-bar";

interface ResourcesTabProps {
  resourceTypes: ResourceType[];
  onAddResourceType: (resourceType: ResourceType) => void;
  onAddResource: (resourceTypeId: string, resource: Resource) => void;
}

export default function ResourcesTab({
  resourceTypes,
  onAddResourceType,
  onAddResource,
}: ResourcesTabProps) {
  const { theme } = useTheme();
  const [isResourceTypeModalOpen, setIsResourceTypeModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [selectedResourceTypeId, setSelectedResourceTypeId] = useState<
    string | null
  >(null);
  const [isColumnOptionsOpen, setIsColumnOptionsOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const handleAddResource = () => {
    setIsResourceModalOpen(true);
  };

  const handleAddResourceType = () => {
    setIsResourceTypeModalOpen(true);
  };

  const handleResourceTypeSubmit = (resourceType: ResourceType) => {
    onAddResourceType(resourceType);
    setIsResourceTypeModalOpen(false);
  };

  const handleResourceSubmit = (resource: Resource) => {
    if (selectedResourceTypeId) {
      onAddResource(selectedResourceTypeId, resource);
      setIsResourceModalOpen(false);
      setSelectedResourceTypeId(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className={`${
            theme === "dark" ? "bg-zinc-900" : "bg-white"
          } rounded-lg p-4`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Not-Started <span className="text-sm">2</span>
            </h2>
            <button
              onClick={() => {
                setActiveColumn("not-started");
                setIsResourceTypeModalOpen(true);
              }}
              className={`h-8 w-8 flex items-center justify-center rounded-full ${
                theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-gray-100"
              }`}
            >
              <MoreVertical
                className={`h-4 w-4 ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-500"
                }`}
              />
            </button>
          </div>

          <button
            onClick={handleAddResource}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md mb-4 ${
              theme === "dark"
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Plus className="h-4 w-4" /> Add Resource
          </button>

          {resourceTypes.map((resourceType) => (
            <div key={resourceType.id}>
              {resourceType.resources
                .filter((resource) => resource.status === "not-started")
                .map((resource) => (
                  <div
                    key={resource.id}
                    className={`mb-4 p-3 rounded-md ${
                      theme === "dark" ? "bg-zinc-800" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3
                        className={`text-sm font-medium ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        {resource.title}
                      </h3>
                      <button
                        className={
                          theme === "dark" ? "text-zinc-400" : "text-gray-500"
                        }
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <Tag
                        className={`h-3 w-3 ${
                          theme === "dark" ? "text-zinc-500" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          theme === "dark" ? "text-zinc-400" : "text-gray-500"
                        }`}
                      >
                        {resourceType.name}
                      </span>
                    </div>

                    <ProgressBar progress={resource.progress} theme={theme} />

                    <div className="flex justify-between items-center mt-1">
                      <span
                        className={`text-xs ${
                          theme === "dark" ? "text-zinc-400" : "text-gray-500"
                        }`}
                      >
                        {resource.completed}/{resource.total}{" "}
                        {resourceType.units}
                      </span>
                      <button>
                        <ExternalLink
                          className={`h-4 w-4 ${
                            theme === "dark" ? "text-zinc-400" : "text-gray-500"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div
          className={`${
            theme === "dark" ? "bg-zinc-900" : "bg-white"
          } rounded-lg p-4`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              In-Progress <span className="text-sm">5</span>
            </h2>
            <button
              onClick={() => {
                setActiveColumn("in-progress");
                setIsResourceTypeModalOpen(true);
              }}
              className={`h-8 w-8 flex items-center justify-center rounded-full ${
                theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-gray-100"
              }`}
            >
              <MoreVertical
                className={`h-4 w-4 ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-500"
                }`}
              />
            </button>
          </div>

          <button
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md mb-4 ${
              theme === "dark"
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Plus className="h-4 w-4" /> Add Resourse
          </button>

          {/* Task items would go here */}
        </div>

        <div
          className={`${
            theme === "dark" ? "bg-zinc-900" : "bg-white"
          } rounded-lg p-4`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Done <span className="text-sm">2</span>
            </h2>
            <button
              onClick={() => {
                setActiveColumn("done");
                setIsResourceTypeModalOpen(true);
              }}
              className={`h-8 w-8 flex items-center justify-center rounded-full ${
                theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-gray-100"
              }`}
            >
              <MoreVertical
                className={`h-4 w-4 ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-500"
                }`}
              />
            </button>
          </div>

          <button
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md mb-4 ${
              theme === "dark"
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Plus className="h-4 w-4" /> Add Resourse
          </button>

          {/* Task items would go here */}
        </div>

        <div
          className={`${
            theme === "dark" ? "bg-zinc-900" : "bg-white"
          } rounded-lg p-4`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              On-Hold <span className="text-sm">2</span>
            </h2>
            <button
              onClick={() => {
                setActiveColumn("on-hold");
                setIsResourceTypeModalOpen(true);
              }}
              className={`h-8 w-8 flex items-center justify-center rounded-full ${
                theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-gray-100"
              }`}
            >
              <MoreVertical
                className={`h-4 w-4 ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-500"
                }`}
              />
            </button>
          </div>

          <button
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md mb-4 ${
              theme === "dark"
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Plus className="h-4 w-4" /> Add Resourse
          </button>

          {/* Task items would go here */}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-medium ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Resource Types
          </h2>
          <button
            onClick={handleAddResourceType}
            className={`flex items-center gap-2 py-1 px-3 rounded-md ${
              theme === "dark"
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Plus className="h-4 w-4" /> Add Type
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourceTypes.map((resourceType) => (
            <div
              key={resourceType.id}
              className={`p-4 rounded-lg ${
                theme === "dark" ? "bg-zinc-900" : "bg-white"
              } ${theme === "dark" ? "border border-zinc-800" : "shadow-md"}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {resourceType.name}
                </h3>
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-zinc-400" : "text-gray-500"
                  }`}
                >
                  Unit: {resourceType.units}
                </span>
              </div>

              <div className="space-y-3">
                {resourceType.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`p-3 rounded-md ${
                      theme === "dark" ? "bg-zinc-800" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4
                        className={`text-sm font-medium ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        {resource.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          resource.status === "not-started"
                            ? theme === "dark"
                              ? "bg-zinc-700 text-zinc-300"
                              : "bg-gray-200 text-gray-700"
                            : resource.status === "in-progress"
                            ? theme === "dark"
                              ? "bg-blue-900/30 text-blue-300"
                              : "bg-blue-100 text-blue-700"
                            : resource.status === "done"
                            ? theme === "dark"
                              ? "bg-green-900/30 text-green-300"
                              : "bg-green-100 text-green-700"
                            : theme === "dark"
                            ? "bg-yellow-900/30 text-yellow-300"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {resource.status
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </span>
                    </div>

                    <ProgressBar progress={resource.progress} theme={theme} />

                    <div className="flex justify-between items-center mt-1">
                      <span
                        className={`text-xs ${
                          theme === "dark" ? "text-zinc-400" : "text-gray-500"
                        }`}
                      >
                        {resource.completed}/{resource.total}{" "}
                        {resourceType.units}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedResourceTypeId(resourceType.id);
                          setIsResourceModalOpen(true);
                        }}
                        className={`text-xs ${
                          theme === "dark"
                            ? "text-zinc-400 hover:text-white"
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        + Add Resource
                      </button>
                    </div>
                  </div>
                ))}

                {resourceType.resources.length === 0 && (
                  <div
                    className={`p-3 rounded-md ${
                      theme === "dark" ? "bg-zinc-800" : "bg-gray-100"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedResourceTypeId(resourceType.id);
                        setIsResourceModalOpen(true);
                      }}
                      className={`w-full text-center text-sm ${
                        theme === "dark"
                          ? "text-zinc-400 hover:text-white"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      + Add your first resource
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ResourceTypeModal
        isOpen={isResourceTypeModalOpen}
        onClose={() => {
          setIsResourceTypeModalOpen(false);
          setActiveColumn(null);
        }}
        onSubmit={handleResourceTypeSubmit}
        activeColumn={activeColumn}
      />

      <ResourceModal
        isOpen={isResourceModalOpen}
        onClose={() => {
          setIsResourceModalOpen(false);
          setSelectedResourceTypeId(null);
        }}
        onSubmit={handleResourceSubmit}
        resourceTypes={resourceTypes}
        selectedResourceTypeId={selectedResourceTypeId}
      />
    </div>
  );
}
