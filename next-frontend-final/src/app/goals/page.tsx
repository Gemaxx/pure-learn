"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Target, Clock, Search, Filter, ArrowLeft, Plus } from "lucide-react";
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

type Category = {
  id: string;
  title: string;
  description?: string;
  color: string;
};

const termColors = {
  "Short-Term":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Medium-Term":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Long-Term": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};

const statusColors = {
  "Not-Started":
    "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  "In-Progress":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "On-Hold":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export default function AllGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [termFilter, setTermFilter] = useState<string>("all");

  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch all goals and categories in parallel
        const [goalsResponse, categoriesResponse] = await Promise.all([
          fetchWithAuth(`/api/learners/${user.id}/goals`),
          fetchWithAuth(`/api/learners/${user.id}/categories`),
        ]);

        setGoals(Array.isArray(goalsResponse) ? goalsResponse : []);
        setCategories(
          Array.isArray(categoriesResponse) ? categoriesResponse : []
        );
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load your goals");
        toast({
          title: "Error",
          description: "Failed to load your goals",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id, toast]);

  // Filter goals based on search term and filters
  useEffect(() => {
    let filtered = goals;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (goal) =>
          goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          goal.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          goal.motivation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((goal) => goal.status === statusFilter);
    }

    // Term filter
    if (termFilter !== "all") {
      filtered = filtered.filter((goal) => goal.term === termFilter);
    }

    setFilteredGoals(filtered);
  }, [goals, searchTerm, statusFilter, termFilter]);

  const handleGoalClick = (goal: Goal) => {
    router.push(`/goals/${goal.id}`);
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const handleCreateGoal = () => {
    router.push("/categories");
  };

  const getCategoryById = (categoryId: number) => {
    return categories.find((cat) => cat.id === categoryId.toString());
  };

  const getGoalStats = () => {
    const stats = {
      total: goals.length,
      inProgress: goals.filter((g) => g.status === "In-Progress").length,
      done: goals.filter((g) => g.status === "Done").length,
      notStarted: goals.filter((g) => g.status === "Not-Started").length,
      onHold: goals.filter((g) => g.status === "On-Hold").length,
    };
    return stats;
  };

  const stats = getGoalStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 h-14">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold text-lg">All Goals</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Stats Cards */}
        {!isLoading && !error && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">Total Goals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.inProgress}
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.done}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {stats.notStarted}
                </div>
                <div className="text-sm text-muted-foreground">Not Started</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.onHold}
                </div>
                <div className="text-sm text-muted-foreground">On Hold</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Not-Started">Not Started</SelectItem>
              <SelectItem value="In-Progress">In Progress</SelectItem>
              <SelectItem value="On-Hold">On Hold</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={termFilter} onValueChange={setTermFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Clock className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              <SelectItem value="Short-Term">Short-Term</SelectItem>
              <SelectItem value="Medium-Term">Medium-Term</SelectItem>
              <SelectItem value="Long-Term">Long-Term</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleCreateGoal}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Create Goal
          </Button>
        </div>

        {/* Goals List */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-3">
                  <div className="h-5 w-3/4 bg-secondary rounded"></div>
                  <div className="h-3 w-1/2 bg-secondary rounded"></div>
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
        ) : filteredGoals.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {goals.length === 0
                  ? "No goals found"
                  : "No goals match your filters"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {goals.length === 0
                  ? "Create your first goal to get started with your learning journey."
                  : "Try adjusting your search or filter criteria."}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  onClick={handleCreateGoal}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Goal
                </Button>
                {goals.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setTermFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGoals.map((goal) => {
              const category = getCategoryById(goal.categoryId);
              return (
                <Card
                  key={goal.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleGoalClick(goal)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base leading-tight flex-1 pr-2">
                        {goal.title}
                      </CardTitle>
                      {category && (
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: category.color }}
                          title={category.title}
                        />
                      )}
                    </div>
                    {category && (
                      <div className="text-xs text-muted-foreground">
                        {category.title}
                      </div>
                    )}
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
                        className={`text-xs px-2 py-0.5 h-5 ${
                          statusColors[goal.status]
                        }`}
                      >
                        {goal.status}
                      </Badge>
                    </div>

                    {goal.motivation && (
                      <div className="text-xs text-muted-foreground mb-2">
                        <strong>Motivation:</strong>{" "}
                        {goal.motivation.length > 60
                          ? `${goal.motivation.substring(0, 60)}...`
                          : goal.motivation}
                      </div>
                    )}

                    <div className="flex justify-between text-xs text-muted-foreground">
                      {goal.createdAt && (
                        <span>
                          Created:{" "}
                          {new Date(goal.createdAt).toLocaleDateString()}
                        </span>
                      )}
                      {goal.completionDate && (
                        <span>
                          Completed:{" "}
                          {new Date(goal.completionDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Results count */}
        {!isLoading && !error && filteredGoals.length > 0 && (
          <div className="text-center mt-6 text-sm text-muted-foreground">
            Showing {filteredGoals.length} of {goals.length} goals
          </div>
        )}
      </div>
    </div>
  );
}
