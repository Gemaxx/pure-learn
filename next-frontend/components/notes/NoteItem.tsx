// components/notes/NoteItem.tsx
import React from 'react';
import { Note } from '@/lib/types/note';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface NoteItemProps {
  note: Note;
  onDelete: (noteId: number) => void;
  onEdit: (note: Note) => void;
}

export function NoteItem({ note, onDelete, onEdit }: NoteItemProps) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  return (
    <Card className="hover:shadow transition-shadow">
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{note.title}</CardTitle>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(note)}
              title="Edit note"
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4 text-gray-500" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              title="Delete note"
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {note.body && (
        <CardContent className="py-2 px-4">
          <div className="text-gray-700 text-sm whitespace-pre-wrap">
            {note.body}
          </div>
        </CardContent>
      )}
    </Card>
  );
}