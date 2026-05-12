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
import { useCreateProduct } from '../_hooks/use-create-product'

interface CreateProductProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateProduct({
  open,
  onOpenChange,
}: CreateProductProps) {
  const {
    register,
    control,
    errors,
    isPending,
    onSubmit,
    getRestockDeliverySelection,
  } = useCreateProduct(() => onOpenChange(false))

  const { data: restockData, isLoading: isLoadingRestock } =
    getRestockDeliverySelection

  return (
    <FormDialog
      title="Create Product"
      description="Fill in the details to add a new product"
      size="md"
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
          label="Name"
          placeholder="e.g. Additive"
          error={errors.name}
          {...register('name')}
        />

        <FormInput
          className="h-8"
          label="Production Price"
          type="number"
          placeholder="e.g. 14000"
          error={errors.productionPrice}
          {...register('productionPrice', { valueAsNumber: true })}
        />

        <Controller
          control={control}
          name="productRestockDeliveryId"
          render={({ field }) => (
            <Field>
              <FieldLabel>Restock Delivery Format</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isLoadingRestock || !restockData}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select delivery package" />
                </SelectTrigger>
                <SelectContent>
                  {restockData?.data?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      <span className="font-medium capitalize">
                        {item.containerType.toLowerCase()}
                      </span>
                      <span className="ml-2 text-gray-400">
                        {item.containerCapacity} {item.uom.toLowerCase()}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[errors.productRestockDeliveryId]} />
            </Field>
          )}
        />
      </FieldGroup>
    </FormDialog>
  )
}
