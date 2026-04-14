'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/lib/utils/format'
import { type ProductSales } from '@/types'

interface TopProductsProps {
  data?: ProductSales[]
  isLoading?: boolean
  period: string
}

export function TopProducts({ data, isLoading, period }: TopProductsProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best-selling products this {period}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                <Skeleton className="h-3 flex-1" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {data.map((product, index) => (
              <div
                key={product.productId}
                className="hover:bg-muted/50 flex items-center gap-3 rounded-md px-2 py-1.5"
              >
                <span className="bg-muted text-muted-foreground flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">
                    {product.productName}
                  </p>
                  {product.mainSkuCode && (
                    <p className="text-muted-foreground text-[11px]">
                      {product.mainSkuCode}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium tabular-nums">
                    {product.totalSold} sold
                  </p>
                  <p className="text-muted-foreground text-[11px] tabular-nums">
                    {formatCurrency(product.totalRevenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
