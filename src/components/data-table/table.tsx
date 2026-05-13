'use client'

import type { ReactNode } from 'react'
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
import { Skeleton } from '@/components/ui/skeleton'
import { HugeiconsIcon } from '@hugeicons/react'
import { Table01Icon } from '@hugeicons/core-free-icons'
import type { PaginationMeta } from '@/types'
import { DataTableToolbar } from './toolbar'
import { DataTableFooter } from './footer'
import { useSearchDebounce } from './use-search-debounce'
import type {
  FilterOption,
  FilterConfig,
  SearchConfig,
  DateRangeConfig,
  TableButtonConfig,
  TableButtonsConfig,
} from './types'

// Re-export types so existing consumer imports continue to work
export type {
  FilterOption,
  FilterConfig,
  SearchConfig,
  DateRangeConfig,
  TableButtonConfig,
  TableButtonsConfig,
}

const DEFAULT_META: PaginationMeta = {
  total: 0,
  page: 1,
  limit: 15,
  totalPages: 1,
}

// Stable empty reference — avoids forcing TanStack Table to recompute on every
// render when data is undefined (e.g. during the initial loading state)
const EMPTY_DATA: never[] = []

const SKELETON_WIDTHS = ['w-3/4', 'w-1/2', 'w-full', 'w-2/3', 'w-5/6']
const SKELETON_ROW_COUNT = 10

const coreRowModel = getCoreRowModel()

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data?: T[]
  meta?: PaginationMeta
  isLoading?: boolean
  onPageChange: (page: number) => void
  onLimitChange?: (limit: number) => void
  onRowClick?: (row: T) => void
  search?: SearchConfig
  filters?: FilterConfig[]
  dateRange?: DateRangeConfig
  buttons?: TableButtonsConfig
  actions?: ReactNode
}

export default function DataTable<T>({
  columns,
  data,
  meta = DEFAULT_META,
  isLoading = false,
  onPageChange,
  onLimitChange,
  onRowClick,
  search,
  filters,
  dateRange,
  buttons,
  actions,
}: DataTableProps<T>) {
  const { searchInput, setSearchInput } = useSearchDebounce(
    search?.value,
    search?.onChange,
  )

  const table = useReactTable({
    data: (data ?? EMPTY_DATA) as T[],
    columns,
    getCoreRowModel: coreRowModel,
    manualPagination: true,
    rowCount: meta.total,
  })

  const hasToolbar =
    search || filters?.length || dateRange || buttons || actions

  return (
    <div className="flex flex-col gap-3">
      {hasToolbar && (
        <DataTableToolbar
          search={search}
          searchInput={searchInput}
          onSearchInput={setSearchInput}
          filters={filters}
          dateRange={dateRange}
          buttons={buttons}
          actions={actions}
        />
      )}

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-200 bg-gray-50/40 hover:bg-gray-50/40"
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
              Array.from({
                length: Math.min(meta.limit, SKELETON_ROW_COUNT),
              }).map((_, i) => (
                <TableRow key={i} className="border-b border-gray-100">
                  {columns.map((_, j) => (
                    <TableCell key={j} className="px-4 py-3">
                      <Skeleton
                        className={`h-4 rounded-md ${SKELETON_WIDTHS[(i * 3 + j) % SKELETON_WIDTHS.length]}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
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
                  className="h-48 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <HugeiconsIcon
                      icon={Table01Icon}
                      size={28}
                      className="text-gray-200"
                    />
                    <p className="text-xs text-gray-400">No data found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataTableFooter
          meta={meta}
          isLoading={isLoading}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      </div>
    </div>
  )
}
