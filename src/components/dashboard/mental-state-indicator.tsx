
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mentalStateData = {
  stress: 45,
  anxiety: 60,
  depression: 25,
};

export default function MentalStateIndicator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental State Levels</CardTitle>
        <CardDescription>Current estimated levels.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Stress</span>
            <span className="text-sm font-medium">{mentalStateData.stress}%</span>
          </div>
          <Progress value={mentalStateData.stress} aria-label="Stress level" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Anxiety</span>
            <span className="text-sm font-medium">{mentalStateData.anxiety}%</span>
          </div>
          <Progress value={mentalStateData.anxiety} aria-label="Anxiety level" className="[&>div]:bg-yellow-500" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Depression</span>
            <span className="text-sm font-medium">{mentalStateData.depression}%</span>
          </div>
          <Progress value={mentalStateData.depression} aria-label="Depression level" className="[&>div]:bg-red-500" />
        </div>
      </CardContent>
    </Card>
  );
}
