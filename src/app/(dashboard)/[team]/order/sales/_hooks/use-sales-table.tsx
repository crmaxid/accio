import { useState } from 'react'
import { Order } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import type { DateRange } from 'react-day-picker'
import {
  DateCell,
  OrderSourceBadge,
  OrderStatusBadge,
} from '@/components/common'
import {
  DateRangeConfig,
  FilterConfig,
  SearchConfig,
} from '@/components/data-table/table'

export const useSalesTable = () => {
  const [search, setSearch] = useState('')
  const [source, setSource] = useState('ALL')
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'externalOrderId',
      header: 'Id',
      cell: ({ row }) => <p>{row.original.externalOrderId ?? '-'}</p>,
    },
    {
      id: 'customer',
      header: 'Customer',
      cell: ({ row }) => <p>{row.original.customer?.name ?? '-'}</p>,
    },
    {
      id: 'provider',
      header: 'Provider',
      cell: ({ row }) => <p>{row.original.shipping?.provider?.name ?? '-'}</p>,
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ row }) => <OrderSourceBadge value={row.original.source} />,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <OrderStatusBadge value={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => <DateCell iso={row.original.createdAt} />,
    },
  ]

  const searchConfig: SearchConfig = {
    value: search,
    onChange: setSearch,
    placeholder: 'Search',
  }

  const filterConfigs: FilterConfig[] = [
    {
      label: 'Source',
      value: source,
      onChange: setSource,
      options: [
        { label: 'All', value: 'ALL' },
        { label: 'Shop | Tokopedia', value: 'SHOP_TOKOPEDIA' },
        { label: 'Shopee', value: 'SHOPEE' },
        { label: 'TikTok Shop', value: 'TIKTOK_SHOP' },
        { label: 'CRMax Platform', value: 'CRMAX_PLATFORM' },
      ],
    },
  ]

  const dateRangeConfig: DateRangeConfig = {
    value: dateRange,
    onChange: setDateRange,
  }

  return {
    columns,
    search,
    source,
    dateRange,
    searchConfig,
    filterConfigs,
    dateRangeConfig,
  }
}
