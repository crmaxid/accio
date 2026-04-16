import { useState } from 'react'
import { Product } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency, getInitials } from '@/lib/utils/format'
import { DateCell, StockBadge, UomBadge } from '@/components/common'
import { SearchConfig } from '@/components/data-table/table'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Delete02Icon,
  MoreVerticalIcon,
  PencilEdit01Icon,
} from '@hugeicons/core-free-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const useProductTable = () => {
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setUpdateOpen(true)
  }

  const handleDelete = (product: Product) => {
    setSelectedProduct(product)
    setDeleteOpen(true)
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => {
        const name = row.original.name
        const sku = row.original.sku?.[0]?.code
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={undefined} />
              <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{name}</span>
              {sku && <span className="text-[12px] text-gray-400">{sku}</span>}
            </div>
          </div>
        )
      },
    },
    {
      id: 'uom',
      header: 'UoM',
      cell: ({ row }) => <UomBadge uom={row.original.sku?.[0]?.uom} />,
    },
    {
      id: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const total = row.original.sku.reduce(
          (sum, s) => sum + (s.stock?.actualQuantity ?? 0),
          0,
        )
        return <StockBadge stock={total} />
      },
    },
    {
      id: 'price',
      header: 'Production Price',
      cell: ({ row }) => formatCurrency(row.original.price.productionPrice),
    },
    {
      id: 'updatedAt',
      header: 'Last Updated Stock At',
      cell: ({ row }) => {
        const updatedAt = row.original.sku
          .map((s) => s.stock?.updatedAt)
          .filter((date): date is string => !!date)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
        return <DateCell iso={updatedAt} />
      },
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
    placeholder: 'Search product name...',
  }

  return {
    columns,
    search,
    searchConfig,
    selectedProduct,
    updateOpen,
    setUpdateOpen,
    deleteOpen,
    setDeleteOpen,
  }
}
