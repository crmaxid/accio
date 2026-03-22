import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Uom } from '@/enums/uom.enum'
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react'
import {
  WeightScale01Icon,
  DropletIcon,
  Layers01Icon,
  HashtagIcon,
  MilkBottleIcon,
  DeliveryBox01Icon,
  PackageIcon,
} from '@hugeicons/core-free-icons'

type UomConfig = {
  icon: HugeiconsIconProps['icon']
  className: string
}

const uomConfig: Record<Uom, UomConfig> = {
  [Uom.KG]: {
    icon: WeightScale01Icon,
    className: 'bg-blue-50! text-blue-700! border-blue-100!',
  },
  [Uom.LITER]: {
    icon: DropletIcon,
    className: 'bg-cyan-50! text-cyan-700! border-cyan-100!',
  },
  [Uom.PCS]: {
    icon: PackageIcon,
    className: 'bg-violet-50! text-violet-700! border-violet-100!',
  },
  [Uom.PIECES]: {
    icon: Layers01Icon,
    className: 'bg-violet-50! text-violet-700! border-violet-100!',
  },
  [Uom.UNIT]: {
    icon: HashtagIcon,
    className: 'bg-gray-100! text-gray-600! border-gray-200!',
  },
  [Uom.BOTTLE]: {
    icon: MilkBottleIcon,
    className: 'bg-amber-50! text-amber-700! border-amber-100!',
  },
  [Uom.BOX]: {
    icon: DeliveryBox01Icon,
    className: 'bg-orange-50! text-orange-700! border-orange-100!',
  },
}

interface UomBadgeProps {
  uom: string | undefined | null
  className?: string
}

export function UomBadge({ uom, className }: UomBadgeProps) {
  if (!uom) return <span className="text-gray-400">—</span>

  const config = uomConfig[uom as Uom]

  return (
    <Badge
      variant="outline"
      className={cn(
        'h-6 gap-1.5 px-2 text-xs font-medium',
        config?.className,
        className,
      )}
    >
      {config && <HugeiconsIcon icon={config.icon} size={12} strokeWidth={2} />}
      {uom}
    </Badge>
  )
}
