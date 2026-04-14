'use client'

import { Controller } from 'react-hook-form'
import { FormDialog, FormInput } from '@/components/common'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Sku } from '@/types'
import { useUpdateSku } from '../_hooks/use-update-sku'

interface UpdateSkuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sku: Sku | null
}

export default function UpdateSku({ open, onOpenChange, sku }: UpdateSkuProps) {
  const { register, control, errors, isPending, onSubmit, uomOptions } =
    useUpdateSku(sku, () => onOpenChange(false))

  return (
    <FormDialog
      title="Update SKU"
      description="Change the fields to update"
      size="md"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        { type: 'submit', label: 'Update', loading: isPending },
      ]}
    >
      <FieldGroup>
        <FormInput
          className="h-8"
          label="Code"
          placeholder="e.g. ADD-10-2000"
          error={errors.code}
          {...register('code')}
        />

        <Controller
          control={control}
          name="uom"
          render={({ field }) => (
            <Field>
              <FieldLabel>Unit of Measurement</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select unit of measurement" />
                </SelectTrigger>
                <SelectContent>
                  {uomOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[errors.uom]} />
            </Field>
          )}
        />

        <div className="grid grid-cols-3 gap-3">
          <FormInput
            className="h-8"
            label="Sale Price"
            type="number"
            placeholder="0"
            error={errors.salePrice}
            {...register('salePrice', { valueAsNumber: true })}
          />
          <FormInput
            className="h-8"
            label="Reseller Price"
            type="number"
            placeholder="0"
            error={errors.resellerPrice}
            {...register('resellerPrice', { valueAsNumber: true })}
          />
          <FormInput
            className="h-8"
            label="Special Price"
            type="number"
            placeholder="0"
            error={errors.specialPrice}
            {...register('specialPrice', { valueAsNumber: true })}
          />
        </div>
      </FieldGroup>
    </FormDialog>
  )
}
