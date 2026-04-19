'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  MinusSignIcon,
  PlusSignIcon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons'
import { getInitials } from '@/lib/utils/format'

interface RestockProductRowProps {
  id: string
  name: string
  uom: string
  containerCapacity: number
  count: number
  onCountChange: (id: string, count: number) => void
  onRemove: (id: string) => void
}

export function RestockProductRow({
  id,
  name,
  uom,
  containerCapacity,
  count,
  onCountChange,
  onRemove,
}: RestockProductRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={undefined} />
          <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-800">{name}</span>
          <span className="text-[11px] text-gray-400">
            {count * containerCapacity} {uom.toLowerCase()} total
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400"
            onClick={() => onCountChange(id, count - 1)}
            disabled={count <= 1}
          >
            <HugeiconsIcon icon={MinusSignIcon} size={10} strokeWidth={2} />
          </Button>
          <span className="w-5 text-center text-xs font-medium">{count}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400"
            onClick={() => onCountChange(id, count + 1)}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={10} strokeWidth={2} />
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-300 hover:text-red-400"
          onClick={() => onRemove(id)}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={2} />
        </Button>
      </div>
    </div>
  )
}
