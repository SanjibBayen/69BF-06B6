
import { cn } from "@/lib/utils";
import { Brain } from "lucide-react";

export default function Pain2PeaceLogo({ className }: { className?: string }) {
  return (
    <div className={cn("p-1.5 rounded-lg bg-primary flex items-center justify-center h-8 w-8", className)}>
        <Brain className="h-5 w-5 text-primary-foreground" />
    </div>
  );
}
