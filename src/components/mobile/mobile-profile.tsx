
"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, BarChart, LineChart, Lock, User, Watch } from "lucide-react";

const ChatGptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v1.4a2 2 0 0 1-1.3 1.9 2 2 0 0 0-1.4 1.5 2 2 0 0 1-.9 1.7c-.3.2-.5.5-.5.9v1.6a2 2 0 0 0 2 2h1" />
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.4a2 2 0 0 0 1.3 1.9 2 2 0 0 1 1.4 1.5 2 2 0 0 0 .9 1.7c.3.2.5.5.5.9v1.6a2 2 0 0 1-2 2h-1" />
    </svg>
);


const profileOptions = [
    { icon: Watch, text: "Connect Watch" },
    { icon: ChatGptIcon, text: "Connect ChatGPT" },
    { icon: BarChart, text: "Weekly Reports" },
    { icon: LineChart, text: "Trend Insights" },
    { icon: Lock, text: "Privacy & Settings" },
    { icon: Bell, text: "Notifications" },
];

export default function MobileProfile() {

    return (
        <div className="space-y-6 p-4 pb-24 bg-background">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Profile</h1>
                    <p className="text-muted-foreground">College</p>
                </div>
                <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/20 text-primary">
                        <User className="h-6 w-6" />
                    </AvatarFallback>
                </Avatar>
            </div>
            
            <div className="space-y-3">
                {profileOptions.map((item, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start gap-4 h-16 text-base bg-card shadow-sm border rounded-xl">
                        <item.icon className="h-6 w-6 text-primary" />
                        <span>{item.text}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}
