import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react'
import {
  Clock01Icon,
  DeliveryTruck01Icon,
  PackageDeliveredIcon,
  CancelCircleIcon,
  PackageMovingIcon,
} from '@hugeicons/core-free-icons'

type StatusConfig = {
  label: string
  icon: HugeiconsIconProps['icon']
  className: string
}

const statusConfig: Record<string, StatusConfig> = {
  PENDING: {
    label: 'Pending',
    icon: Clock01Icon,
    className: 'bg-amber-50! text-amber-700! border-amber-100!',
  },
  ON_PROGRESS: {
    label: 'On Progress',
    icon: DeliveryTruck01Icon,
    className: 'bg-blue-50! text-blue-700! border-blue-100!',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    icon: DeliveryTruck01Icon,
    className: 'bg-blue-50! text-blue-700! border-blue-100!',
  },
  PARTIALLY_DELIVERED: {
    label: 'Partially Delivered',
    icon: PackageMovingIcon,
    className: 'bg-violet-50! text-violet-700! border-violet-100!',
  },
  DELIVERED: {
    label: 'Delivered',
    icon: PackageDeliveredIcon,
    className: 'bg-emerald-50! text-emerald-700! border-emerald-100!',
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: CancelCircleIcon,
    className: 'bg-red-50! text-red-700! border-red-100!',
  },
}

const fallback: StatusConfig = {
  label: 'Unknown',
  icon: Clock01Icon,
  className: 'bg-gray-50! text-gray-500! border-gray-100!',
}

export function DeliveryStatusBadge({ value }: { value: string }) {
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
