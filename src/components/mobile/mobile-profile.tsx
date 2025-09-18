
"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, BarChart, LineChart, Lock, User, Watch, UserCog, Palette, BriefcaseMedical, Stethoscope } from "lucide-react";
import { useState } from "react";
import { ThemeSwitcher } from "../theme-switcher";

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

interface MobileProfileProps {
  onNavigate: (tab: string) => void;
}

export default function MobileProfile({ onNavigate }: MobileProfileProps) {
    const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);

    const profileOptions = [
        { icon: Watch, text: "Connect Watch", action: () => {} },
        { icon: ChatGptIcon, text: "Connect ChatGPT", action: () => {} },
        { icon: BriefcaseMedical, text: "Therapist Appointment", action: () => {} },
        { icon: Stethoscope, text: "Add My Health Issue", action: () => {} },
        { icon: BarChart, text: "Weekly Reports", action: () => onNavigate('report') },
        { icon: LineChart, text: "Trend Insights", action: () => {} },
        { icon: UserCog, text: "Personalization", action: () => {} },
        { icon: Palette, text: "Theme", action: () => setIsThemeSwitcherOpen(true) },
        { icon: Lock, text: "Privacy & Settings", action: () => {} },
        { icon: Bell, text: "Notifications", action: () => {} },
    ];


    return (
        <>
            <div className="flex flex-col h-full bg-background">
                <header className="sticky top-0 z-10 p-4 bg-background/95 backdrop-blur-sm">
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
                </header>
                
                <ScrollArea className="flex-1">
                    <div className="space-y-3 p-4 pt-2">
                        {profileOptions.map((item, index) => (
                            <Button key={index} variant="outline" className="w-full justify-start gap-4 h-16 text-base bg-card shadow-sm border rounded-xl" onClick={item.action}>
                                <item.icon className="h-6 w-6 text-primary" />
                                <span>{item.text}</span>
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <ThemeSwitcher open={isThemeSwitcherOpen} onOpenChange={setIsThemeSwitcherOpen} />
        </>
    );
}
