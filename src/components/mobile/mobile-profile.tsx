"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, BarChart, LineChart, Lock, User, Watch } from "lucide-react";


const profileOptions = [
    { icon: Watch, text: "Connect Watch" },
    { icon: BarChart, text: "Weekly Reports" },
    { icon: LineChart, text: "Trend Insights" },
    { icon: Lock, text: "Privacy & Settings" },
    { icon: Bell, text: "Notifications" },
];

export default function MobileProfile() {

    return (
        <div className="space-y-4 pb-20">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Profile</h1>
                <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        <User />
                    </AvatarFallback>
                </Avatar>
            </div>
            <p className="text-muted-foreground">College</p>

            <Card>
                <CardContent className="p-4 space-y-2">
                    {profileOptions.map((item, index) => (
                         <Button key={index} variant="outline" className="w-full justify-start gap-4">
                            <item.icon className="h-5 w-5 text-muted-foreground" />
                            <span>{item.text}</span>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
