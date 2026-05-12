'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { RestockDetailProduct } from '@/types'
import { useRestockDocument } from '@/services/documents'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UomBadge } from '@/components/common'
import { FormDialog } from '@/components/common/form-dialog'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  PrinterIcon,
  Loading03Icon,
  FileDownloadIcon,
} from '@hugeicons/core-free-icons'
import { formatCurrency, getInitials } from '@/lib/utils/format'

interface RestockProductsProps {
  products: RestockDetailProduct[]
  isLoading: boolean
  restockId?: string
  restockStatus?: string
  qr?: { id: string; name: string; mimeType: string; url: string } | null
  onShippingLabelGenerated?: () => void
}

export default function RestockProducts({
  products,
  isLoading,
  restockId,
  restockStatus,
  qr,
  onShippingLabelGenerated,
}: RestockProductsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { generateShippingLabel } = useRestockDocument()

  const handleGenerateShippingLabel = () => {
    if (!restockId) return
    generateShippingLabel.mutate(restockId, {
      onSuccess: (res) => {
        const url = res?.data?.url
        if (url) window.open(url, '_blank')
        toast.success('Shipping label generated')
        setConfirmOpen(false)
        onShippingLabelGenerated?.()
      },
      onError: () => toast.error('Failed to generate shipping label'),
    })
  }

  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0)
  const grandTotal = products.reduce(
    (sum, p) => sum + p.quantity * (p.product.price?.productionPrice ?? 0),
    0,
  )

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="py-8 text-center text-xs text-gray-400">
            No products on this request.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {products.map((item) => {
              const unitPrice = item.product.price?.productionPrice ?? 0
              const totalPrice = item.quantity * unitPrice
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={undefined} />
                      <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
                        {getInitials(item.product.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-800">
                        {item.product.name}
                      </span>
                      {unitPrice > 0 && (
                        <span className="text-[11px] text-gray-400">
                          {formatCurrency(unitPrice)} / unit
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {unitPrice > 0 && (
                      <span className="text-xs font-medium text-gray-600">
                        {formatCurrency(totalPrice)}
                      </span>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-gray-700">
                        {item.quantity}
                      </span>
                      <UomBadge uom={item.uom} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
      {!isLoading && products.length > 0 && (
        <CardFooter className="flex flex-col gap-2 border-t pt-4">
          <div className="flex w-full items-center justify-between text-xs text-gray-500">
            <span>Total Items</span>
            <span className="font-medium text-gray-700">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex w-full items-center justify-between text-xs text-gray-500">
            <span>Total Quantity</span>
            <span className="font-medium text-gray-700">
              {totalQuantity} units
            </span>
          </div>
          {grandTotal > 0 && (
            <>
              <Separator />
              <div className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs">
                <span className="font-semibold text-gray-700">Grand Total</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </>
          )}
          {restockId && restockStatus !== 'CANCELLED' && (
            <>
              <Separator />
              <div className="flex w-full justify-end">
                {qr ? (
                  <a
                    href={qr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-7 items-center gap-1.5 rounded-md border border-gray-200 px-2.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <HugeiconsIcon
                      icon={FileDownloadIcon}
                      size={12}
                      strokeWidth={2}
                    />
                    View Shipping Label
                  </a>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirmOpen(true)}
                    disabled={generateShippingLabel.isPending}
                  >
                    {generateShippingLabel.isPending ? (
                      <HugeiconsIcon
                        icon={Loading03Icon}
                        strokeWidth={2}
                        className="animate-spin"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={PrinterIcon}
                        size={13}
                        strokeWidth={2}
                      />
                    )}
                    {generateShippingLabel.isPending
                      ? 'Generating...'
                      : 'Create Shipping Label'}
                  </Button>
                )}
              </div>
            </>
          )}
        </CardFooter>
      )}

      <FormDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Create Shipping Label"
        description="Make sure the requested products are correct. Once the shipping label is generated, you cannot modify the restock request products."
        size="sm"
        buttons={[
          {
            type: 'cancel',
            label: 'Cancel',
            disabled: generateShippingLabel.isPending,
          },
          {
            type: 'submit',
            label: generateShippingLabel.isPending
              ? 'Generating...'
              : 'Generate',
            loading: generateShippingLabel.isPending,
            onClick: handleGenerateShippingLabel,
          },
        ]}
      >
        <p className="text-sm text-gray-600">
          This will generate a QR code shipping label for all{' '}
          <span className="font-semibold text-gray-800">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </span>{' '}
          in this restock request.
        </p>
      </FormDialog>
    </Card>
  )
}
