'use client'

import { useState } from 'react'
import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useSku } from '@/services'
import { useStockTransactionTable } from './_hooks/use-stock-transaction-table'
import CreateStockAdjustment from './_components/create-stock-adjustment'

export default function StockTransactionPage() {
  usePageTitle('Stock Transactions')

  const [adjustmentOpen, setAdjustmentOpen] = useState(false)
  const { page, limit, setPage, setLimit } = usePagination()
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
        onLimitChange={setLimit}
        isLoading={isLoading}
        dateRange={dateRangeConfig}
        buttons={{
          create: {
            onClick: () => setAdjustmentOpen(true),
            label: 'Stock Adjustment',
          },
        }}
      />
      <CreateStockAdjustment
        open={adjustmentOpen}
        onOpenChange={setAdjustmentOpen}
      />
    </main>
  )
}
