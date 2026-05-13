'use client'

import { useDeliveryOrder } from '@/services/core/delivery-order'
import { usePagination } from '@/hooks/use-pagination'
import { usePageTitle } from '@/hooks/use-page-title'
import DataTable from '@/components/data-table/table'
import { useDeliveryOrderTable } from './_hooks/use-delivery-order-table'

export default function DeliveryOrdersPage() {
  usePageTitle('Delivery Orders')

  const { page, limit, setPage, setLimit } = usePagination()
  const { columns, search, searchConfig } = useDeliveryOrderTable()

  const { getDeliveryOrders } = useDeliveryOrder({ page, limit, search })
  const { data, isLoading } = getDeliveryOrders

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
      />
    </div>
  )
}
