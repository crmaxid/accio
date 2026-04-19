'use client'

import { FormDialog, FormInput } from '@/components/common'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { HugeiconsIcon } from '@hugeicons/react'
import { DeliveryBox01Icon } from '@hugeicons/core-free-icons'
import { format } from 'date-fns'
import { useCreateDelivery } from '../_hooks/use-create-delivery'
import { DeliveryProductRow } from './delivery-product-row'
import { useEffect } from 'react'

interface CreateDeliveryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateDelivery({
  open,
  onOpenChange,
}: CreateDeliveryProps) {
  const {
    register,
    errors,
    isPending,
    onSubmit,
    setValue,
    enableNotification,
    selectedRestock,
    items,
    getRestockSelection,
    handleSelectRestock,
    handleCountChange,
    handleRemoveItem,
    handleReset,
  } = useCreateDelivery(() => onOpenChange(false))

  const {
    data: restockData,
    isLoading: isLoadingRestock,
    refetch,
  } = getRestockSelection

  const handleOpenChange = (value: boolean) => {
    if (!value) handleReset()
    onOpenChange(value)
  }

  useEffect(() => {
    if (open) refetch()
  }, [open, refetch])

  return (
    <FormDialog
      title="Create Delivery"
      description="Select a restock request and configure delivery details"
      size="lg"
      open={open}
      onOpenChange={handleOpenChange}
      onSubmit={onSubmit}
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        { type: 'submit', label: 'Create Delivery', loading: isPending },
      ]}
    >
      <FieldGroup>
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            className="h-8"
            label="Delivery Date"
            type="date"
            error={errors.deliveryDate}
            min={format(new Date(), 'yyyy-MM-dd')}
            {...register('deliveryDate')}
          />

          <Field>
            <FieldLabel>Restock Request</FieldLabel>
            <Select
              onValueChange={(id) =>
                handleSelectRestock(id, restockData?.data ?? [])
              }
              disabled={isLoadingRestock || !restockData?.data?.length}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select request..." />
              </SelectTrigger>
              <SelectContent>
                {restockData?.data?.map((restock) => (
                  <SelectItem key={restock.id} value={restock.id}>
                    <span className="font-medium">{restock.number}</span>
                    <span className="ml-2 text-[11px] text-gray-400">
                      {format(new Date(restock.createdAt), 'dd MMM yyyy')}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[errors.stockReplenishmentRequestId]} />
          </Field>
        </div>

        <Separator />

        {!selectedRestock ? (
          <div className="flex flex-col items-center gap-2 py-6 text-gray-400">
            <HugeiconsIcon
              icon={DeliveryBox01Icon}
              size={32}
              strokeWidth={1.5}
              className="opacity-40"
            />
            <p className="text-xs">Select a restock request to see products</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-4 text-gray-400">
            <p className="text-xs">
              No products with remaining stock in this request
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <DeliveryProductRow
                key={item.stockReplenishmentProductId}
                {...item}
                onCountChange={handleCountChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        )}

        {selectedRestock && (
          <>
            <Field>
              <FieldLabel>
                Notes{' '}
                <span className="text-xs font-normal text-gray-400">
                  (optional)
                </span>
              </FieldLabel>
              <Textarea
                placeholder="Add any delivery notes..."
                {...register('notes')}
              />
            </Field>

            <Field orientation="horizontal">
              <input
                id="enableNotification"
                type="checkbox"
                className="accent-primary h-4 w-4 rounded border-gray-300"
                checked={enableNotification}
                onChange={(e) =>
                  setValue('enableNotification', e.target.checked)
                }
              />
              <FieldLabel
                htmlFor="enableNotification"
                className="cursor-pointer font-normal"
              >
                Send notification
              </FieldLabel>
            </Field>
          </>
        )}
      </FieldGroup>
    </FormDialog>
  )
}
