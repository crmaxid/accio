'use client'

import { FormDialog } from '@/components/common/form-dialog'
import { FormInput } from '@/components/common/form-input'
import { FieldError, FieldGroup } from '@/components/ui/field'
import AddressFinder from '@/components/map/address-finder'
import { useCreateSupplier } from '../_hooks/use-create-supplier'

interface CreateSupplierProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateSupplier({
  open,
  onOpenChange,
}: CreateSupplierProps) {
  const { register, errors, onSubmit, handleAddressChange, isPending } =
    useCreateSupplier(() => onOpenChange(false))

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Supplier"
      description="Fill in the details to add a new supplier."
      size="lg"
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
          placeholder="Supplier name"
          error={errors.name}
          {...register('name')}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            className="h-8"
            label="Phone"
            optional
            placeholder="Phone number"
            error={errors.phone}
            {...register('phone')}
          />
          <FormInput
            className="h-8"
            label="Email"
            optional
            type="email"
            placeholder="Email address"
            error={errors.email}
            {...register('email')}
          />
        </div>
        <AddressFinder onChange={handleAddressChange} />
        <FieldError
          errors={[errors.address as { message?: string } | undefined]}
        />
      </FieldGroup>
    </FormDialog>
  )
}
