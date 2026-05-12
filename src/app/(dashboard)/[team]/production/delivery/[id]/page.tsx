'use client'

import { useParams } from 'next/navigation'
import { usePageTitle } from '@/hooks/use-page-title'
import { useDelivery } from '@/services/core/delivery'
import DeliverySummary from './_components/delivery-summary'
import DeliveryProducts from './_components/delivery-products'
import DeliveryPod from './_components/delivery-pod'

export default function DeliveryDetailPage() {
  const { id } = useParams<{ id: string; team: string }>()

  const { getDeliveryDetail } = useDelivery({
    page: 1,
    limit: 10,
    detailId: id,
  })
  const { data, isLoading } = getDeliveryDetail
  const delivery = data?.data

  usePageTitle(delivery?.number ?? 'Delivery Detail')

  return (
    <main className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-4">
          <DeliveryProducts
            items={delivery?.items ?? []}
            isLoading={isLoading}
          />
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-[30%]">
          <DeliverySummary delivery={delivery ?? null} isLoading={isLoading} />
          <DeliveryPod
            deliveryId={id}
            hasProofOfDelivery={!!delivery?.proofOfDelivery}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  )
}
