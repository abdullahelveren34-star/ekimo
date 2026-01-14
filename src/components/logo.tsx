import { cn } from "@/lib/utils";
import { Globe, Sparkles } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
        <div className="relative">
            <Globe className="h-10 w-10 text-primary" />
            <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1" />
        </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tighter text-foreground">
          StellarCorp
        </span>
        <span className="text-xs -mt-1 text-muted-foreground">
          INTERSTELLAR OPERATIONS
        </span>
      </div>
    </div>
  );
}
