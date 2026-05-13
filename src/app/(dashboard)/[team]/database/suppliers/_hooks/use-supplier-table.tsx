'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Supplier } from '@/types'
import { SearchConfig } from '@/components/data-table/types'

export const useSupplierTable = () => {
  const [search, setSearch] = useState('')

  const columns: ColumnDef<Supplier>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => row.original.phone ?? '-',
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => row.original.email ?? '-',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), 'dd MMM yyyy'),
    },
  ]

  const searchConfig: SearchConfig = {
    value: search,
    onChange: setSearch,
    placeholder: 'Search suppliers...',
  }

  return { columns, search, searchConfig }
}
