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
  Calendar01Icon,
  Cancel01Icon,
  FilterIcon,
  Add01Icon,
  Edit02Icon,
  FileExportIcon,
} from '@hugeicons/core-free-icons'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import type { DateRange } from 'react-day-picker'
import { format } from 'date-fns'

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

export interface DateRangeConfig {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
}

export interface TableButtonConfig {
  label?: string
  onClick: () => void
}

export interface TableButtonsConfig {
  create?: TableButtonConfig
  update?: TableButtonConfig
  export?: TableButtonConfig
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data?: T[]
  meta?: PaginationMeta
  isLoading?: boolean
  onPageChange: (page: number) => void
  onRowClick?: (row: T) => void
  search?: SearchConfig
  filters?: FilterConfig[]
  dateRange?: DateRangeConfig
  buttons?: TableButtonsConfig
  actions?: React.ReactNode
}

export default function DataTable<T>({
  columns,
  data = [],
  meta = DEFAULT_META,
  isLoading = false,
  onPageChange,
  onRowClick,
  search,
  filters,
  dateRange,
  buttons,
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
  const hasToolbar =
    search || filters?.length || dateRange || buttons || actions

  return (
    <div className="flex flex-col gap-3">
      {hasToolbar && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {search && (
              <div className="relative">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={13}
                  className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400"
                />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={search.placeholder ?? 'Search...'}
                  className="h-8 w-56 rounded-full border-gray-200 bg-gray-50 pl-8.5 text-xs shadow-none transition-all focus-visible:w-72 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-gray-200"
                />
              </div>
            )}
            {filters?.map((filter) => {
              const isActive = !!filter.value && filter.value !== 'ALL'
              return (
                <Select
                  key={filter.label}
                  value={filter.value}
                  onValueChange={filter.onChange}
                >
                  <SelectTrigger
                    className={`h-8 w-auto gap-1.5 rounded-full border px-3 text-xs font-medium shadow-none transition-all [&>svg]:hidden ${
                      isActive
                        ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <HugeiconsIcon
                      icon={FilterIcon}
                      size={12}
                      className="shrink-0"
                    />
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-lg">
                    {filter.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            })}
            {dateRange && (
              <div className="flex items-center gap-1.5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-active={!!dateRange.value?.from}
                      className="h-8 gap-1.5 rounded-full border-gray-200 bg-white px-3 text-xs font-medium text-gray-500 shadow-none transition-all hover:border-gray-300 hover:text-gray-700 data-[active=true]:border-gray-900 data-[active=true]:bg-gray-900 data-[active=true]:text-white data-[active=true]:hover:bg-gray-800"
                    >
                      <HugeiconsIcon
                        icon={Calendar01Icon}
                        size={12}
                        className="shrink-0"
                      />
                      {dateRange.value?.from ? (
                        dateRange.value.to ? (
                          <>
                            {format(dateRange.value.from, 'MMM d')}
                            {' – '}
                            {format(dateRange.value.to, 'MMM d, yyyy')}
                          </>
                        ) : (
                          format(dateRange.value.from, 'MMM d, yyyy')
                        )
                      ) : (
                        'Date range'
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto rounded-xl border border-gray-100 p-3 shadow-xl"
                    align="start"
                  >
                    <Calendar
                      autoFocus
                      mode="range"
                      defaultMonth={dateRange.value?.from}
                      selected={dateRange.value}
                      onSelect={(range) => {
                        if (
                          range?.from &&
                          range?.to &&
                          range.from.getTime() === range.to.getTime()
                        ) {
                          dateRange.onChange({
                            from: range.from,
                            to: undefined,
                          })
                        } else {
                          dateRange.onChange(range)
                        }
                      }}
                      numberOfMonths={2}
                      timeZone={
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                      }
                      className="[--cell-size:--spacing(8)]"
                    />
                  </PopoverContent>
                </Popover>
                {(dateRange.value?.from || dateRange.value?.to) && (
                  <button
                    onClick={() => dateRange.onChange(undefined)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={12} />
                  </button>
                )}
              </div>
            )}
          </div>
          {(buttons || actions) && (
            <div className="flex items-center gap-2">
              {buttons?.export && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={buttons.export.onClick}
                  className="h-8 gap-1.5 rounded-full border-gray-200 px-3 text-xs font-medium text-gray-500 shadow-none hover:border-gray-300 hover:text-gray-700"
                >
                  <HugeiconsIcon
                    icon={FileExportIcon}
                    size={12}
                    strokeWidth={2}
                  />
                  {buttons.export.label ?? 'Export'}
                </Button>
              )}
              {buttons?.update && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={buttons.update.onClick}
                  className="h-8 gap-1.5 rounded-full border-gray-200 px-3 text-xs font-medium text-gray-500 shadow-none hover:border-gray-300 hover:text-gray-700"
                >
                  <HugeiconsIcon icon={Edit02Icon} size={12} strokeWidth={2} />
                  {buttons.update.label ?? 'Update'}
                </Button>
              )}
              {buttons?.create && (
                <Button
                  size="sm"
                  onClick={buttons.create.onClick}
                  className="h-8 gap-1.5 rounded-full px-3 text-xs font-medium shadow-none"
                >
                  <HugeiconsIcon icon={Add01Icon} size={12} strokeWidth={2} />
                  {buttons.create.label ?? 'Create'}
                </Button>
              )}
              {actions}
            </div>
          )}
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
                  className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={
                    onRowClick ? () => onRowClick(row.original) : undefined
                  }
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
