import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 h-14">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Goal header skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>

          {/* Navigation tabs skeleton */}
          <div className="flex gap-4 border-b">
            {["About", "Tasks", "Notes", "Resources"].map((tab) => (
              <Skeleton key={tab} className="h-10 w-16" />
            ))}
          </div>

          {/* Content skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
