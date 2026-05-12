'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { documents } from '@/lib'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FileDownloadIcon,
  Loading03Icon,
  LegalDocument01Icon,
  LegalDocument02Icon,
} from '@hugeicons/core-free-icons'

const POD_ITEMS = [
  {
    type: 'd',
    label: 'For Factory',
    description: 'Proof of Delivery — Factory copy',
    icon: LegalDocument01Icon,
  },
  {
    type: 'r',
    label: 'For Store',
    description: 'Proof of Delivery — Store copy',
    icon: LegalDocument02Icon,
  },
]

interface DeliveryPodProps {
  deliveryId: string
  hasProofOfDelivery: boolean
  isLoading: boolean
}

export default function DeliveryPod({
  deliveryId,
  hasProofOfDelivery,
  isLoading,
}: DeliveryPodProps) {
  const [loadingType, setLoadingType] = useState<string | null>(null)

  const handleDownload = async (type: string) => {
    setLoadingType(type)
    try {
      const response = await documents.get(
        `/stock-replenishment-delivery/${deliveryId}/pod`,
        { params: { type }, responseType: 'blob' },
      )

      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `proof-of-delivery-${type}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Document downloaded successfully')
    } catch {
      toast.error('Failed to download document')
    } finally {
      setLoadingType(null)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Proof of Delivery</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Proof of Delivery</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pt-4">
        {!hasProofOfDelivery ? (
          <p className="py-4 text-center text-xs text-gray-400">
            No proof of delivery available yet.
          </p>
        ) : (
          POD_ITEMS.map((item) => {
            const isDownloading = loadingType === item.type
            return (
              <div
                key={item.type}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon
                    icon={item.icon}
                    size={14}
                    strokeWidth={2}
                    className="text-gray-400"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {item.description}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(item.type)}
                  disabled={isDownloading || !!loadingType}
                >
                  {isDownloading ? (
                    <HugeiconsIcon
                      icon={Loading03Icon}
                      strokeWidth={2}
                      className="animate-spin"
                    />
                  ) : (
                    <HugeiconsIcon
                      icon={FileDownloadIcon}
                      size={13}
                      strokeWidth={2}
                    />
                  )}
                  {isDownloading ? 'Downloading...' : 'Download'}
                </Button>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
