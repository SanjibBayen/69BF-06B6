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
            <path d="M12 2a10 10 0 0 0-9.8 11.5c.3 2.3 1.9 4.3 4.1 5.4.9.4 1.8.8 2.7 1.1l.6.2c.4.1.8.1 1.2 0l.6-.2c.9-.3 1.8-.7 2.7-1.1 2.2-1.1 3.8-3.1 4.1-5.4A10 10 0 0 0 12 2Z" />
            <path d="M12 12a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
            <path d="M17 12a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
            <path d="m9.5 7.5 5 5" />
        </svg>
    </div>
  );
}
