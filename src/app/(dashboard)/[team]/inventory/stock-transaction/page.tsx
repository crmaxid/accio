'use client'

import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useSku } from '@/services'
import { useStockTransactionTable } from './_hooks/use-stock-transaction-table'

export default function StockTransactionPage() {
  usePageTitle('Stock Transactions')

  const { page, limit, setPage } = usePagination()
  const { columns, startDate, endDate, dateRangeConfig } =
    useStockTransactionTable()
  const { getStockTransaction } = useSku({ page, limit, startDate, endDate })
  const { data, isLoading } = getStockTransaction

  return (
    <main>
      <DataTable
        data={data?.data?.data}
        meta={data?.data?.meta}
        columns={columns}
        onPageChange={setPage}
        isLoading={isLoading}
        dateRange={dateRangeConfig}
      />
    </main>
  )
}
