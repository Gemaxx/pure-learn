"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Goal = {
  id: number;
  title: string;
  term: string;
  status: string;
  categoryId?: number | null;
};

export default function Filters({ initialGoals = [] }: { initialGoals?: Goal[] }) {
  const [selectedTerm, setSelectedTerm] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const getProgress = (status: string): string => {

  const statusMap: { [key: string]: string } = {
    'Not-Started': '0%',
    'In-Progress': '50%',
    'Done': '100%',
    'Canceled': '0%',
    'On-Hold': '30%'
  };
  return statusMap[status] || '0%';
};
const statusColors: { [key: string]: string } = {
  'Not-Started': 'bg-gray-200',
  'In-Progress': 'bg-blue-200',
  'Done': 'bg-green-200',
  'Canceled': 'bg-red-200',
  'On-Hold': 'bg-yellow-200'
};
return (
  <div className="w-full">
    {/* أزرار الفلترة */}
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="flex gap-2 flex-wrap justify-center">
        {['All', 'Short-Term', 'Medium-Term', 'Long-Term'].map((term) => (
          <Button
            key={term}
            variant={selectedTerm === term ? 'default' : 'outline'}
            onClick={() => setSelectedTerm(term)}
            className="min-w-[120px] text-center"
          >
            {term}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {['All', 'Not-Started', 'In-Progress', 'Done', 'Canceled', 'On-Hold'].map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            onClick={() => setSelectedStatus(status)}
            className="min-w-[120px] text-center"
          >
            {status}
          </Button>
        ))}
      </div>
    </div>

    {/* البطاقات */}
    <div className="flex justify-center flex-col ">
        <h2 className="text-xl font-bold mb-4 ">Goals</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full px-4">
        {initialGoals
          .filter(goal => 
            (selectedTerm === 'All' || goal.term === selectedTerm) &&
            (selectedStatus === 'All' || goal.status === selectedStatus)
          )
          .map((goal) => (
            <div 
            key={goal.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
               
                            
                    
              <Link href={`/categories/${goal.categoryId}/goals/${goal.id}`} className="text-lg font-semibold mb-2 text-center">{goal.title}</Link>
              
              <div className="flex justify-between items-center mb-3">
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[goal.status]}`}>
                  {goal.status}
                </span>
                <span className="text-gray-600">{getProgress(goal.status)}</span>
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                {goal.term}
              </p>
            </div>
          ))}
      </div>
    </div>
  </div>
);
}