'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HugeiconsIcon } from '@hugeicons/react'
import { MinusSignIcon, PlusSignIcon } from '@hugeicons/core-free-icons'
import { getInitials } from '@/lib/utils/format'
import { type SkuStockSelection } from '@/types'

interface StockAdjustmentRowProps {
  item: SkuStockSelection
  quantity: number
  onQuantityChange: (skuId: string, quantity: number) => void
}

export function StockAdjustmentRow({
  item,
  quantity,
  onQuantityChange,
}: StockAdjustmentRowProps) {
  const current = item.stock?.actualQuantity ?? 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 rounded-lg">
          <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
            {getInitials(item.product.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-800">
            {item.product.name}
          </span>
          <span className="font-mono text-[11px] text-gray-400">
            {item.code}
          </span>
          <span className="text-[11px] text-gray-400">Current: {current}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-400"
          onClick={() => onQuantityChange(item.id, quantity - 1)}
          disabled={quantity <= 0}
        >
          <HugeiconsIcon icon={MinusSignIcon} size={10} strokeWidth={2} />
        </Button>
        <Input
          type="number"
          min={0}
          value={quantity}
          onChange={(e) =>
            onQuantityChange(item.id, parseInt(e.target.value || '0', 10) || 0)
          }
          className="h-7 w-16 [appearance:textfield] border-0 text-center font-mono text-xs focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-400"
          onClick={() => onQuantityChange(item.id, quantity + 1)}
        >
          <HugeiconsIcon icon={PlusSignIcon} size={10} strokeWidth={2} />
        </Button>
      </div>
    </div>
  )
}
