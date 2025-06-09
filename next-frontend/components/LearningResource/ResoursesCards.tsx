"use client";
import React from "react";

const columns = [
  {
    title: "Not-Started",
    count: 2,
    tasks: [
      {
        title: "How to Create a Component",
        type: "Video",
        progress: 60,
        progressLabel: "30/50 Min",
      },
      {
        title: "Responsive Design",
        type: "Book",
        progress: 8.3,
        progressLabel: "1/12 Chapters",
      },
    ],
  },
  {
    title: "In-Progress",
    count: 5,
    tasks: [
      {
        title: "Do Research about AI",
        type: "Resource Type",
        progress: 66.6,
        progressLabel: "8/12 Unit Type",
      },
      {
        title: "Do Research about AI",
        type: "Resource Type",
        progress: 66.6,
        progressLabel: "8/12 Unit Type",
      },
      {
        title: "Do Research about AI",
        type: "Resource Type",
        progress: 66.6,
        progressLabel: "8/12 Unit Type",
      },
    ],
  },
  {
    title: "Done",
    count: 2,
    tasks: [
      {
        title: "Do Research about AI",
        type: "Resource Type",
        progress: 66.6,
        progressLabel: "8/12 Unit Type",
      },
      {
        title: "Finish the first 2 videos",
        type: "Resource Type",
        progress: 66.6,
        progressLabel: "8/12 Unit Type",
      },
    ],
  },
  {
    title: "On-Hold",
    count: 2,
    tasks: [],
  },
];

export default function ResourceCards() {
  return (
     <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {/* Column */}
        <div className="bg-gray-200 rounded-lg min-w-[280px] w-[280px] shadow-md">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              Not-Started <span className="bg-gray-300 text-gray-600 rounded-full px-2 text-xs font-medium">2</span>
            </div>
            <div className="cursor-pointer">⋯</div>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-300 text-sm text-gray-600 hover:bg-gray-300/40 cursor-pointer">
            <span className="text-gray-500 text-base">+</span> Add Resource
          </div>

          <div className="flex items-center px-4 py-2 text-xs text-gray-600 gap-2 border-b border-gray-300 hover:bg-gray-300/40 cursor-pointer">
            <div className="flex items-center">📎</div>
            <div>+</div>
            <div>Type</div>
            <div className="ml-auto">▼</div>
          </div>

          {/* Task */}
          <div className="bg-white rounded-md m-3 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="px-3 pt-3 pb-1 flex justify-between">
              <div className="text-sm font-medium text-gray-800 mb-2">How to Create a Component</div>
              <div className="text-gray-400 cursor-pointer">⋯</div>
            </div>
            <div className="flex items-center gap-2 px-3 pb-1 text-xs text-gray-500">
              <div>📎</div>
              <div className="bg-gray-300 text-gray-600 rounded px-2 py-0.5">Video</div>
              <div className="ml-auto">↗</div>
            </div>
            <div className="px-3 pb-3">
              <div className="h-1.5 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-blue-600 w-[60%] rounded"></div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <div>60%</div>
                <div>30/50 Min</div>
              </div>
            </div>
          </div>

          {/* Another Task */}
          <div className="bg-white rounded-md m-3 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="px-3 pt-3 pb-1 flex justify-between">
              <div className="text-sm font-medium text-gray-800 mb-2">Responsive Design</div>
              <div className="text-gray-400 cursor-pointer">⋯</div>
            </div>
            <div className="flex items-center gap-2 px-3 pb-1 text-xs text-gray-500">
              <div>📎</div>
              <div className="bg-gray-300 text-gray-600 rounded px-2 py-0.5">Book</div>
              <div className="ml-auto">↗</div>
            </div>
            <div className="px-3 pb-3">
              <div className="h-1.5 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-blue-600 w-[8%] rounded"></div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <div>8.3%</div>
                <div>1/12 Chapters</div>
              </div>
            </div>
          </div>

        </div>
        {/* Add other columns similarly like In-Progress, Done, On-Hold... */}
      </div>
    </div>

  );
}