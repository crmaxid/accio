import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import type { DateRange } from 'react-day-picker'
import { StockTransaction } from '@/types'
import { DateCell, StockTransactionTypeBadge } from '@/components/common'
import { DateRangeConfig } from '@/components/data-table/table'
import { formatDateParam } from '@/lib/utils/format'

const MINUS_TYPES = new Set([
  'ADJUSTMENT_OUT',
  'SALE_OUT',
  'EMPLOYEE_BENEFIT_OUT',
  'OWNER_BENEFIT_OUT',
  'DIRECT_SALE_OUT',
])

export const useStockTransactionTable = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const columns: ColumnDef<StockTransaction>[] = [
    {
      id: 'product',
      header: 'Product',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.sku.product.name}</span>
          <span className="text-xs text-gray-400">{row.original.sku.code}</span>
        </div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => {
        const isMinus = MINUS_TYPES.has(row.original.type)
        return (
          <span
            className={`font-semibold ${isMinus ? 'text-red-500' : 'text-emerald-600'}`}
          >
            {isMinus ? '− ' : '+ '}
            {row.original.quantity}
          </span>
        )
      },
    },
    {
      accessorKey: 'previousStock',
      header: 'Before',
    },
    {
      accessorKey: 'currentStock',
      header: 'After',
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <StockTransactionTypeBadge value={row.original.type} />
      ),
    },
    {
      id: 'createdBy',
      header: 'Created By',
      cell: ({ row }) => (
        <span>
          {row.original.createdBy?.name ?? (
            <span className="text-gray-400">System</span>
          )}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => <DateCell iso={row.original.createdAt} />,
    },
  ]

  const dateRangeConfig: DateRangeConfig = {
    value: dateRange,
    onChange: setDateRange,
  }

  const startDate = formatDateParam(dateRange?.from)
  const endDate = formatDateParam(dateRange?.to)

  return { columns, startDate, endDate, dateRangeConfig }
}
