'use client'

import { Controller } from 'react-hook-form'
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
import { useProduct } from '@/services'
import { useCreateSku } from '../_hooks/use-create-sku'

interface CreateSkuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateSku({ open, onOpenChange }: CreateSkuProps) {
  const { register, control, errors, isPending, onSubmit, uomOptions } =
    useCreateSku(() => onOpenChange(false))

  const { getProductSelection } = useProduct({})
  const { data: productData, isLoading: isLoadingProducts } =
    getProductSelection

  return (
    <FormDialog
      title="Create SKU"
      description="Fill in the details to add a new SKU"
      size="lg"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        { type: 'submit', label: 'Create', loading: isPending },
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

        <FormInput
          className="h-8"
          label="Unit Count"
          type="number"
          placeholder="Enter unit count"
          error={errors.unitCount}
          {...register('unitCount', { valueAsNumber: true })}
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

        <Controller
          control={control}
          name="productId"
          render={({ field }) => (
            <Field>
              <FieldLabel>Product</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isLoadingProducts || !productData}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {productData?.data?.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[errors.productId]} />
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <input
            id="mainSku"
            type="checkbox"
            className="accent-primary h-4 w-4 rounded border-gray-300"
            {...register('mainSku')}
          />
          <FieldLabel htmlFor="mainSku" className="cursor-pointer font-normal">
            Main SKU
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FormDialog>
  )
}
