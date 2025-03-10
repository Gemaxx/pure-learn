"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const goals = [
  { 
    title: "Jetpack Compose Course",
    status: "In-Progress",
    progress: "1%",
    category: "Short-Term"
  },
  { 
    title: "React Native Project",
    status: "Not-Started",
    progress: "0%",
    category: "Medium-Term"
  },
  { 
    title: "Angular Mastery",
    status: "Done",
    progress: "100%",
    category: "Long-Term"
  },
  { 
    title: "Vue.js Basics",
    status: "Cancelled",
    progress: "20%",
    category: "Short-Term"
  },
  { 
    title: "Svelte Advanced",
    status: "In-Progress",
    progress: "50%",
    category: "Medium-Term"
  },
  { 
    title: "Next.js Essentials",
    status: "Not-Started",
    progress: "0%",
    category: "Long-Term"
  },
  { 
    title: "Node.js Backend",
    status: "Done",
    progress: "100%",
    category: "Short-Term"
  },
  { 
    title: "GraphQL with Apollo",
    status: "In-Progress",
    progress: "75%",
    category: "Medium-Term"
  },
  { 
    title: "TypeScript Deep Dive",
    status: "Cancelled",
    progress: "10%",
    category: "Long-Term"
  },
];

function Page() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statusColors = {
    'Not-Started': 'bg-gray-200',
    'In-Progress': 'bg-blue-200',
    'Done': 'bg-green-200',
    'Cancelled': 'bg-red-200'
  };

  return (
    <div className=" flex flex-col items-center justify-center p-8 w-full">
      {/* Time classification with All button */}
      <div className="flex gap-2 mb-4">
        {['All', 'Short-Term', 'Medium-Term', 'Long-Term'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Goal statuses with All button */}
      <div className="flex gap-2 mb-8">
        {['All', 'Not-Started', 'In-Progress', 'Done', 'Cancelled'].map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Modified Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
        {goals
          .filter(goal => 
            (selectedCategory === 'All' || goal.category === selectedCategory) &&
            (selectedStatus === 'All' || goal.status === selectedStatus)
          )
          .map((goal, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-lg shadow-md" // White background for the card
            >
              <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
              
              <div className="flex justify-between items-center">
                {/* العنصر البيضاوي الملون */}
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[goal.status as keyof typeof statusColors]}`}>
                  {goal.status}
                </span>
                <span className="text-gray-600">{goal.progress}</span>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                {goal.category}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Page;