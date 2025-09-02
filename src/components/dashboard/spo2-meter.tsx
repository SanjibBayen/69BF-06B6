"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { RadialBar, RadialBarChart } from "recharts"

const chartData = [{ month: "spo2", value: 98, fill: "var(--color-value)" }]

const chartConfig = {
  value: {
    label: "SpO2",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function Spo2Meter() {
  const spo2Value = chartData[0].value;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-blue-500" />
          <CardTitle>Blood Oxygen</CardTitle>
        </div>
        <CardDescription>Your current SpO2 level.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center pt-2">
         <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={270}
            innerRadius="70%"
            outerRadius="100%"
            barSize={12}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <RadialBar
              dataKey="value"
              background={{ fill: 'hsl(var(--muted))' }}
              roundness={1}
            />
             <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-4xl font-bold"
            >
              {spo2Value}%
            </text>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
