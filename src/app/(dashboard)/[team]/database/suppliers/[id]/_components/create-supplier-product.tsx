'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormDialog } from '@/components/common/form-dialog'
import { FormInput } from '@/components/common/form-input'
import { FieldGroup } from '@/components/ui/field'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CreateSupplierProductFormData,
  SUPPLIER_PRODUCT_UNITS,
} from '@/schemas/supplier'

interface CreateSupplierProductProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  register: UseFormRegister<CreateSupplierProductFormData>
  errors: FieldErrors<CreateSupplierProductFormData>
  onSubmit: React.FormEventHandler
  isPending: boolean
  onUnitChange: (value: string) => void
}

export default function CreateSupplierProduct({
  open,
  onOpenChange,
  register,
  errors,
  onSubmit,
  isPending,
  onUnitChange,
}: CreateSupplierProductProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Product"
      description="Add a product that this supplier provides."
      size="sm"
      onSubmit={onSubmit}
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        { type: 'submit', label: 'Add', loading: isPending },
      ]}
    >
      <FieldGroup>
        <FormInput
          className="h-8"
          label="Product Name"
          placeholder="e.g. Base Oil SN 500"
          error={errors.name}
          {...register('name')}
        />
        <FormInput
          className="h-8"
          label="Price"
          type="number"
          placeholder="0"
          error={errors.price}
          {...register('price', { valueAsNumber: true })}
        />
        <Field>
          <FieldLabel>Unit</FieldLabel>
          <Select defaultValue="pcs" onValueChange={onUnitChange}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {SUPPLIER_PRODUCT_UNITS.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.unit && (
            <p className="text-xs text-red-500">{errors.unit.message}</p>
          )}
        </Field>
      </FieldGroup>
    </FormDialog>
  )
}
