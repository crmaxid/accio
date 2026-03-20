'use client'

import { useCustomer } from '@/services'
import { usePagination } from '@/hooks/use-pagination'
import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { useCustomerTable } from './_hooks/useCustomerTable'

export default function DatabasePage() {
  usePageTitle('Customers')

  const { page, limit, setPage } = usePagination()
  const { columns, search, searchConfig, filterConfig } = useCustomerTable()

  const { getCustomers } = useCustomer({ page, limit, search })
  const { data, isLoading } = getCustomers

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={data?.data?.data}
        meta={data?.data?.meta}
        isLoading={isLoading}
        onPageChange={setPage}
        search={searchConfig}
        filters={filterConfig}
      />
    </div>
  )
}
