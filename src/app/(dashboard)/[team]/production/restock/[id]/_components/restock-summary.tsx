'use client'

import { toast } from 'sonner'
import { RestockDetail } from '@/types'
import { useRestockDocument } from '@/services/documents'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DeliveryStatusBadge, PaymentStatusBadge } from '@/components/common'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Cancel01Icon,
  Loading03Icon,
  FileDownloadIcon,
  FileEditIcon,
} from '@hugeicons/core-free-icons'
import { formatDateTime, getInitials } from '@/lib/utils/format'

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  PROCESSING: {
    label: 'Processing',
    className: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-700 border-red-100',
  },
}

function RestockStatusBadge({ status }: { status: string }) {
  const config = STATUS_MAP[status] ?? {
    label: status,
    className: 'bg-gray-50 text-gray-500 border-gray-100',
  }
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full border px-2 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}

interface RestockSummaryProps {
  restock: RestockDetail | null
  isLoading: boolean
  onCancelClick: () => void
  onDocumentGenerated: () => void
}

export default function RestockSummary({
  restock,
  isLoading,
  onCancelClick,
  onDocumentGenerated,
}: RestockSummaryProps) {
  const { generateDocument } = useRestockDocument()

  const handleGenerateDocument = () => {
    if (!restock) return
    generateDocument.mutate(restock.id, {
      onSuccess: () => {
        toast.success('Document generated successfully')
        onDocumentGenerated()
      },
      onError: () => toast.error('Failed to generate document'),
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!restock) return null

  const { date } = formatDateTime(restock.createdAt)
  const isCancellable =
    restock.status !== 'CANCELLED' && restock.status !== 'COMPLETED'
  const totalQuantity = restock.products.reduce((sum, p) => sum + p.quantity, 0)

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-gray-100 pt-0">
        <div className="flex flex-col gap-1 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Request Number
          </span>
          <span className="font-mono text-sm font-semibold text-gray-800">
            {restock.number}
          </span>
        </div>

        <div className="flex flex-col gap-2 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Status
          </span>
          <div className="flex flex-wrap gap-2">
            <RestockStatusBadge status={restock.status} />
            <PaymentStatusBadge value={restock.paymentStatus} />
            <DeliveryStatusBadge value={restock.deliveryStatus} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3">
          <div className="flex flex-col gap-1 rounded-lg bg-gray-50 px-3 py-2">
            <span className="text-[11px] text-gray-400">Products</span>
            <span className="text-sm font-semibold text-gray-800">
              {restock.products.length}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-gray-50 px-3 py-2">
            <span className="text-[11px] text-gray-400">Total Qty</span>
            <span className="text-sm font-semibold text-gray-800">
              {totalQuantity}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Requested By
          </span>
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 rounded-lg">
              <AvatarImage src={undefined} />
              <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
                {getInitials(restock.createdBy.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-700">
                {restock.createdBy.name}
              </span>
              {restock.createdBy.email && (
                <span className="text-[11px] text-gray-400">
                  {restock.createdBy.email}
                </span>
              )}
            </div>
          </div>
          {restock.createdBy.role && (
            <span className="inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">
              {restock.createdBy.role.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Requested On
          </span>
          <span className="text-xs text-gray-700">{date}</span>
        </div>

        {restock.notes && (
          <div className="flex flex-col gap-1 py-3">
            <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
              Notes
            </span>
            <p className="text-xs leading-relaxed text-gray-600">
              {restock.notes}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 py-3">
          <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            Restock Document
          </span>
          {restock.file ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex h-5 items-center rounded-full border border-emerald-100 bg-emerald-50 px-2 text-[11px] font-medium text-emerald-600">
                  Available
                </span>
                <span className="text-[11px] text-gray-400">
                  {(restock.file.size / 1024).toFixed(2)} KB
                </span>
              </div>
              <Button variant="outline" className="w-full" size="sm" asChild>
                <a
                  href={restock.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HugeiconsIcon
                    icon={FileDownloadIcon}
                    size={13}
                    strokeWidth={2}
                  />
                  Download Document
                </a>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGenerateDocument}
              disabled={
                generateDocument.isPending || restock.status === 'CANCELLED'
              }
            >
              {generateDocument.isPending ? (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  strokeWidth={2}
                  className="animate-spin"
                />
              ) : (
                <HugeiconsIcon icon={FileEditIcon} size={14} strokeWidth={2} />
              )}
              {generateDocument.isPending
                ? 'Generating...'
                : 'Generate Document'}
            </Button>
          )}
        </div>

        {isCancellable && (
          <div className="pt-3">
            <Button
              variant="destructive"
              className="w-full"
              onClick={onCancelClick}
            >
              <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
              Cancel Request
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
