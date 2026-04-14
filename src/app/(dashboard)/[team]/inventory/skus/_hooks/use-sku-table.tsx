import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency, getInitials } from '@/lib/utils/format'
import { UomBadge } from '@/components/common/uom-badge'
import { DateCell } from '@/components/common/date-cell'
import { SearchConfig } from '@/components/data-table/table'
import { Sku } from '@/types'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  MoreVerticalIcon,
  PencilEdit01Icon,
  Delete02Icon,
} from '@hugeicons/core-free-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const useSkuTable = () => {
  const [search, setSearch] = useState('')
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleEdit = (sku: Sku) => {
    setSelectedSku(sku)
    setUpdateOpen(true)
  }

  const handleDelete = (sku: Sku) => {
    setSelectedSku(sku)
    setDeleteOpen(true)
  }

  const columns: ColumnDef<Sku>[] = [
    {
      id: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const name = row.original.product.name
        const code = row.original.code
        const isMain = !row.original.virtual
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={undefined} />
              <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
                {getInitials(code)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span>{code}</span>
                {isMain && (
                  <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                    Main
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">{name}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'uom',
      header: 'UoM',
      cell: ({ row }) => <UomBadge uom={row.original.uom} />,
    },
    {
      accessorKey: 'unitCount',
      header: 'Unit Count',
    },
    {
      id: 'salePrice',
      header: 'Sale Price',
      cell: ({ row }) => formatCurrency(row.original.salePrice),
    },
    {
      id: 'resellerPrice',
      header: 'Reseller Price',
      cell: ({ row }) => formatCurrency(row.original.resellerPrice),
    },
    {
      id: 'specialPrice',
      header: 'Special Price',
      cell: ({ row }) => formatCurrency(row.original.specialPrice),
    },
    {
      id: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => <DateCell iso={row.original.createdAt} />,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-400 hover:text-gray-700"
            >
              <HugeiconsIcon
                icon={MoreVerticalIcon}
                size={14}
                strokeWidth={2}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <HugeiconsIcon
                icon={PencilEdit01Icon}
                size={13}
                strokeWidth={2}
              />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => handleDelete(row.original)}
            >
              <HugeiconsIcon icon={Delete02Icon} size={13} strokeWidth={2} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const searchConfig: SearchConfig = {
    value: search,
    onChange: setSearch,
    placeholder: 'Search SKU code...',
  }

  return {
    columns,
    search,
    searchConfig,
    selectedSku,
    updateOpen,
    setUpdateOpen,
    deleteOpen,
    setDeleteOpen,
  }
}
