import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import { Restock } from '@/types'
import {
  CreatedByCell,
  DateCell,
  DeliveryStatusBadge,
  PaymentStatusBadge,
} from '@/components/common'
import { FilterConfig, SearchConfig } from '@/components/data-table/table'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon, EyeIcon, MoreVerticalIcon } from '@hugeicons/core-free-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
  const { team } = useParams<{ team: string }>()
  const [search, setSearch] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('ALL')
  const [deliveryStatus, setDeliveryStatus] = useState('ALL')
  const [cancelOpen, setCancelOpen] = useState(false)
  const [selectedRestock, setSelectedRestock] = useState<Restock | null>(null)

  const handleCancel = (restock: Restock) => {
    setSelectedRestock(restock)
    setCancelOpen(true)
  }

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
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-400 hover:text-gray-700"
            >
              <HugeiconsIcon icon={MoreVerticalIcon} size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem asChild>
              <Link href={`/${team}/production/restock/${row.original.id}`}>
                <HugeiconsIcon icon={EyeIcon} size={13} strokeWidth={2} />
                View Details
              </Link>
            </DropdownMenuItem>
            {row.original.status !== 'CANCELLED' &&
              row.original.status !== 'COMPLETED' && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => handleCancel(row.original)}
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      size={13}
                      strokeWidth={2}
                    />
                    Cancel
                  </DropdownMenuItem>
                </>
              )}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      ),
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
    cancelOpen,
    setCancelOpen,
    selectedRestock,
  }
}
