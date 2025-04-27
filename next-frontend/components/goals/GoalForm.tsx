// /components/goals/GoalForm.tsx
import React, { useState } from 'react';
import { Goal } from '@/lib/types/goal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface GoalFormProps {
  initialData?: Partial<Goal>;
  onSubmit: (goalData: Omit<Goal, 'id'>) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export function GoalForm({ initialData, onSubmit, onCancel, isEditing = false }: GoalFormProps) {
  const [goalData, setGoalData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    term: initialData?.term || 'Short-Term',
    status: initialData?.status || 'Not-Started',
    motivation: initialData?.motivation || '',
    categoryId: initialData?.categoryId
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!goalData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!goalData.motivation?.trim()) {
      newErrors.motivation = 'Motivation is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await onSubmit(goalData as Omit<Goal, 'id'>);
    }
  };

  const handleChange = (field: keyof typeof goalData, value: string) => {
    setGoalData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is filled
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={goalData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={goalData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="term">Term</Label>
        <Select 
          value={goalData.term} 
          onValueChange={(value) => handleChange('term', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Short-Term">Short-Term</SelectItem>
            <SelectItem value="Medium-Term">Medium-Term</SelectItem>
            <SelectItem value="Long-Term">Long-Term</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="status">Status</Label>
        <Select 
          value={goalData.status} 
          onValueChange={(value) => handleChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
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
      
      <div>
        <Label htmlFor="motivation">Motivation *</Label>
        <Textarea
          id="motivation"
          value={goalData.motivation}
          onChange={(e) => handleChange('motivation', e.target.value)}
          className={errors.motivation ? 'border-red-500' : ''}
          rows={3}
        />
        {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update Goal' : 'Add Goal'}
        </Button>
      </div>
    </form>
  );
}