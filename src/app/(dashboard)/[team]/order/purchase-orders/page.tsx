'use client'

import { useState } from 'react'
import { usePurchaseOrder } from '@/services/core/purchase-order'
import { usePagination } from '@/hooks/use-pagination'
import { usePageTitle } from '@/hooks/use-page-title'
import DataTable from '@/components/data-table/table'
import { usePurchaseOrderTable } from './_hooks/use-purchase-order-table'
import CreatePurchaseOrder from './_components/create-purchase-order'

export default function PurchaseOrdersPage() {
  usePageTitle('Purchase Orders')

  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage, setLimit } = usePagination()
  const { columns, search, searchConfig } = usePurchaseOrderTable()

  const { getPurchaseOrders } = usePurchaseOrder({ page, limit, search })
  const { data, isLoading } = getPurchaseOrders

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={data?.data?.data}
        meta={data?.data?.meta}
        isLoading={isLoading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        search={searchConfig}
        buttons={{
          create: { onClick: () => setCreateOpen(true) },
        }}
      />
      <CreatePurchaseOrder open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
