"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Trash2, Loader2 } from "lucide-react"

export type TrashItemContainerProps = {
  item: { id: string | number; title: string }
  isOperating: boolean
  onDelete: () => void
  onRestore: () => void
}

export default function TrashItem({ item, isOperating, onDelete, onRestore }: TrashItemContainerProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
      <span className="flex-1 truncate pr-4">{item.title}</span>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="ghost" onClick={onRestore} disabled={isOperating} className="flex items-center gap-1">
          {isOperating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          <span>Restore</span>
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete} disabled={isOperating} className="flex items-center gap-1">
          {isOperating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          <span>Delete</span>
        </Button>
      </div>
    </div>
  )
} 