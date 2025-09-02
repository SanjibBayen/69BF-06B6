
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, TrendingDown, Hourglass, Moon, Sun, Zap } from "lucide-react";

export default function WeeklyReport() {
  return (
    <div className="space-y-4 text-sm">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This week, you've shown great consistency in your activity levels. While your sleep duration has been a bit lower than average, your mood reporting indicates a positive trend.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Sun className="w-5 h-5 text-yellow-500" /> Mood</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <p>Positive trend this week.</p>
            </div>
            <p className="text-xs text-muted-foreground">You reported feeling 'Good' or 'Okay' on 5 out of 7 days.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Moon className="w-5 h-5 text-blue-500" /> Sleep</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <p>Slightly below average.</p>
            </div>
            <p className="text-xs text-muted-foreground">Average sleep was 6.5h, goal is 8h.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Zap className="w-5 h-5 text-green-500" /> Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <p>Consistent activity.</p>
            </div>
            <p className="text-xs text-muted-foreground">You met your daily step goal 6 out of 7 days.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Hourglass className="w-5 h-5 text-purple-500" /> Mindfulness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
             <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <p>2 sessions completed.</p>
            </div>
            <p className="text-xs text-muted-foreground">You tried two breathing exercises this week.</p>
          </CardContent>
        </Card>
      </div>

       <Card className="bg-primary/10 border-primary/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Suggestion for Next Week</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-primary/90">
            Consider setting a consistent bedtime to improve your sleep duration. Even 15-30 minutes earlier can make a big difference.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
