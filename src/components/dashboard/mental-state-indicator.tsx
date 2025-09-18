"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CircularProgress from "./circular-progress";
import { Smile, Frown, Meh } from "lucide-react";

const mentalStateData = {
  stress: 45,
  anxiety: 60,
  wellbeing: 75,
};

export default function MentalStateIndicator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental State</CardTitle>
        <CardDescription>Your current estimated levels.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around items-center pt-4">
        <div className="flex flex-col items-center gap-2">
          <CircularProgress value={mentalStateData.stress} color="hsl(var(--primary))">
            <Meh className="h-6 w-6 text-primary" />
          </CircularProgress>
          <span className="text-sm font-medium text-muted-foreground">Stress</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CircularProgress value={mentalStateData.anxiety} color="hsl(var(--chart-4))">
            <Frown className="h-6 w-6" style={{color: 'hsl(var(--chart-4))'}} />
          </CircularProgress>
          <span className="text-sm font-medium text-muted-foreground">Anxiety</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CircularProgress value={mentalStateData.wellbeing} color="hsl(var(--chart-2))">
            <Smile className="h-6 w-6" style={{color: 'hsl(var(--chart-2))'}} />
          </CircularProgress>
          <span className="text-sm font-medium text-muted-foreground">Well-being</span>
        </div>
      </CardContent>
    </Card>
  );
}
