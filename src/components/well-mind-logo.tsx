import { cn } from "@/lib/utils";

export default function WellMindLogo({ className }: { className?: string }) {
  return (
    <div className={cn("p-1.5 rounded-lg bg-primary h-8 w-8", className)}>
        <svg
            className="h-full w-full text-primary-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.4a2 2 0 0 0 1.3 1.9 2 2 0 0 1 1.4 1.5 2 2 0 0 0 .9 1.7c.3.2.5.5.5.9v1.6a2 2 0 0 1-2 2h-1" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v1.4a2 2 0 0 1-1.3 1.9 2 2 0 0 0-1.4 1.5 2 2 0 0 1-.9 1.7c-.3.2-.5.5-.5.9v1.6a2 2 0 0 0 2 2h1" />
          <path d="M12 18v2.5a2.5 2.5 0 0 1-5 0A2.5 2.5 0 0 0 4.5 18" />
          <path d="M12 18v2.5a2.5 2.5 0 0 0 5 0A2.5 2.5 0 0 1 19.5 18" />
          <path d="M12 15a2 2 0 0 0-2-2H8a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H8a2 2 0 0 1-2-2" />
          <path d="M12 15a2 2 0 0 1 2-2h2a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h2a2 2 0 0 0 2-2" />
        </svg>
    </div>
  );
}
