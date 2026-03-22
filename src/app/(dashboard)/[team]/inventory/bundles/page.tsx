'use client'

import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useBundleTable } from './_hooks/use-bundle-table'
import { useSku } from '@/services'

export default function BundlePage() {
  usePageTitle('Bundles')

  const { page, limit, setPage } = usePagination()
  const { columns, search, searchConfig } = useBundleTable()
  const { getBundleList } = useSku({ page, limit, search })
  const { data, isLoading } = getBundleList

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
