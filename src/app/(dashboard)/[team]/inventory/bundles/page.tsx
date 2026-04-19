'use client'

import { useState } from 'react'
import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useBundleTable } from './_hooks/use-bundle-table'
import { useSku } from '@/services'
import CreateBundle from './_components/create-bundle'

export default function BundlePage() {
  usePageTitle('Bundles')

  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage } = usePagination()
  const { columns, search, searchConfig } = useBundleTable()
  const { getBundleList } = useSku({ page, limit, search })
  const { data, isLoading } = getBundleList

  return (
    <main>
      <DataTable
        data={data?.data?.data}
        meta={data?.data?.meta}
        columns={columns}
        onPageChange={setPage}
        isLoading={isLoading}
        search={searchConfig}
        buttons={{
          create: { onClick: () => setCreateOpen(true) },
        }}
      />
      <CreateBundle open={createOpen} onOpenChange={setCreateOpen} />
    </main>
  )
}
