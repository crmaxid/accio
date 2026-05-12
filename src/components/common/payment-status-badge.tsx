import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react'
import {
  Invoice01Icon,
  CancelCircleIcon,
  MoneyReceiveSquareIcon,
  CheckmarkBadge01Icon,
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
    className: 'bg-red-50! text-red-700! border-red-100!',
  },
  PARTIALLY_PAID: {
    label: 'Partially Paid',
    icon: MoneyReceiveSquareIcon,
    className: 'bg-amber-50! text-amber-700! border-amber-100!',
  },
  FULLY_PAID: {
    label: 'Fully Paid',
    icon: CheckmarkBadge01Icon,
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
  icon: Invoice01Icon,
  className: 'bg-gray-50! text-gray-500! border-gray-100!',
}

export function PaymentStatusBadge({ value }: { value: string }) {
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
