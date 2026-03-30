'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { type ProductSales } from '@/types'

const chartConfig = {
  totalSold: { label: 'Units Sold', color: 'hsl(221 83% 53%)' },
} satisfies ChartConfig

interface ProductSalesChartProps {
  data?: ProductSales[]
  isLoading?: boolean
  period: string
}

export function ProductSalesChart({ data, isLoading, period }: ProductSalesChartProps) {
  const chartData = [...(data ?? [])]
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 10)
    .map((p) => ({
      ...p,
      shortName:
        p.productName.length > 18
          ? p.productName.slice(0, 18) + '…'
          : p.productName,
    }))

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Product Sales</CardTitle>
        <CardDescription>Units sold per product this {period}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 4, right: 16 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <YAxis
                dataKey="shortName"
                type="category"
                tickLine={false}
                axisLine={false}
                width={110}
                tick={{ fontSize: 11 }}
              />
              <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelKey="productName"
                    indicator="line"
                  />
                }
              />
              <Bar
                dataKey="totalSold"
                fill="var(--color-totalSold)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
