'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  MinusSignIcon,
  PlusSignIcon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons'
import { getInitials } from '@/lib/utils/format'
import { type SkuOrderSelection } from '@/types'

interface SaleProductRowProps {
  product: SkuOrderSelection
  quantity: number
  unitPrice: number
  onQuantityChange: (skuId: string, quantity: number) => void
  onUnitPriceChange: (skuId: string, price: number) => void
  onRemove: (skuId: string) => void
}

export function SaleProductRow({
  product,
  quantity,
  unitPrice,
  onQuantityChange,
  onUnitPriceChange,
  onRemove,
}: SaleProductRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
            {getInitials(product.product.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-800">
            {product.product.name}
          </span>
          <span className="font-mono text-[11px] text-gray-400">
            {product.code}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={0}
          value={unitPrice}
          onChange={(e) =>
            onUnitPriceChange(product.id, parseFloat(e.target.value) || 0)
          }
          className="h-7 w-28 [appearance:textfield] text-right font-mono text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="Price"
        />
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400"
            onClick={() => onQuantityChange(product.id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <HugeiconsIcon icon={MinusSignIcon} size={10} strokeWidth={2} />
          </Button>
          <span className="w-5 text-center text-xs font-medium">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400"
            onClick={() => onQuantityChange(product.id, quantity + 1)}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={10} strokeWidth={2} />
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-300 hover:text-red-400"
          onClick={() => onRemove(product.id)}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={2} />
        </Button>
      </div>
    </div>
  )
}
