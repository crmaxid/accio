'use client'

import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useRestock } from '@/services/core/restock'
import { useRestockTable } from './_hooks/use-restock-table'

export default function RestockPage() {
  usePageTitle('Restocks')

  const { page, limit, setPage } = usePagination()
  const {
    columns,
    search,
    paymentFilter,
    deliveryFilter,
    searchConfig,
    paymentStatusParam,
    deliveryStatusParam,
  } = useRestockTable()

  const { getAllRestock } = useRestock({
    page,
    limit,
    search,
    paymentStatus: paymentStatusParam,
    deliveryStatus: deliveryStatusParam,
  })
  const { data, isLoading } = getAllRestock

  return (
    <main>
      <DataTable
        data={data?.data?.data}
        meta={data?.data?.meta}
        columns={columns}
        onPageChange={setPage}
        isLoading={isLoading}
        search={searchConfig}
        filters={[paymentFilter, deliveryFilter]}
      />
    </main>
  )
}
