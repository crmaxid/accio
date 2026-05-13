'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { PaginationMeta } from '@/types'

const LIMIT_OPTIONS = [10, 15, 20, 50, 100]

interface DataTableFooterProps {
  meta: PaginationMeta
  isLoading: boolean
  onPageChange: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function DataTableFooter({
  meta,
  isLoading,
  onPageChange,
  onLimitChange,
}: DataTableFooterProps) {
  const canPrev = meta.page > 1
  const canNext = meta.page < meta.totalPages

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
      <div className="flex items-center gap-3">
        <p className="text-xs text-gray-400">
          {meta.total > 0
            ? `${(meta.page - 1) * meta.limit + 1}–${Math.min(meta.page * meta.limit, meta.total)} of ${meta.total} results`
            : 'No results'}
        </p>
        {onLimitChange && (
          <Select
            value={String(meta.limit)}
            onValueChange={(v) => onLimitChange(Number(v))}
          >
            <SelectTrigger className="h-8 w-auto gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-xs font-medium text-gray-500 shadow-none transition-all hover:border-gray-300 hover:text-gray-700 [&>svg]:hidden">
              <span className="text-gray-400">Rows</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg">
              {LIMIT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={String(opt)} className="text-xs">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg text-gray-400 hover:text-gray-600"
          onClick={() => onPageChange(1)}
          disabled={!canPrev || isLoading}
        >
          <HugeiconsIcon icon={ArrowLeftDoubleIcon} size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg text-gray-400 hover:text-gray-600"
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!canPrev || isLoading}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        </Button>
        <span className="min-w-20 text-center text-xs text-gray-500">
          Page {meta.page} of {meta.totalPages || 1}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg text-gray-400 hover:text-gray-600"
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!canNext || isLoading}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg text-gray-400 hover:text-gray-600"
          onClick={() => onPageChange(meta.totalPages)}
          disabled={!canNext || isLoading}
        >
          <HugeiconsIcon icon={ArrowRightDoubleIcon} size={16} />
        </Button>
      </div>
    </div>
  )
}
