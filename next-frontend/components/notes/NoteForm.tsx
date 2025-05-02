// components/notes/NoteForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Note } from '@/lib/types/note';

interface NoteFormProps {
  onClose: () => void;
  isEditing: boolean;
  initialData?: Partial<Note>;
  onCreateNote?: (noteData: Omit<Note, 'id'>) => Promise<void>;
  onUpdateNote?: (noteId: number, noteData: Partial<Note>) => Promise<void>;
  goalId: number;
}

export function NoteForm({
  onClose,
  isEditing,
  initialData,
  onCreateNote,
  onUpdateNote,
  goalId,
}: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setBody(initialData.body || '');
    } else {
      // Reset form when not editing
      setTitle('');
      setBody('');
    }
    // Clear errors when dialog opens/closes
    setErrors({});
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!body.trim()) {
      newErrors.body = 'Note content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      
      if (isEditing && initialData?.id && onUpdateNote) {
        await onUpdateNote(initialData.id, { title, body });
      } else if (onCreateNote) {
        await onCreateNote({
          title,
          body,
          goalId
        });
      }
      
      onClose();
    } catch (err) {
      console.error('Error submitting note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Note' : 'Add Note'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="body">Content *</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={errors.body ? 'border-red-500' : ''}
              rows={5}
              disabled={isLoading}
            />
            {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEditing ? 'Update Note' : 'Add Note'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}