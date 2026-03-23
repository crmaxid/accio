import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Restock } from '@/types'
import {
  CreatedByCell,
  DateCell,
  DeliveryStatusBadge,
  PaymentStatusBadge,
} from '@/components/common'
import { FilterConfig, SearchConfig } from '@/components/data-table/table'

const PAYMENT_STATUS_OPTIONS = [
  { label: 'All Payment', value: 'ALL' },
  { label: 'Unpaid', value: 'UNPAID' },
  { label: 'Partially Paid', value: 'PARTIALLY_PAID' },
  { label: 'Fully Paid', value: 'FULLY_PAID' },
]

const DELIVERY_STATUS_OPTIONS = [
  { label: 'All Delivery', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'On Progress', value: 'ON_PROGRESS' },
  { label: 'Partially Delivered', value: 'PARTIALLY_DELIVERED' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' },
]

export const useRestockTable = () => {
  const [search, setSearch] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('ALL')
  const [deliveryStatus, setDeliveryStatus] = useState('ALL')

  const columns: ColumnDef<Restock>[] = [
    {
      accessorKey: 'number',
      header: 'Number',
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment',
      cell: ({ row }) => (
        <PaymentStatusBadge value={row.original.paymentStatus} />
      ),
    },
    {
      accessorKey: 'deliveryStatus',
      header: 'Delivery',
      cell: ({ row }) => (
        <DeliveryStatusBadge value={row.original.deliveryStatus} />
      ),
    },
    {
      id: 'createdBy',
      header: 'Requested By',
      cell: ({ row }) => (
        <CreatedByCell
          name={row.original.createdBy.name}
          avatarUrl={row.original.createdBy.profile.avatarUrl}
        />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Requested At',
      cell: ({ row }) => <DateCell iso={row.original.createdAt} />,
    },
  ]

  const paymentFilter: FilterConfig = {
    label: 'Payment',
    value: paymentStatus,
    onChange: setPaymentStatus,
    options: PAYMENT_STATUS_OPTIONS,
  }

  const deliveryFilter: FilterConfig = {
    label: 'Delivery',
    value: deliveryStatus,
    onChange: setDeliveryStatus,
    options: DELIVERY_STATUS_OPTIONS,
  }

  const searchConfig: SearchConfig = {
    value: search,
    onChange: setSearch,
    placeholder: 'Search',
  }

  const paymentStatusParam = paymentStatus === 'ALL' ? undefined : paymentStatus
  const deliveryStatusParam =
    deliveryStatus === 'ALL' ? undefined : deliveryStatus

  return {
    columns,
    search,
    paymentFilter,
    deliveryFilter,
    searchConfig,
    paymentStatusParam,
    deliveryStatusParam,
  }
}
