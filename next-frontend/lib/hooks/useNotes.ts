// /hooks/useNotes.ts
import { useState, useEffect } from 'react';
import { Note } from '@/lib/types/note';
import { getNotes } from '@/lib/api/notes';
import { createNote } from '@/lib/api/notes/create';
import { updateNote } from '@/lib/api/notes/update';
import { deleteNote } from '@/lib/api/notes/delete';
import { toast } from 'sonner';

export function useNotes(learnerId: number, goalId?: number) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes(learnerId, goalId);
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };
  
  const addNote = async (noteData: Omit<Note, 'id'>) => {
    try {
      const newNote = await createNote(learnerId, noteData);
      if (newNote) {
        setNotes(prev => [...prev, newNote]);
        toast.success('Note created successfully!');
        return newNote;
      }
      throw new Error('Failed to create note');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create note');
      return null;
    }
  };
  
  const editNote = async (noteId: number, noteData: Partial<Note>) => {
    try {
      const updatedNote = await updateNote(learnerId, noteId, noteData);
      if (updatedNote) {
        setNotes(prev => prev.map(note => 
          note.id === noteId ? updatedNote : note
        ));
        toast.success('Note updated successfully!');
        return updatedNote;
      }
      throw new Error('Failed to update note');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update note');
      return null;
    }
  };
  
  const removeNote = async (noteId: number) => {
    try {
      const success = await deleteNote(learnerId, noteId);
      if (success) {
        setNotes(prev => prev.filter(note => note.id !== noteId));
        toast.success('Note deleted successfully!');
        return true;
      }
      throw new Error('Failed to delete note');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete note');
      return false;
    }
  };
  
  useEffect(() => {
    if (learnerId) {
      fetchNotes();
    }
  }, [learnerId, goalId]);
  
  return {
    notes,
    loading,
    error,
    fetchNotes,
    addNote,
    editNote,
    removeNote
  };
}
