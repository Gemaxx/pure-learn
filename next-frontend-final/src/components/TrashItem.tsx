import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";

interface TrashItemProps {
  title: string;
  description?: string;
  color?: string;
  icon?: React.ReactNode;
  onRestore: () => void;
  onDelete: () => void;
  extraContent?: React.ReactNode;
}

const TrashItem: React.FC<TrashItemProps> = ({
  title,
  description,
  color,
  icon,
  onRestore,
  onDelete,
  extraContent,
}) => {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between bg-card dark:bg-card/80">
      <div className="flex items-center gap-3 min-w-0">
        {icon}
        {color && (
          <div
            className="w-4 h-4 rounded-full shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        )}
        <div className="min-w-0">
          <h3 className="font-medium truncate">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-1 truncate">{description}</p>
          )}
          {extraContent}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRestore}
          className="flex items-center gap-1"
        >
          <RefreshCw size={14} />
          <span>Restore</span>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="flex items-center gap-1"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default TrashItem; 