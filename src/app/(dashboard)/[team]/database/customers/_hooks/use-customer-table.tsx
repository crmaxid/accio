import { FilterConfig, SearchConfig } from '@/components/data-table/table'
import { Customer } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

export const useCustomerTable = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => row.original.address.fullAddress,
    },
  ]

  const searchConfig: SearchConfig = {
    value: search,
    onChange: setSearch,
    placeholder: 'Search customers...',
  }

  const filterConfig: FilterConfig[] = [
    {
      label: 'Status',
      value: status,
      onChange: setStatus,
      options: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ]

  return {
    columns,
    search,
    setSearch,
    status,
    setStatus,
    searchConfig,
    filterConfig,
  }
}
