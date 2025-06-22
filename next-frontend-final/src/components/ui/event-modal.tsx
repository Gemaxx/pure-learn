"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const colors = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#d946ef", // fuchsia
];

const hourOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

export interface EventData {
  id?: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  color: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<EventData, 'date'>) => void;
  onDelete?: (eventId: string) => void;
  selectedDate: Date | null;
  isTimeSelection?: boolean;
  mode: 'create' | 'edit';
  existingEvent?: EventData | null;
}

export function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedDate,
  isTimeSelection = false,
  mode = 'create',
  existingEvent = null
}: EventModalProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");
  const [color, setColor] = useState(colors[7]); // Default to blue
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form with existing event data when editing
  useEffect(() => {
    if (isOpen && mode === 'edit' && existingEvent) {
      setTitle(existingEvent.title);
      setTime(existingEvent.time || "09:00");
      setColor(existingEvent.color);
      setError(null);
    } else if (!isOpen) {
      // Reset form when closing
      setTitle("");
      setTime("09:00");
      setColor(colors[7]);
      setError(null);
    }
  }, [isOpen, mode, existingEvent]);

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    
    const eventData = {
      id: existingEvent?.id,
      title: title.trim(),
      time: isTimeSelection ? time : undefined,
      color
    };
    
    onSave(eventData);
    onClose();
  };

  const handleDelete = () => {
    if (existingEvent?.id && onDelete) {
      onDelete(existingEvent.id);
      onClose();
    }
  };
  
  if (!selectedDate) return null;

  const modalTitle = mode === 'create' ? 'Add Event' : 'Edit Event';
  const saveButtonText = mode === 'create' ? 'Create Event' : 'Update Event';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
    >
      <div className="mb-4 text-sm text-muted-foreground">
        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Team Meeting"
            maxLength={100}
            className={cn(
              "transition-colors",
              error ? "border-destructive focus-visible:ring-destructive" : ""
            )}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {isTimeSelection && (
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="transition-colors">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {hourOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={cn(
                          "h-8 w-8 rounded-full transition-all duration-200",
                          "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
                          "dark:focus:ring-offset-background"
                        )}
                        style={{ 
                          backgroundColor: c,
                          boxShadow: color === c ? '0 0 0 2px hsl(var(--ring))' : undefined
                        }}
                        aria-label={`Select color ${c}`}
                    >
                        {color === c && <Check className="h-4 w-4 text-white" />}
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between gap-3">
        {mode === 'edit' && onDelete && existingEvent?.id ? (
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout
        )}
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {saveButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
} 