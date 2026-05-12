'use client'

import { Cell, Pie, PieChart } from 'recharts'
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
import { type OrderDistribution } from '@/types'

const PLATFORM_COLORS: Record<string, string> = {
  tokopedia: 'hsl(36 100% 50%)',
  shopee: 'hsl(14 100% 53%)',
  crmax: 'hsl(221 83% 53%)',
}

const getFallbackColor = (index: number) => `hsl(${(index * 67) % 360} 70% 50%)`

interface SalesSourceChartProps {
  data?: OrderDistribution
  isLoading?: boolean
}

export function SalesSourceChart({ data, isLoading }: SalesSourceChartProps) {
  const chartConfig: ChartConfig = Object.fromEntries(
    (data?.data ?? []).map((item, i) => [
      item.platform,
      {
        label: item.platform.charAt(0).toUpperCase() + item.platform.slice(1),
        color:
          PLATFORM_COLORS[item.platform.toLowerCase()] ?? getFallbackColor(i),
      },
    ]),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Source</CardTitle>
        <CardDescription>Order distribution per platform</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <Skeleton className="h-52 w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <PieChart>
              <Pie
                data={data.data}
                dataKey="total"
                nameKey="platform"
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                strokeWidth={2}
              >
                {data.data.map((item, index) => (
                  <Cell
                    key={item.platform}
                    fill={
                      PLATFORM_COLORS[item.platform.toLowerCase()] ??
                      getFallbackColor(index)
                    }
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="platform" hideLabel />}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="platform" />}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
