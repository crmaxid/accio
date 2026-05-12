'use client'

import { DeliveryProduct } from '@/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils/format'

interface DeliveryProductsProps {
  items: DeliveryProduct[]
  isLoading: boolean
}

export default function DeliveryProducts({
  items,
  isLoading,
}: DeliveryProductsProps) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Delivered Products</CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="py-8 text-center text-xs text-gray-400">
            No products on this delivery.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((item) => {
              const product = item.stockReplenishmentProduct.product
              const realSku = product.sku.find((s) => !s.virtual)
              const packageType =
                item.packageType.charAt(0).toUpperCase() +
                item.packageType.slice(1).toLowerCase()

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={undefined} />
                      <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
                        {getInitials(product.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-gray-800">
                          {product.name}
                        </span>
                        {realSku && (
                          <span className="inline-flex h-4 items-center rounded border border-gray-200 bg-white px-1.5 font-mono text-[10px] text-gray-500">
                            {realSku.code}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {packageType}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-0.5 rounded-lg bg-gray-100 px-3 py-1.5 text-center">
                    <span className="text-sm font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {packageType}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>

      {!isLoading && items.length > 0 && (
        <CardFooter className="flex items-center justify-between border-t">
          <span className="text-xs text-gray-500">
            {items.length} product{items.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs">
            <span className="mr-4 text-gray-500">Total Quantity</span>
            <span className="text-sm font-semibold text-gray-900">
              {totalQuantity}
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
