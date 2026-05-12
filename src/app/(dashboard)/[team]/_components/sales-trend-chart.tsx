'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { type OrderYearlyAnalytics } from '@/types'

const chartConfig = {
  online: { label: 'Online', color: 'hsl(221 83% 53%)' },
  offline: { label: 'Offline', color: 'hsl(142 76% 36%)' },
} satisfies ChartConfig

interface SalesTrendChartProps {
  data?: OrderYearlyAnalytics
  isLoading?: boolean
}

export function SalesTrendChart({ data, isLoading }: SalesTrendChartProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Sales Trend</CardTitle>
        <CardDescription>Monthly online vs offline orders</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <Skeleton className="h-52 w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <AreaChart data={data.data} margin={{ left: -16, right: 4 }}>
              <defs>
                <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-online)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-online)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="fillOffline" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-offline)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-offline)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v) => v.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="online"
                stroke="var(--color-online)"
                strokeWidth={2}
                fill="url(#fillOnline)"
              />
              <Area
                type="monotone"
                dataKey="offline"
                stroke="var(--color-offline)"
                strokeWidth={2}
                fill="url(#fillOffline)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
