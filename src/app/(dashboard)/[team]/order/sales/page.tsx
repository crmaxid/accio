'use client'

import { useState } from 'react'
import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useSales } from '@/services'
import { useSalesTable } from './_hooks/use-sales-table'
import CreateSale from './_components/create-sale'

export default function SalesPage() {
  usePageTitle('Sales')

  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage } = usePagination()
  const {
    columns,
    search,
    source,
    startDate,
    endDate,
    searchConfig,
    filterConfigs,
    dateRangeConfig,
  } = useSalesTable()

  const { getOrderList } = useSales({
    page,
    limit,
    search,
    source,
    startDate,
    endDate,
  })
  const { data, isLoading } = getOrderList

  return (
    <main>
      <DataTable
        data={data?.data?.data}
        meta={data?.data?.meta}
        columns={columns}
        onPageChange={setPage}
        isLoading={isLoading}
        search={searchConfig}
        filters={filterConfigs}
        dateRange={dateRangeConfig}
        buttons={{
          create: { onClick: () => setCreateOpen(true) },
        }}
      />
      <CreateSale open={createOpen} onOpenChange={setCreateOpen} />
    </main>
  )
}
