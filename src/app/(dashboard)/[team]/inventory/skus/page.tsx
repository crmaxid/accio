'use client'

import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useSku } from '@/services'
import { useSkuTable } from './_hooks/use-sku-table'
import { useState } from 'react'
import CreateSku from './_components/create-sku'
import UpdateSku from './_components/update-sku'
import DeleteSku from './_components/delete-sku'

export default function SkuPage() {
  usePageTitle('SKUs')

  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage } = usePagination()
  const {
    columns,
    search,
    searchConfig,
    selectedSku,
    updateOpen,
    setUpdateOpen,
    deleteOpen,
    setDeleteOpen,
  } = useSkuTable()
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
      <UpdateSku
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        sku={selectedSku}
      />
      <DeleteSku
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        sku={selectedSku}
      />
    </main>
  )
}
