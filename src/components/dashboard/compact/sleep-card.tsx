"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart } from "recharts"

const chartData = [
  { day: "Mon", quality: 85 }, { day: "Tue", quality: 92 },
  { day: "Wed", quality: 78 }, { day: "Thu", quality: 88 },
  { day: "Fri", quality: 95 }, { day: "Sat", quality: 90 },
  { day: "Sun", quality: 82 },
];

const chartConfig = {
  quality: {
    label: "Quality",
    color: "hsl(var(--accent))",
  },
};

export default function SleepCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Moon className="h-6 w-6 text-accent" />
          <CardTitle>Sleep</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">Good</p>
           <span className="text-sm text-muted-foreground">85 HRV</span>
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
              <linearGradient id="fillQuality" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-quality)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-quality)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="quality"
              type="natural"
              fill="url(#fillQuality)"
              stroke="var(--color-quality)"
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
