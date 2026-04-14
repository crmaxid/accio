'use client'

import { HugeiconsIcon, type HugeiconsIconProps } from '@hugeicons/react'
import { AnalyticsDownIcon, AnalyticsUpIcon } from '@hugeicons/core-free-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: HugeiconsIconProps['icon']
  change: number
  isLoading?: boolean
}

export function StatCard({
  title,
  value,
  description,
  icon,
  change,
  isLoading,
}: StatCardProps) {
  const isPositive = change >= 0

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center justify-between">
          {title}
          <HugeiconsIcon
            icon={icon}
            strokeWidth={1.5}
            className="text-muted-foreground size-4"
          />
        </CardDescription>
        <CardTitle className="text-xl font-semibold tabular-nums">
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          <HugeiconsIcon
            icon={isPositive ? AnalyticsUpIcon : AnalyticsDownIcon}
            strokeWidth={2}
            className={cn(
              'size-3.5',
              isPositive ? 'text-emerald-500' : 'text-red-500',
            )}
          />
          <span
            className={cn(
              'text-xs font-medium tabular-nums',
              isPositive ? 'text-emerald-600' : 'text-red-500',
            )}
          >
            {isPositive ? '+' : ''}
            {change.toFixed(1)}%
          </span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
