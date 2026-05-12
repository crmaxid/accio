'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useRestock } from '@/services/core/restock'
import { RestockQrCode } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'

const QR_STATUS: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-amber-50 text-amber-700 border-amber-100' },
  ON_DELIVERY: { label: 'On Delivery', className: 'bg-blue-50 text-blue-700 border-blue-100' },
  SCANNED: { label: 'Scanned', className: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
}

function QrStatusBadge({ status }: { status: string }) {
  const config = QR_STATUS[status] ?? { label: status, className: 'bg-gray-50 text-gray-500 border-gray-100' }
  return (
    <span className={`inline-flex h-5 items-center rounded-full border px-2 text-[11px] font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}

function ScannedCell({ scannedAt }: { scannedAt: string | null }) {
  return scannedAt ? (
    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} strokeWidth={2} className="text-emerald-500" />
  ) : (
    <span className="text-sm text-gray-300">—</span>
  )
}

export default function RestockQrCodes({ restockId }: { restockId: string }) {
  const { id } = useParams<{ id: string }>()
  const [page, setPage] = useState(1)

  const { getRestockQrCodes } = useRestock({
    page: 1,
    limit: 10,
    detailId: id ?? restockId,
    qrPage: page,
    qrLimit: 10,
  })
  const { data, isLoading } = getRestockQrCodes
  const qrCodes: RestockQrCode[] = data?.data?.data ?? []
  const meta = data?.data?.meta

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>QR Codes</CardTitle>
        {meta && (
          <CardDescription>
            {meta.total} code{meta.total !== 1 ? 's' : ''} generated
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-md" />
            ))}
          </div>
        ) : qrCodes.length === 0 ? (
          <p className="py-8 text-center text-xs text-gray-400">
            QR codes will appear once the order is processed.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                  Code
                </TableHead>
                <TableHead className="px-4 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                  Product
                </TableHead>
                <TableHead className="px-4 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                  Status
                </TableHead>
                <TableHead className="px-4 text-right text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                  Qty
                </TableHead>
                <TableHead className="px-4 text-center text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                  Delivery
                </TableHead>
                <TableHead className="px-4 text-center text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                  Receipt
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrCodes.map((qr) => (
                <TableRow key={qr.id} className="hover:bg-gray-50/50">
                  <TableCell className="px-4 font-mono text-[11px] text-gray-600">
                    {qr.identifier}
                  </TableCell>
                  <TableCell className="px-4 text-xs text-gray-600">
                    {qr.product.name}
                  </TableCell>
                  <TableCell className="px-4">
                    <QrStatusBadge status={qr.status} />
                  </TableCell>
                  <TableCell className="px-4 text-right text-xs font-medium text-gray-600">
                    {qr.containedQuantity}
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex justify-center">
                      <ScannedCell scannedAt={qr.deliveryScannedAt} />
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex justify-center">
                      <ScannedCell scannedAt={qr.receivedScannedAt} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {meta && meta.totalPages > 1 && (
        <CardFooter className="justify-between border-t">
          <span className="text-[11px] text-gray-400">
            Page {page} of {meta.totalPages}
          </span>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={12} strokeWidth={2} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              disabled={page >= meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2} />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
