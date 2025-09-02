"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export default function Spo2Meter() {
  const spo2Value = 98;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-blue-500" />
          <CardTitle className="text-base">Blood Oxygen</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex items-end gap-2">
        <p className="text-4xl font-bold tracking-tight">{spo2Value}%</p>
        <p className="text-sm text-muted-foreground">Normal</p>
      </CardContent>
    </Card>
  );
}
