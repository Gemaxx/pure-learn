import { CheckCircle2, MoreHorizontal, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import TaskItem from "./task-item";

export default function TaskList() {
  return (
    <Card className="bg-[#1c1c1c] w-full max-w-[520px] border-none rounded-xl overflow-hidden shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-1 rounded-sm">
            <CheckCircle2 className="size-4 text-blue-400" />
          </div>
          <CardTitle className="text-base font-bold text-white/90 tracking-tight">
            Frontend
          </CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white/40 hover:bg-white/5 hover:text-white"
          >
            <Plus className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white/40 hover:bg-white/5 hover:text-white"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-1">
        <div className="px-2 py-1 text-[10px] font-bold text-white/30 uppercase tracking-[0.15em]">
          You are focusing on
        </div>
        <TaskItem icon="🤍" title="Nextjs" time="75 mins" />
        <TaskItem icon="🪐" title="Exploring" time="386 mins" />
        <TaskItem icon="🖤" title="shadcn/ui" time="36 mins" />
        <TaskItem icon="💙" title="React" time="1312 mins" active />
      </CardContent>
    </Card>
  );
}
