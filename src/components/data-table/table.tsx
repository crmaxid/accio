'use client'

import { useEffect, useRef, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { PaginationMeta } from '@/types'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Search01Icon,
} from '@hugeicons/core-free-icons'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const DEFAULT_META: PaginationMeta = {
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1,
}

export interface FilterOption {
  label: string
  value: string
}

export interface FilterConfig {
  label: string
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
}

export interface SearchConfig {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data?: T[]
  meta?: PaginationMeta
  isLoading?: boolean
  onPageChange: (page: number) => void
  search?: SearchConfig
  filters?: FilterConfig[]
  actions?: React.ReactNode
}

export default function DataTable<T>({
  columns,
  data = [],
  meta = DEFAULT_META,
  isLoading = false,
  onPageChange,
  search,
  filters,
  actions,
}: DataTableProps<T>) {
  const [searchInput, setSearchInput] = useState(search?.value ?? '')
  const onSearchChange = useRef(search?.onChange)
  onSearchChange.current = search?.onChange

  useEffect(() => {
    if (!onSearchChange.current) return
    const timeout = setTimeout(() => {
      onSearchChange.current!(searchInput)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchInput])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: meta.total,
  })

  const canPrev = meta.page > 1
  const canNext = meta.page < meta.totalPages
  const hasToolbar = search || filters?.length || actions

  return (
    <div className="flex flex-col gap-3">
      {hasToolbar && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {search && (
              <div className="relative">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={search.placeholder ?? 'Search...'}
                  className="h-9 w-64 pl-8"
                />
              </div>
            )}
            {filters?.map((filter) => (
              <Select
                key={filter.label}
                value={filter.value}
                onValueChange={filter.onChange}
              >
                <SelectTrigger className="h-9! w-60 text-sm">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-100 bg-gray-50/60 hover:bg-gray-50/60"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-10 px-4 text-[11px] font-semibold tracking-wider text-gray-500 uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: meta.limit }).map((_, i) => (
                <TableRow key={i} className="border-b border-gray-50">
                  {columns.map((_, j) => (
                    <TableCell key={j} className="px-4 py-3">
                      <Skeleton className="h-4 w-full rounded-md" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 text-xs font-medium text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-xs text-gray-400"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-gray-400">
          {meta.total > 0
            ? `${(meta.page - 1) * meta.limit + 1}–${Math.min(meta.page * meta.limit, meta.total)} of ${meta.total} results`
            : 'No results'}
        </p>
        <div className="flex items-center gap-1">
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
        </div>
      </div>
    </div>
  )
}
