'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { RestockInvoice } from '@/types'
import { useRestockDocument } from '@/services/documents'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FileEditIcon,
  Loading03Icon,
  FileDownloadIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'
import { formatCurrency, formatDateTime } from '@/lib/utils/format'
import CreatePayment from './create-payment'

const INVOICE_STATUS_CLASS: Record<string, string> = {
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
  overdue: 'bg-red-50 text-red-700 border-red-100',
}

interface RestockPaymentProps {
  invoice: RestockInvoice | null
  restockId: string
  restockStatus: string
  isLoading: boolean
  onRefetch: () => void
}

export default function RestockPayment({
  invoice,
  restockId,
  restockStatus,
  isLoading,
  onRefetch,
}: RestockPaymentProps) {
  const [paymentOpen, setPaymentOpen] = useState(false)
  const { generateInvoice } = useRestockDocument()

  const handleGenerateInvoice = () => {
    generateInvoice.mutate(restockId, {
      onSuccess: () => {
        toast.success('Invoice generated successfully')
        onRefetch()
      },
      onError: () => toast.error('Failed to generate invoice'),
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!invoice) {
    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>No invoice generated yet</CardDescription>
        </CardHeader>
        <CardContent className="py-8 text-center text-xs text-gray-400">
          Payment details will appear once the invoice is generated.
        </CardContent>
        <CardFooter className="justify-end border-t">
          <Button
            size="sm"
            onClick={handleGenerateInvoice}
            disabled={
              generateInvoice.isPending || restockStatus === 'CANCELLED'
            }
          >
            {generateInvoice.isPending ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="animate-spin"
              />
            ) : (
              <HugeiconsIcon icon={FileEditIcon} size={13} strokeWidth={2} />
            )}
            {generateInvoice.isPending ? 'Generating...' : 'Generate Invoice'}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const isFullyPaid = invoice.paidAmount >= invoice.totalPrice
  const paymentProgress =
    invoice.totalPrice > 0
      ? Math.min(
          100,
          Math.round((invoice.paidAmount / invoice.totalPrice) * 100),
        )
      : 0
  const statusClass =
    INVOICE_STATUS_CLASS[invoice.status.toLowerCase()] ??
    'bg-gray-50 text-gray-500 border-gray-100'
  const { date } = formatDateTime(invoice.createdAt)

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Invoice #{invoice.number} · {date}
          </CardDescription>
          <CardAction>
            <span
              className={`inline-flex h-6 items-center rounded-full border px-2 text-[11px] font-medium capitalize ${statusClass}`}
            >
              {invoice.status}
            </span>
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-4">
          {/* Payment progress */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                Payment Progress
              </span>
              <span className="text-[11px] font-semibold text-gray-600">
                {paymentProgress}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-orange-500 transition-all duration-300"
                style={{ width: `${paymentProgress}%` }}
              />
            </div>
          </div>

          <Separator />

          {/* Order items */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
              Order Items ({invoice.items.length})
            </span>
            <div className="space-y-1.5">
              {invoice.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2"
                >
                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      {item.product.product.name}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {item.quantity} {item.product.uom} ×{' '}
                      {formatCurrency(item.productionPrice)}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Payment history */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
              Payment History ({invoice.payments.length})
            </span>
            {invoice.payments.length === 0 ? (
              <p className="text-[11px] text-gray-400">
                No payments recorded yet.
              </p>
            ) : (
              <div className="space-y-1.5">
                {invoice.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-medium text-gray-700">
                        {payment.paymentMethod}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {formatCurrency(payment.amount)}
                      </p>
                    </div>
                    {payment.file?.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={payment.file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <HugeiconsIcon
                            icon={FileDownloadIcon}
                            size={11}
                            strokeWidth={2}
                          />
                          Proof
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Totals */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <span>Total Amount</span>
              <span className="font-medium text-gray-700">
                {formatCurrency(invoice.totalPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-emerald-600">
              <span>Amount Paid</span>
              <span className="font-medium">
                {formatCurrency(invoice.paidAmount)}
              </span>
            </div>
            {invoice.remainingAmount > 0 && (
              <div className="flex items-center justify-between text-[11px] text-red-600">
                <span>Remaining</span>
                <span className="font-medium">
                  {formatCurrency(invoice.remainingAmount)}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-between border-t">
          <div className="flex items-center gap-1.5 text-[11px]">
            {isFullyPaid ? (
              <>
                <HugeiconsIcon
                  icon={CheckmarkCircle01Icon}
                  size={13}
                  strokeWidth={2}
                  className="text-emerald-500"
                />
                <span className="font-medium text-emerald-700">
                  Payment complete
                </span>
              </>
            ) : (
              <span className="text-gray-500">
                {formatCurrency(invoice.remainingAmount)} remaining
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {invoice.file && (
              <a
                href={invoice.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-gray-200 px-2.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50"
              >
                <HugeiconsIcon
                  icon={FileDownloadIcon}
                  size={12}
                  strokeWidth={2}
                />
                Download Invoice
              </a>
            )}
            {!isFullyPaid && restockStatus !== 'CANCELLED' && (
              <Button size="sm" onClick={() => setPaymentOpen(true)}>
                Upload Payment Proof
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <CreatePayment
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        invoiceId={invoice.id}
        onSuccess={onRefetch}
      />
    </>
  )
}
