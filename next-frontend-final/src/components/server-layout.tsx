import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface ServerLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ServerLayout({ children, className }: ServerLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground font-sans antialiased",
        fontSans.variable,
        className
      )}
    >
      {children}
    </div>
  );
}

// Static header component that can be server-rendered
export function StaticHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <span className="font-semibold text-lg">PureLearn</span>
          </div>
        </div>
      </div>
    </header>
  );
}
