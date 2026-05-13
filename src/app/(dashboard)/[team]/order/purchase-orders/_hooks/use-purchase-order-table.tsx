'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { PurchaseOrder } from '@/types'
import { SearchConfig } from '@/components/data-table/types'

export const usePurchaseOrderTable = () => {
  const [search, setSearch] = useState('')

  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: 'number',
      header: 'Order No.',
    },
    {
      accessorKey: 'externalNumber',
      header: 'External No.',
      cell: ({ row }) => row.original.externalNumber ?? '-',
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => row.original.customer?.name ?? '-',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), 'dd MMM yyyy, HH:mm'),
    },
  ]

  const searchConfig: SearchConfig = {
    value: search,
    onChange: setSearch,
    placeholder: 'Search purchase orders...',
  }

  return { columns, search, searchConfig }
}
