import { Product } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency, getInitials } from '@/lib/utils/format'
import { DateCell, StockBadge, UomBadge } from '@/components/common'

export const useProductTable = () => {
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
  ]

  return { columns }
}
