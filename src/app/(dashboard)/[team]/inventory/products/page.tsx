'use client'

import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useProduct } from '@/services'
import { useProductTable } from './_hooks/use-product-table'

export default function ProductPage() {
  usePageTitle('Products')

  const { page, limit, setPage } = usePagination()
  const { columns, search, searchConfig } = useProductTable()
  const { getProductList } = useProduct({ page, limit, search })
  const { data, isLoading } = getProductList

  return (
    <main>
      <DataTable
        data={data?.data?.data}
        meta={data?.data?.meta}
        columns={columns}
        onPageChange={setPage}
        isLoading={isLoading}
        search={searchConfig}
      />
    </main>
  )
}
