'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RestockDeliveryItem } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  DeliveryTruck01Icon,
  Calendar01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons'
import { DeliveryStatusBadge } from '@/components/common'
import { formatDateTime } from '@/lib/utils/format'

interface RestockDeliveryProps {
  deliveries: RestockDeliveryItem[]
  isLoading: boolean
}

export default function RestockDelivery({
  deliveries,
  isLoading,
}: RestockDeliveryProps) {
  const { team } = useParams<{ team: string }>()

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Delivery Information</CardTitle>
        {!isLoading && deliveries.length > 0 && (
          <CardDescription>
            {deliveries.length}{' '}
            {deliveries.length === 1 ? 'delivery' : 'deliveries'}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
        ) : deliveries.length === 0 ? (
          <p className="py-6 text-center text-xs text-gray-400">
            No deliveries scheduled yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {deliveries.map((delivery) => {
              const { date } = formatDateTime(delivery.deliveryDate)
              return (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={DeliveryTruck01Icon}
                        size={12}
                        strokeWidth={2}
                        className="text-gray-400"
                      />
                      <span className="text-xs font-medium text-gray-700">
                        {delivery.number}
                      </span>
                      <DeliveryStatusBadge value={delivery.status} />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                      <HugeiconsIcon
                        icon={Calendar01Icon}
                        size={11}
                        strokeWidth={2}
                      />
                      {date}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2.5 text-xs"
                    asChild
                  >
                    <Link href={`/${team}/production/delivery/${delivery.id}`}>
                      View
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={12}
                        strokeWidth={2}
                      />
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
