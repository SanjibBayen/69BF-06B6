"use client"

import * as React from "react"

interface CircularProgressProps {
  value: number
  color?: string
  strokeWidth?: number
  size?: number
  children?: React.ReactNode
}

export default function CircularProgress({
  value,
  color = "hsl(var(--primary))",
  strokeWidth = 8,
  size = 80,
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          className="text-muted"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.3s ease-out",
          }}
        />
      </svg>
      <div className="absolute flex items-center justify-center">
        {children || <span className="text-lg font-semibold">{value}%</span>}
      </div>
    </div>
  )
}
