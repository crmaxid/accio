import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react'
import {
  Invoice01Icon,
  PauseCircleIcon,
  Clock01Icon,
  PackageMovingIcon,
  LocationCheckIcon,
  DeliveryTruck01Icon,
  PackageDeliveredIcon,
  CheckmarkBadge01Icon,
  CancelCircleIcon,
  Cancel01Icon,
  PackageReceiveIcon,
  PackageSentIcon,
  PackageProcessIcon,
  ShippingTruckIcon,
  ArrowReloadHorizontalIcon,
  ReturnRequestIcon,
} from '@hugeicons/core-free-icons'

type StatusConfig = {
  label: string
  icon: HugeiconsIconProps['icon']
  className: string
}

const statusConfig: Record<string, StatusConfig> = {
  UNPAID: {
    label: 'Unpaid',
    icon: Invoice01Icon,
    className: 'bg-amber-50! text-amber-700! border-amber-100!',
  },
  ON_HOLD: {
    label: 'On Hold',
    icon: PauseCircleIcon,
    className: 'bg-orange-50! text-orange-700! border-orange-100!',
  },
  AWAITING_SHIPMENT: {
    label: 'Awaiting Shipment',
    icon: Clock01Icon,
    className: 'bg-blue-50! text-blue-700! border-blue-100!',
  },
  PARTIALLY_SHIPPING: {
    label: 'Partially Shipping',
    icon: PackageMovingIcon,
    className: 'bg-violet-50! text-violet-700! border-violet-100!',
  },
  AWAITING_COLLECTION: {
    label: 'Awaiting Collection',
    icon: LocationCheckIcon,
    className: 'bg-indigo-50! text-indigo-700! border-indigo-100!',
  },
  IN_TRANSIT: {
    label: 'In Transit',
    icon: DeliveryTruck01Icon,
    className: 'bg-cyan-50! text-cyan-700! border-cyan-100!',
  },
  DELIVERED: {
    label: 'Delivered',
    icon: PackageDeliveredIcon,
    className: 'bg-emerald-50! text-emerald-700! border-emerald-100!',
  },
  COMPLETED: {
    label: 'Completed',
    icon: CheckmarkBadge01Icon,
    className: 'bg-green-50! text-green-700! border-green-100!',
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: CancelCircleIcon,
    className: 'bg-red-50! text-red-700! border-red-100!',
  },
  CANCEL: {
    label: 'Cancel',
    icon: CancelCircleIcon,
    className: 'bg-red-50! text-red-700! border-red-100!',
  },
  TO_CONFIRM_RECEIVE: {
    label: 'Awaiting Confirmation',
    icon: PackageReceiveIcon,
    className: 'bg-yellow-50! text-yellow-700! border-yellow-100!',
  },
  READY_TO_SHIP: {
    label: 'Ready to Ship',
    icon: PackageSentIcon,
    className: 'bg-blue-50! text-blue-700! border-blue-100!',
  },
  PROCESSED: {
    label: 'Processed',
    icon: PackageProcessIcon,
    className: 'bg-sky-50! text-sky-700! border-sky-100!',
  },
  SHIPPED: {
    label: 'Shipped',
    icon: ShippingTruckIcon,
    className: 'bg-teal-50! text-teal-700! border-teal-100!',
  },
  IN_CANCEL: {
    label: 'Cancellation in Progress',
    icon: Cancel01Icon,
    className: 'bg-rose-50! text-rose-700! border-rose-100!',
  },
  RETRY_SHIP: {
    label: 'Retry Shipping',
    icon: ArrowReloadHorizontalIcon,
    className: 'bg-amber-50! text-amber-700! border-amber-100!',
  },
  TO_RETURN: {
    label: 'To Return',
    icon: ReturnRequestIcon,
    className: 'bg-pink-50! text-pink-700! border-pink-100!',
  },
}

const fallback: StatusConfig = {
  label: 'Unknown',
  icon: Cancel01Icon,
  className: 'bg-gray-50! text-gray-500! border-gray-100!',
}

export function OrderStatusBadge({ value }: { value: string }) {
  const config = statusConfig[value] ?? fallback

  return (
    <Badge
      variant="outline"
      className={cn('h-6 gap-1.5 px-2 text-xs font-medium', config.className)}
    >
      <HugeiconsIcon icon={config.icon} size={12} strokeWidth={2} />
      {config.label}
    </Badge>
  )
}
