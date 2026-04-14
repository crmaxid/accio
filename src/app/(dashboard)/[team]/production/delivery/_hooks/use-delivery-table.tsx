import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import {
  CreatedByCell,
  DateCell,
  DeliveryStatusBadge,
} from '@/components/common'
import { FilterConfig, SearchConfig } from '@/components/data-table/table'
import { Delivery } from '@/types'

const STATUS_OPTIONS = [
  { label: 'All Status', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'On Progress', value: 'ON_PROGRESS' },
  { label: 'Partially Delivered', value: 'PARTIALLY_DELIVERED' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' },
]

export const useDeliveryTable = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('ALL')

  const columns: ColumnDef<Delivery>[] = [
    {
      accessorKey: 'number',
      header: 'Number',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <DeliveryStatusBadge value={row.original.status} />,
    },
    {
      accessorKey: 'deliveryDate',
      header: 'Delivery Date',
      cell: ({ row }) => <DateCell iso={row.original.deliveryDate} />,
    },
    {
      id: 'createdBy',
      header: 'Created By',
      cell: ({ row }) => (
        <CreatedByCell
          name={row.original.createdBy?.name}
          avatarUrl={row.original.createdBy?.profile?.avatarUrl}
        />
      ),
    },
  ]

  const statusFilter: FilterConfig = {
    label: 'Status',
    value: status,
    onChange: setStatus,
    options: STATUS_OPTIONS,
  }

  const searchConfig: SearchConfig = {
    value: search,
    onChange: setSearch,
    placeholder: 'Search',
  }

  const statusParam = status === 'ALL' ? undefined : status

  return { columns, search, statusFilter, searchConfig, statusParam }
}
