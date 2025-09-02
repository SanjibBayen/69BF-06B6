
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
    { time: "12 AM", bpm: 72 },
    { time: "2 AM", bpm: 68 },
    { time: "4 AM", bpm: 65 },
    { time: "6 AM", bpm: 75 },
    { time: "8 AM", bpm: 82 },
    { time: "10 AM", bpm: 88 },
    { time: "12 PM", bpm: 95 },
    { time: "2 PM", bpm: 92 },
    { time: "4 PM", bpm: 85 },
    { time: "6 PM", bpm: 105 },
    { time: "8 PM", bpm: 98 },
    { time: "10 PM", bpm: 80 },
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
        <ChartContainer config={chartConfig} className="h-[200px] w-full sm:h-[250px]">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value, index) => index % 2 === 0 ? value : ''}
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
