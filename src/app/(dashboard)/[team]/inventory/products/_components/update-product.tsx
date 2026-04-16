'use client'

import { FormDialog, FormInput } from '@/components/common'
import { FieldGroup } from '@/components/ui/field'
import { type Product } from '@/types'
import { useUpdateProduct } from '../_hooks/use-update-product'

interface UpdateProductProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

export default function UpdateProduct({
  open,
  onOpenChange,
  product,
}: UpdateProductProps) {
  const { register, errors, isPending, onSubmit } = useUpdateProduct(
    product,
    () => onOpenChange(false),
  )

  return (
    <FormDialog
      title="Update Product"
      description="Change the fields to update"
      size="sm"
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
          label="Name"
          placeholder="e.g. Additive"
          error={errors.name}
          {...register('name')}
        />
      </FieldGroup>
    </FormDialog>
  )
}
