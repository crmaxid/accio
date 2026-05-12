'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useRestock } from '@/services/core/restock'
import { useRestockTable } from './_hooks/use-restock-table'
import CreateRestock from './_components/create-restock'
import CancelRestock from './_components/cancel-restock'
import { Restock } from '@/types'

export default function RestockPage() {
  usePageTitle('Restocks')

  const router = useRouter()
  const { team } = useParams<{ team: string }>()
  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage } = usePagination()
  const {
    columns,
    search,
    paymentFilter,
    deliveryFilter,
    searchConfig,
    paymentStatusParam,
    deliveryStatusParam,
    cancelOpen,
    setCancelOpen,
    selectedRestock,
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
        onRowClick={(row: Restock) =>
          router.push(`/${team}/production/restock/${row.id}`)
        }
        isLoading={isLoading}
        search={searchConfig}
        filters={[paymentFilter, deliveryFilter]}
        buttons={{
          create: { onClick: () => setCreateOpen(true) },
        }}
      />
      <CreateRestock open={createOpen} onOpenChange={setCreateOpen} />
      <CancelRestock
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        restock={selectedRestock}
      />
    </main>
  )
}
