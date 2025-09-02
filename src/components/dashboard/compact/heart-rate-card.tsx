"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { time: "12 AM", bpm: 72 }, { time: "2 AM", bpm: 68 },
  { time: "4 AM", bpm: 65 }, { time: "6 AM", bpm: 75 },
  { time: "8 AM", bpm: 82 }, { time: "10 AM", bpm: 88 },
  { time: "12 PM", bpm: 95 }, { time: "2 PM", bpm: 92 },
  { time: "4 PM", bpm: 85 }, { time: "6 PM", bpm: 105 },
  { time: "8 PM", bpm: 98 }, { time: "10 PM", bpm: 80 },
];

const chartConfig = {
  bpm: {
    label: "BPM",
    color: "hsl(var(--primary))",
  },
};

export default function HeartRateCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <CardTitle>Heart Rate</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">78</p>
          <span className="text-sm text-muted-foreground">bpm</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[60px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 10,
              top: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillBpm" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-bpm)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-bpm)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="bpm"
              type="natural"
              fill="url(#fillBpm)"
              stroke="var(--color-bpm)"
              stackId="a"
            />
             <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
