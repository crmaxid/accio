'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useDelivery } from '@/services/core/delivery'
import { useDeliveryTable } from './_hooks/use-delivery-table'
import CreateDelivery from './_components/create-delivery'
import { Delivery } from '@/types'

export default function DeliveryPage() {
  usePageTitle('Deliveries')

  const router = useRouter()
  const { team } = useParams<{ team: string }>()
  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage, setLimit } = usePagination()

  const { columns, search, statusFilter, searchConfig, statusParam } =
    useDeliveryTable()

  const { getAllDelivery } = useDelivery({
    page,
    limit,
    search,
    status: statusParam,
  })
  const { data, isLoading } = getAllDelivery

  const handleRowClick = (row: Delivery) => {
    router.push(`/${team}/production/delivery/${row.id}`)
  }

  return (
    <main>
      <DataTable
        data={data?.data?.data}
        meta={data?.data?.meta}
        columns={columns}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onRowClick={handleRowClick}
        isLoading={isLoading}
        search={searchConfig}
        filters={[statusFilter]}
        buttons={{
          create: { onClick: () => setCreateOpen(true) },
        }}
      />
      <CreateDelivery open={createOpen} onOpenChange={setCreateOpen} />
    </main>
  )
}
