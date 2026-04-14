'use client'

import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useSku } from '@/services'
import { useSkuTable } from './_hooks/use-sku-table'
import CreateSku from './_components/create-sku'
import { useState } from 'react'

export default function SkuPage() {
  usePageTitle('SKUs')

  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage } = usePagination()
  const { columns, search, searchConfig } = useSkuTable()
  const { getSkuList } = useSku({ page, limit, code: search })
  const { data, isLoading } = getSkuList

  return (
    <main>
      <DataTable
        columns={columns}
        data={data?.data?.data}
        meta={data?.data?.meta}
        isLoading={isLoading}
        onPageChange={setPage}
        search={searchConfig}
        buttons={{
          create: { onClick: () => setCreateOpen(true) },
        }}
      />
      <CreateSku open={createOpen} onOpenChange={setCreateOpen} />
    </main>
  )
}
