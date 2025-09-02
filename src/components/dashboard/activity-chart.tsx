"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Footprints } from "lucide-react";

const chartData = [
  { day: "Mon", steps: 8500 },
  { day: "Tue", steps: 10200 },
  { day: "Wed", steps: 4300 },
  { day: "Thu", steps: 9800 },
  { day: "Fri", steps: 12100 },
  { day: "Sat", steps: 14500 },
  { day: "Sun", steps: 6700 },
];

const chartConfig = {
  steps: {
    label: "Steps",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function ActivityChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Footprints className="h-6 w-6 text-accent" />
          <CardTitle>Weekly Activity</CardTitle>
        </div>
        <CardDescription>Your step count over the last week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${Number(value) / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="steps" fill="var(--color-steps)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
