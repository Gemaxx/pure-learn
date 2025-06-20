"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Clock, Plus, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchWithAuth } from "@/services/api-client";

type Goal = {
  id: number;
  categoryId: number;
  title: string;
  description?: string;
  motivation?: string;
  term: "Short-Term" | "Medium-Term" | "Long-Term";
  status: "Not-Started" | "In-Progress" | "On-Hold" | "Done" | "Canceled";
  completionDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

const termColors = {
  "Short-Term":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Medium-Term":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Long-Term": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};

export default function DashboardPage() {
  const [inProgressGoals, setInProgressGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchInProgressGoals = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchWithAuth(
          `/api/learners/${user.id}/goals?Status=In-Progress`
        );
        setInProgressGoals(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Failed to fetch in-progress goals:", err);
        setError("Failed to load your goals");
        toast({
          title: "Error",
          description: "Failed to load your in-progress goals",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInProgressGoals();
  }, [user?.id, toast]);

  const handleGoalClick = (goal: Goal) => {
    router.push(`/goals/${goal.id}`);
  };

  const handleViewAllGoals = () => {
    router.push("/goals");
  };

  const handleCreateGoal = () => {
    router.push("/categories");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what you're currently working on
        </p>
      </div>

      <div className="space-y-6">
        {/* In-Progress Goals Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">In-Progress Goals</h2>
              {!isLoading && (
                <Badge variant="secondary" className="ml-2">
                  {inProgressGoals.length}
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleViewAllGoals}
                className="flex items-center gap-2"
              >
                View All Goals
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleCreateGoal}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Goal
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-5 w-3/4 bg-secondary rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-secondary rounded"></div>
                      <div className="h-4 w-2/3 bg-secondary rounded"></div>
                      <div className="flex gap-2 mt-3">
                        <div className="h-5 w-16 bg-secondary rounded-full"></div>
                        <div className="h-5 w-20 bg-secondary rounded-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="border-destructive/20">
              <CardContent className="p-6 text-center">
                <div className="text-destructive mb-2">{error}</div>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : inProgressGoals.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No goals in progress
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start working on your goals to see them here. Create a new
                  goal or update existing ones to "In-Progress" status.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    onClick={handleCreateGoal}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Your First Goal
                  </Button>
                  <Button variant="outline" onClick={handleViewAllGoals}>
                    View All Goals
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inProgressGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleGoalClick(goal)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base leading-tight">
                      {goal.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {goal.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {goal.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge
                        variant="secondary"
                        className={`text-xs px-2 py-0.5 h-5 ${
                          termColors[goal.term]
                        }`}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {goal.term}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0.5 h-5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        In-Progress
                      </Badge>
                    </div>

                    {goal.motivation && (
                      <div className="text-xs text-muted-foreground">
                        <strong>Motivation:</strong>{" "}
                        {goal.motivation.length > 60
                          ? `${goal.motivation.substring(0, 60)}...`
                          : goal.motivation}
                      </div>
                    )}

                    {goal.createdAt && (
                      <div className="text-xs text-muted-foreground mt-2">
                        Started: {new Date(goal.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats Section */}
        {!isLoading && !error && inProgressGoals.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {inProgressGoals.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Goals
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    inProgressGoals.filter((g) => g.term === "Short-Term")
                      .length
                  }
                </div>
                <div className="text-sm text-muted-foreground">Short-Term</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {inProgressGoals.filter((g) => g.term === "Long-Term").length}
                </div>
                <div className="text-sm text-muted-foreground">Long-Term</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
