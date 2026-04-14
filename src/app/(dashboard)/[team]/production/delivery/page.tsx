'use client'

import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useDelivery } from '@/services/core/delivery'
import { useDeliveryTable } from './_hooks/use-delivery-table'

export default function DeliveryPage() {
  usePageTitle('Deliveries')

  const { page, limit, setPage } = usePagination()
  const { columns, search, statusFilter, searchConfig, statusParam } =
    useDeliveryTable()
  const { getAllDelivery } = useDelivery({
    page,
    limit,
    search,
    status: statusParam,
  })
  const { data, isLoading } = getAllDelivery

  return (
    <main>
      <DataTable
        data={data?.data?.data}
        meta={data?.data?.meta}
        columns={columns}
        onPageChange={setPage}
        isLoading={isLoading}
        search={searchConfig}
        filters={[statusFilter]}
      />
    </main>
  )
}
