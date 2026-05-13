'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSupplier } from '@/services/core/supplier'
import { usePagination } from '@/hooks/use-pagination'
import { usePageTitle } from '@/hooks/use-page-title'
import DataTable from '@/components/data-table/table'
import { Supplier } from '@/types'
import { useSupplierTable } from './_hooks/use-supplier-table'
import CreateSupplier from './_components/create-supplier'

export default function SuppliersPage() {
  usePageTitle('Suppliers')

  const router = useRouter()
  const { team } = useParams<{ team: string }>()
  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage, setLimit } = usePagination()
  const { columns, search, searchConfig } = useSupplierTable()

  const { getSuppliers } = useSupplier({ page, limit, search })
  const { data, isLoading } = getSuppliers

  const handleRowClick = (row: Supplier) => {
    router.push(`/${team}/database/suppliers/${row._id}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={data?.data?.data}
        meta={data?.data?.meta}
        isLoading={isLoading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onRowClick={handleRowClick}
        search={searchConfig}
        buttons={{
          create: { onClick: () => setCreateOpen(true) },
        }}
      />
      <CreateSupplier open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
