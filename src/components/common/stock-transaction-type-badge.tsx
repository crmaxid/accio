import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react'
import {
  PackageAdd01Icon,
  PackageRemove01Icon,
  ShoppingCartCheckOutIcon,
  ReturnRequestIcon,
  QrCodeIcon,
  UserIcon,
  CrownIcon,
  DeliverySent01Icon,
} from '@hugeicons/core-free-icons'

type TypeConfig = {
  label: string
  icon: HugeiconsIconProps['icon']
  className: string
}

const typeConfig: Record<string, TypeConfig> = {
  ADJUSTMENT_IN: {
    label: 'Adjustment In',
    icon: PackageAdd01Icon,
    className: 'bg-green-50! text-green-700! border-green-100!',
  },
  ADJUSTMENT_OUT: {
    label: 'Adjustment Out',
    icon: PackageRemove01Icon,
    className: 'bg-red-50! text-red-700! border-red-100!',
  },
  SALE_OUT: {
    label: 'Sale Out',
    icon: ShoppingCartCheckOutIcon,
    className: 'bg-orange-50! text-orange-700! border-orange-100!',
  },
  DIRECT_SALE_OUT: {
    label: 'Direct Sale Out',
    icon: DeliverySent01Icon,
    className: 'bg-amber-50! text-amber-700! border-amber-100!',
  },
  RETURN_IN: {
    label: 'Return In',
    icon: ReturnRequestIcon,
    className: 'bg-blue-50! text-blue-700! border-blue-100!',
  },
  QR_TRANSFER_IN: {
    label: 'QR Transfer In',
    icon: QrCodeIcon,
    className: 'bg-violet-50! text-violet-700! border-violet-100!',
  },
  EMPLOYEE_BENEFIT_OUT: {
    label: 'Employee Benefit',
    icon: UserIcon,
    className: 'bg-indigo-50! text-indigo-700! border-indigo-100!',
  },
  OWNER_BENEFIT_OUT: {
    label: 'Owner Benefit',
    icon: CrownIcon,
    className: 'bg-pink-50! text-pink-700! border-pink-100!',
  },
}

const fallback: TypeConfig = {
  label: 'Unknown',
  icon: PackageAdd01Icon,
  className: 'bg-gray-50! text-gray-500! border-gray-100!',
}

export function StockTransactionTypeBadge({ value }: { value: string }) {
  const config = typeConfig[value] ?? fallback

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
