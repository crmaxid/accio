'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { RawMaterial } from '@/types'
import { SearchConfig } from '@/components/data-table/types'

export const useRawMaterialTable = () => {
  const [search, setSearch] = useState('')

  const columns: ColumnDef<RawMaterial>[] = [
    {
      accessorKey: 'displayName',
      header: 'Name',
    },
    {
      accessorKey: 'kinematicViscosity40',
      header: 'KV 40',
      cell: ({ row }) => row.original.kinematicViscosity40 ?? '-',
    },
    {
      accessorKey: 'kinematicViscosity100',
      header: 'KV 100',
      cell: ({ row }) => row.original.kinematicViscosity100 ?? '-',
    },
    {
      accessorKey: 'pourPoint',
      header: 'Pour Point',
      cell: ({ row }) => row.original.pourPoint ?? '-',
    },
    {
      accessorKey: 'flashPoint',
      header: 'Flash Point',
      cell: ({ row }) => row.original.flashPoint ?? '-',
    },
    {
      accessorKey: 'viscosityIndex',
      header: 'Viscosity Index',
      cell: ({ row }) => row.original.viscosityIndex ?? '-',
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
    placeholder: 'Search raw materials...',
  }

  return { columns, search, searchConfig }
}
