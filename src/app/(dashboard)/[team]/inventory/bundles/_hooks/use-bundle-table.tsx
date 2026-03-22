import { useState } from 'react'
import { Bundle } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { DateCell } from '@/components/common'
import { SearchConfig } from '@/components/data-table/table'

export const useBundleTable = () => {
  const [search, setSearch] = useState('')

  const columns: ColumnDef<Bundle>[] = [
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => <DateCell iso={row.original.createdAt} />,
    },
  ]

  const searchConfig: SearchConfig = {
    value: search,
    onChange: setSearch,
    placeholder: 'Search by code...',
  }

  return { columns, search, searchConfig }
}
