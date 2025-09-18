"use client";

import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Footprints, Droplets, BedDouble } from "lucide-react";

export default function NotificationTriggers() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-muted-foreground" />
          <CardTitle>Simulate Notifications</CardTitle>
        </div>
        <CardDescription>
          Trigger mock notifications to see how pain2peace helps you.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "High Heart Rate Alert",
              description: "Your heart rate seems high. Take a moment to breathe deeply.",
            })
          }
        >
          <Droplets className="mr-2 h-4 w-4" />
          High Heart Rate
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Low Sleep Reminder",
              description: "You had less than 4 hours of sleep. Try to rest and recharge today.",
            })
          }
        >
          <BedDouble className="mr-2 h-4 w-4" />
          Low Sleep
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Inactivity Nudge",
              description: "You've been inactive for a while. How about a short walk?",
            })
          }
        >
          <Footprints className="mr-2 h-4 w-4" />
          Inactive
        </Button>
      </CardContent>
    </Card>
  );
}
