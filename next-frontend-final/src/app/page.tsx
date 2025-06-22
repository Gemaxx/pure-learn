import { Button } from "@/components/ui/button";
import { ChromeIcon as Google } from "lucide-react";
import { HomePageClient } from "@/components/home-page-client";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-3.5rem)] p-4 md:p-8">
      <div className="max-w-md w-full mx-auto mt-12 md:mt-24 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Unlock your Learning Potential
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            PureLearn is a Learning Framework that provides learners with all
            tools, utilities and best practices they need to achieve their
            learning goals.
          </p>
        </div>

        <HomePageClient />
      </div>
    </div>
  );
}
