'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRestock } from '@/services/core/restock'
import { FormDialog } from '@/components/common/form-dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface CreatePaymentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoiceId: string
  onSuccess: () => void
}

export default function CreatePayment({
  open,
  onOpenChange,
  invoiceId,
  onSuccess,
}: CreatePaymentProps) {
  const { createPayment } = useRestock({ page: 1, limit: 10 })
  const [file, setFile] = useState<File | null>(null)
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const reset = () => {
    setFile(null)
    setAmount('')
    setPaymentMethod('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !amount || !paymentMethod) {
      toast.error('Please fill in all required fields')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('amount', amount)
    formData.append('paymentMethod', paymentMethod)
    createPayment.mutate(
      { invoiceId, formData },
      {
        onSuccess: () => {
          toast.success('Payment submitted successfully')
          reset()
          onSuccess()
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to submit payment'),
      },
    )
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={(v) => {
        if (!v) reset()
        onOpenChange(v)
      }}
      title="Upload Payment Proof"
      description="Attach your payment proof, enter the amount, and specify the payment method."
      size="sm"
      onSubmit={handleSubmit}
      buttons={[
        {
          type: 'cancel',
          label: 'Cancel',
          disabled: createPayment.isPending,
        },
        {
          type: 'submit',
          label: createPayment.isPending ? 'Submitting...' : 'Submit Payment',
          loading: createPayment.isPending,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="payment-proof">Payment Proof *</Label>
          <Input
            id="payment-proof"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="h-auto file:mr-3 file:rounded-md file:border-0 file:bg-[#F86800] file:px-3 file:py-1 file:text-xs file:font-medium file:text-white hover:file:bg-[#d95f00]"
          />
          {file && (
            <p className="text-[11px] text-gray-500">Selected: {file.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="amount">Amount *</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter payment amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="payment-method">Payment Method *</Label>
          <Input
            id="payment-method"
            type="text"
            placeholder="e.g. Bank Transfer, Credit Card"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
      </div>
    </FormDialog>
  )
}
