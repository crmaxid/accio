'use client'

import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { FormDialog, FormInput } from '@/components/common'
import { Input } from '@/components/ui/input'
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
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { useCreateBundle } from '../_hooks/use-create-bundle'

interface CreateBundleProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateBundle({
  open,
  onOpenChange,
}: CreateBundleProps) {
  const {
    register,
    control,
    errors,
    isPending,
    fields,
    append,
    remove,
    onSubmit,
    handleReset,
    getSkuOrderSelection,
  } = useCreateBundle(() => onOpenChange(false))

  const {
    data: skuData,
    isLoading: isLoadingSku,
    refetch,
  } = getSkuOrderSelection

  const handleOpenChange = (value: boolean) => {
    if (!value) handleReset()
    onOpenChange(value)
  }

  useEffect(() => {
    if (open) refetch()
  }, [open, refetch])

  return (
    <FormDialog
      title="Create Bundle"
      description="Add a new SKU group with a code and items"
      size="md"
      open={open}
      onOpenChange={handleOpenChange}
      onSubmit={onSubmit}
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        { type: 'submit', label: 'Create Bundle', loading: isPending },
      ]}
    >
      <FieldGroup>
        <FormInput
          className="h-8"
          label="Bundle Code"
          placeholder="e.g. BUNDLE-001"
          error={errors.code}
          {...register('code')}
        />

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel>SKU Items</FieldLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 gap-1 px-2 text-xs"
              onClick={() => append({ skuId: '', quantity: 1 })}
            >
              <HugeiconsIcon icon={Add01Icon} size={11} strokeWidth={2} />
              Add
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Controller
                  control={control}
                  name={`skuGroupItems.${index}.skuId`}
                  render={({ field: f }) => (
                    <Select
                      value={f.value}
                      onValueChange={f.onChange}
                      disabled={isLoadingSku}
                    >
                      <SelectTrigger className="h-8 flex-1">
                        <SelectValue placeholder="Select SKU" />
                      </SelectTrigger>
                      <SelectContent>
                        {skuData?.data?.map((sku) => (
                          <SelectItem key={sku.id} value={sku.id}>
                            <span className="font-mono font-medium">
                              {sku.code}
                            </span>
                            <span className="ml-1.5 text-[11px] text-gray-400">
                              {sku.product.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  type="number"
                  min={1}
                  placeholder="Qty"
                  className="h-8 w-20"
                  {...register(`skuGroupItems.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-gray-300 hover:text-red-400"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={12}
                    strokeWidth={2}
                  />
                </Button>
              </div>
            ))}
            <FieldError errors={[errors.skuGroupItems?.root]} />
          </div>
        </Field>
      </FieldGroup>
    </FormDialog>
  )
}
