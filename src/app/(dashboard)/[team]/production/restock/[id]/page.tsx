'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { usePageTitle } from '@/hooks/use-page-title'
import { useRestock } from '@/services/core/restock'
import RestockSummary from './_components/restock-summary'
import RestockProducts from './_components/restock-products'
import RestockProgress from './_components/restock-progress'
import RestockPayment from './_components/restock-payment'
import RestockDelivery from './_components/restock-delivery'
import RestockQrCodes from './_components/restock-qr-codes'
import CancelRestock from '../_components/cancel-restock'

export default function RestockDetailPage() {
  const { id } = useParams<{ id: string; team: string }>()
  const [cancelOpen, setCancelOpen] = useState(false)

  const { getRestockDetail } = useRestock({ page: 1, limit: 10, detailId: id })
  const { data, isLoading } = getRestockDetail
  const restock = data?.data

  usePageTitle(restock?.number ?? 'Restock Detail')

  return (
    <main className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-4">
          <RestockProgress
            status={restock?.status ?? 'PENDING'}
            paymentStatus={restock?.paymentStatus ?? 'UNPAID'}
            deliveryStatus={restock?.deliveryStatus ?? 'PENDING'}
            isLoading={isLoading}
          />
          <RestockProducts
            products={restock?.products ?? []}
            isLoading={isLoading}
            restockId={id}
            restockStatus={restock?.status}
            qr={restock?.qr}
            onShippingLabelGenerated={() => getRestockDetail.refetch()}
          />
          <RestockPayment
            invoice={restock?.invoice ?? null}
            restockId={id}
            restockStatus={restock?.status ?? 'PENDING'}
            isLoading={isLoading}
            onRefetch={() => getRestockDetail.refetch()}
          />
          <RestockQrCodes restockId={id} />
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-[30%]">
          <RestockSummary
            restock={restock ?? null}
            isLoading={isLoading}
            onCancelClick={() => setCancelOpen(true)}
            onDocumentGenerated={() => getRestockDetail.refetch()}
          />
          <RestockDelivery
            deliveries={restock?.deliveries ?? []}
            isLoading={isLoading}
          />
        </div>
      </div>

      <CancelRestock
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        restock={restock ? { id: restock.id, number: restock.number } : null}
      />
    </main>
  )
}
