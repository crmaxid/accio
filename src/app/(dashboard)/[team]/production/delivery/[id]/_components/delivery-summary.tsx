'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { DeliveryDetail } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DeliveryStatusBadge } from '@/components/common'
import { formatDateTime } from '@/lib/utils/format'

interface DeliverySummaryProps {
  delivery: DeliveryDetail | null
  isLoading: boolean
}

export default function DeliverySummary({
  delivery,
  isLoading,
}: DeliverySummaryProps) {
  const { team } = useParams<{ team: string }>()

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!delivery) return null

  const { date } = formatDateTime(delivery.deliveryDate)
  const totalQuantity = delivery.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  )

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-gray-100 pt-0">
        <div className="flex flex-col gap-1 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Delivery Number
          </span>
          <span className="font-mono text-sm font-semibold text-gray-800">
            {delivery.number}
          </span>
        </div>

        <div className="flex flex-col gap-2 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Status
          </span>
          <DeliveryStatusBadge value={delivery.status} />
        </div>

        <div className="flex flex-col gap-1 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Restock Request
          </span>
          <Link
            href={`/${team}/production/restock/${delivery.stockReplenishmentRequest.id}`}
            className="w-fit font-mono text-sm font-semibold text-gray-800 underline-offset-2 hover:underline"
          >
            {delivery.stockReplenishmentRequest.number}
          </Link>
        </div>

        <div className="flex flex-col gap-1 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Delivery Date
          </span>
          <span className="text-xs text-gray-700">{date}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3">
          <div className="flex flex-col gap-1 rounded-lg bg-gray-50 px-3 py-2">
            <span className="text-[11px] text-gray-400">Products</span>
            <span className="text-sm font-semibold text-gray-800">
              {delivery.items.length}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-gray-50 px-3 py-2">
            <span className="text-[11px] text-gray-400">Total Qty</span>
            <span className="text-sm font-semibold text-gray-800">
              {totalQuantity}
            </span>
          </div>
        </div>

        {delivery.notes && (
          <div className="flex flex-col gap-1 py-3">
            <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
              Notes
            </span>
            <p className="text-xs leading-relaxed text-gray-600">
              {delivery.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
