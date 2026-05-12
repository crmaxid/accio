'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  DeliveryTruck01Icon,
  PackageIcon,
} from '@hugeicons/core-free-icons'
import { format, addDays } from 'date-fns'

interface RestockProgressProps {
  status: string
  paymentStatus: string
  deliveryStatus: string
  isLoading?: boolean
}

function getProgress(
  paymentStatus: string,
  deliveryStatus: string,
  status: string,
) {
  const paymentProgress =
    paymentStatus === 'FULLY_PAID'
      ? 50
      : paymentStatus === 'PARTIALLY_PAID'
        ? 25
        : 0

  const deliveryProgress =
    deliveryStatus === 'DELIVERED'
      ? 50
      : deliveryStatus === 'PARTIALLY_DELIVERED' ||
          deliveryStatus === 'IN_PROGRESS' ||
          deliveryStatus === 'ON_PROGRESS'
        ? 25
        : 0

  const total = paymentProgress + deliveryProgress

  let stepIndex = 0
  if (total === 100 && status === 'COMPLETED') stepIndex = 3
  else if (deliveryProgress > 0) stepIndex = 2
  else if (paymentProgress > 0 || status === 'IN_PROGRESS') stepIndex = 1

  return {
    total: Math.max(25, total),
    paymentProgress,
    deliveryProgress,
    stepIndex,
  }
}

function getStepStatus(
  index: number,
  paymentStatus: string,
  deliveryStatus: string,
  status: string,
): 'completed' | 'active' | 'pending' {
  if (index === 0) return 'completed'
  if (index === 1) {
    if (paymentStatus === 'FULLY_PAID') return 'completed'
    if (paymentStatus === 'PARTIALLY_PAID' || status === 'IN_PROGRESS')
      return 'active'
    return 'pending'
  }
  if (index === 2) {
    if (deliveryStatus === 'DELIVERED') return 'completed'
    if (
      deliveryStatus === 'PARTIALLY_DELIVERED' ||
      deliveryStatus === 'IN_PROGRESS' ||
      deliveryStatus === 'ON_PROGRESS'
    )
      return 'active'
    return 'pending'
  }
  if (index === 3) {
    if (
      paymentStatus === 'FULLY_PAID' &&
      deliveryStatus === 'DELIVERED' &&
      status === 'COMPLETED'
    )
      return 'completed'
    return 'pending'
  }
  return 'pending'
}

export default function RestockProgress({
  status,
  paymentStatus,
  deliveryStatus,
  isLoading,
}: RestockProgressProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Order Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    )
  }

  const { total, paymentProgress, deliveryProgress } = getProgress(
    paymentStatus,
    deliveryStatus,
    status,
  )
  const isCancelled = status === 'CANCELLED'
  const estimatedDelivery = format(addDays(new Date(), 7), 'dd MMM yyyy')

  const progressBadgeClass =
    total === 100
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : total >= 75
        ? 'bg-orange-50 text-orange-700 border-orange-100'
        : total >= 50
          ? 'bg-blue-50 text-blue-700 border-blue-100'
          : 'bg-gray-50 text-gray-500 border-gray-100'

  const steps = [
    {
      id: 'review',
      label: 'Under Review',
      icon: Clock01Icon,
      description: 'Order initiated and under review',
    },
    {
      id: 'payment',
      label: 'Payment Processing',
      icon: PackageIcon,
      description:
        paymentStatus === 'FULLY_PAID'
          ? 'Payment completed'
          : paymentStatus === 'PARTIALLY_PAID'
            ? 'Partial payment received'
            : 'Awaiting payment',
    },
    {
      id: 'delivery',
      label: 'Delivery Progress',
      icon: DeliveryTruck01Icon,
      description:
        deliveryStatus === 'DELIVERED'
          ? 'Delivery completed'
          : deliveryStatus === 'PARTIALLY_DELIVERED'
            ? 'Partial delivery in progress'
            : deliveryStatus === 'IN_PROGRESS' ||
                deliveryStatus === 'ON_PROGRESS'
              ? 'Items in transit'
              : 'Preparing for delivery',
    },
    {
      id: 'complete',
      label: 'Completed',
      icon: CheckmarkCircle01Icon,
      description: 'Order fully completed',
    },
  ]

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Order Progress</CardTitle>
        {!isCancelled && (
          <CardDescription>Est. delivery {estimatedDelivery}</CardDescription>
        )}
        <CardAction>
          {isCancelled ? (
            <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-2 text-[11px] font-medium text-red-600">
              <HugeiconsIcon icon={Cancel01Icon} size={11} strokeWidth={2} />
              Cancelled
            </span>
          ) : (
            <span
              className={`inline-flex h-6 items-center rounded-full border px-2 text-[11px] font-medium ${progressBadgeClass}`}
            >
              {total}% complete
            </span>
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-4">
        {!isCancelled && (
          <div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-orange-500 transition-all duration-500"
                style={{ width: `${total}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${paymentProgress > 0 ? 'bg-emerald-500' : 'bg-gray-200'}`}
                />
                Payment {paymentProgress}%
              </span>
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${deliveryProgress > 0 ? 'bg-blue-500' : 'bg-gray-200'}`}
                />
                Delivery {deliveryProgress}%
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(
              index,
              paymentStatus,
              deliveryStatus,
              status,
            )

            return (
              <div
                key={step.id}
                className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    stepStatus === 'completed'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                      : stepStatus === 'active'
                        ? 'animate-pulse border-orange-200 bg-orange-50 text-orange-500'
                        : 'border-gray-200 bg-white text-gray-300'
                  }`}
                >
                  <HugeiconsIcon icon={step.icon} size={15} strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-medium ${
                      stepStatus === 'completed'
                        ? 'text-emerald-700'
                        : stepStatus === 'active'
                          ? 'text-orange-600'
                          : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
