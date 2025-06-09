// app/categories/[categoryId]/goals/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLearner } from "@/lib/context/learnerContext";
import { deleteGoal, updateGoal } from '@/lib/api/goals';
import { Goal, GoalFormData } from '@/lib/types/goal';

// Properly type the props
interface FiltersProps {
  initialGoals: Goal[];
}

export default function Filters({ initialGoals = [] }: FiltersProps) {
  const { learnerId } = useLearner();
  const [selectedTerm, setSelectedTerm] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Update local goals when props change
  useEffect(() => {
    setGoals(initialGoals);
  }, [initialGoals]);

  // Form state for editing goal
  const [goalData, setGoalData] = useState<Partial<GoalFormData>>({
    title: "",
    description: "",
    term: undefined,
    status: undefined,
    motivation: ""
  });

  // Set form data when editing a goal
  useEffect(() => {
    if (editingGoal) {
      setGoalData({
        title: editingGoal.title || "",
        description: editingGoal.description || "",
        term: editingGoal.term || "",
        status: editingGoal.status || "",
        motivation: editingGoal.motivation || ""
      });
    }
  }, [editingGoal]);

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsEditDialogOpen(true);
  };
  
  // Use the imported deleteGoal function
  const handleDeleteGoal = async (goalId: number) => {
    try {
      if (learnerId === null) {
        toast.error("Cannot delete goal: Learner ID is not available");
        return;
      }
      
      const success = await deleteGoal(learnerId, goalId);
      if (!success) throw new Error('Deletion failed');
      setGoals(prev => prev.filter(g => g.id !== goalId));
      toast.success('Goal deleted!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Deletion failed");
    }
  };
  
  // Use the imported updateGoal function
  const handleUpdateGoal = async () => {
    if (!editingGoal || learnerId === null) {
      toast.error("Cannot update goal: Missing goal data or Learner ID");
      return;
    }
    
    try {
      const updatedGoal = await updateGoal(
        learnerId,
        editingGoal.id,
        goalData as Partial<GoalFormData>
      );

      if (!updatedGoal) {
        throw new Error("Failed to update goal");
      }

      // Update the goal in the local state
      setGoals(prev => prev.map(g => 
        g.id === editingGoal.id
          ? { ...g, ...updatedGoal }
          : g
      ));

      // Close dialog and reset state
      setIsEditDialogOpen(false);
      setEditingGoal(null);
      toast.success("Goal updated successfully!");
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal. Please try again.");
    }
  };

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
      {/* Filter buttons */}
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

      {/* Goal cards */}
      <div className="flex justify-center flex-col ">
        <h2 className="text-xl font-bold mb-4 ">Goals</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full px-4">
          {goals
            .filter(goal => 
              (selectedTerm === 'All' || goal.term === selectedTerm) &&
              (selectedStatus === 'All' || goal.status === selectedStatus)
            )
            .map((goal) => (
              <div 
                key={goal.id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditGoal(goal)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Goal
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteGoal(goal.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <Link href={`/categories/${goal.categoryId}/goals/${goal.id}`} className="text-lg font-semibold mb-4 block text-center pt-2">
                  {goal.title}
                </Link>
                
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

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={goalData.title}
                onChange={(e) => setGoalData({...goalData, title: e.target.value})}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={goalData.description}
                onChange={(e) => setGoalData({...goalData, description: e.target.value})}
              />
            </div>
            <div>
              <Label>Motivation</Label>
              <Input
                value={goalData.motivation}
                onChange={(e) => setGoalData({...goalData, motivation: e.target.value})}
                placeholder="Why is this goal important to you?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Term</Label>
                <Select 
                  value={goalData.term} 
                  onValueChange={(value) => setGoalData({...goalData, term: value as GoalFormData['term']})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Short-Term">Short-Term</SelectItem>
                    <SelectItem value="Medium-Term">Medium-Term</SelectItem>
                    <SelectItem value="Long-Term">Long-Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select 
                  value={goalData.status} 
                  onValueChange={(value) => setGoalData({...goalData, status: value as GoalFormData['status']})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not-Started">Not Started</SelectItem>
                    <SelectItem value="In-Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                    <SelectItem value="On-Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateGoal}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}