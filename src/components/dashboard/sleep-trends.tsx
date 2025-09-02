"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BedDouble } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const sleepData = {
    average: 6.8,
    quality: 82,
    goal: 8,
    lastNight: {
        duration: 7.2,
        deep: 1.5,
        rem: 2.1,
    }
};

export default function SleepTrends() {
  const progressValue = (sleepData.average / sleepData.goal) * 100;

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BedDouble className="h-6 w-6 text-primary" />
          <CardTitle>Sleep Trends</CardTitle>
        </div>
        <CardDescription>Your sleep patterns and quality.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold">{sleepData.average}h</h3>
            <p className="text-sm text-muted-foreground">/ {sleepData.goal}h avg this week</p>
        </div>
        <Progress value={progressValue} aria-label={`${Math.round(progressValue)}% of sleep goal`} />

        <div className="grid grid-cols-3 gap-4 text-center border rounded-lg p-4">
            <div>
                <p className="text-sm text-muted-foreground">Last Night</p>
                <p className="text-lg font-semibold">{sleepData.lastNight.duration}h</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Deep Sleep</p>
                <p className="text-lg font-semibold">{sleepData.lastNight.deep}h</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">REM Sleep</p>
                <p className="text-lg font-semibold">{sleepData.lastNight.rem}h</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
