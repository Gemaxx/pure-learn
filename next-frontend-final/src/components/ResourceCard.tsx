import React from 'react';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

interface LearningResource {
  id: string;
  title: string;
  typeId: string;
  typeName?: string;
  totalUnits: number;
  progress: number;
  status: 'Not-Started' | 'In-Progress' | 'Done' | 'On-Hold';
}

interface ResourceCardProps {
  resource: LearningResource;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export default function ResourceCard({ resource, onEdit, onDelete, isDeleting }: ResourceCardProps) {
  return (
    <div className="mb-3 bg-card rounded-md border border-border hover:bg-accent/50 transition-colors">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm leading-tight pr-2">{resource.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="h-6 w-6 text-muted-foreground hover:bg-muted rounded flex items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <MoreVertical className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreVertical className="h-4 w-4" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit} disabled={isDeleting}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600" disabled={isDeleting}>
                Move to trash
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <span className="capitalize">{resource.typeName }</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{resource.progress}%</span>
            <span>
              {resource.totalUnits} units
            </span>
          </div>
          <div className="bg-secondary rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: `${resource.progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 