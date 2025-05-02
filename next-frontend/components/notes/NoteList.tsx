
// /components/notes/NoteList.tsx
import React from 'react';
import { Note } from '@/lib/types/note';
import { NoteItem } from './NoteItem';

interface NoteListProps {
  notes: Note[];
  onEditNote: (note: Note) => void;
  onDeleteNote: (noteId: number) => void;
}

export function NoteList({ notes, onEditNote, onDeleteNote }: NoteListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Notes</h2>
      
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes found. Add one to get started.</p>
      ) : (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        ))
      )}
    </div>
  );
}

