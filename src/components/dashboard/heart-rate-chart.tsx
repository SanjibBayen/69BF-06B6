"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { HeartPulse } from "lucide-react";

const chartData = [
  { time: "12:00 AM", bpm: 72 },
  { time: "02:00 AM", bpm: 68 },
  { time: "04:00 AM", bpm: 65 },
  { time: "06:00 AM", bpm: 75 },
  { time: "08:00 AM", bpm: 82 },
  { time: "10:00 AM", bpm: 88 },
  { time: "12:00 PM", bpm: 95 },
  { time: "02:00 PM", bpm: 92 },
  { time: "04:00 PM", bpm: 85 },
  { time: "06:00 PM", bpm: 105 },
  { time: "08:00 PM", bpm: 98 },
  { time: "10:00 PM", bpm: 80 },
];

const chartConfig = {
  bpm: {
    label: "BPM",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function HeartRateChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <CardTitle>Daily Heart Rate</CardTitle>
        </div>
        <CardDescription>Your heart rate throughout the day.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="bpm"
              type="natural"
              stroke="var(--color-bpm)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
