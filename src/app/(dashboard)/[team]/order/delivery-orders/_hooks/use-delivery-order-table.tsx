'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DeliveryOrder } from '@/types'
import { SearchConfig } from '@/components/data-table/types'

export const useDeliveryOrderTable = () => {
  const [search, setSearch] = useState('')

  const columns: ColumnDef<DeliveryOrder>[] = [
    {
      accessorKey: 'number',
      header: 'Delivery No.',
    },
    {
      accessorKey: 'purchaseOrderId',
      header: 'Purchase Order',
      cell: ({ row }) => row.original.purchaseOrderId?.number ?? '-',
    },
    {
      accessorKey: 'deliveryDate',
      header: 'Delivery Date',
      cell: ({ row }) =>
        format(new Date(row.original.deliveryDate), 'dd MMM yyyy'),
    },
    {
      accessorKey: 'note',
      header: 'Note',
      cell: ({ row }) => row.original.note ?? '-',
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
    placeholder: 'Search delivery orders...',
  }

  return { columns, search, searchConfig }
}
