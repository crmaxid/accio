'use client'

import { useRawMaterial } from '@/services/core/raw-material'
import { usePagination } from '@/hooks/use-pagination'
import { usePageTitle } from '@/hooks/use-page-title'
import DataTable from '@/components/data-table/table'
import { useRawMaterialTable } from './_hooks/use-raw-material-table'

export default function RawMaterialsPage() {
  usePageTitle('Raw Materials')

  const { page, limit, setPage, setLimit } = usePagination()
  const { columns, search, searchConfig } = useRawMaterialTable()

  const { getRawMaterials } = useRawMaterial({ page, limit, search })
  const { data, isLoading } = getRawMaterials

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
