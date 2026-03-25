'use client'

import { FormDialog, FormInput } from '@/components/common'
import { FieldError, FieldGroup } from '@/components/ui/field'
import AddressFinder from '@/components/map/address-finder'
import { useCreateCustomer } from '../_hooks/use-create-customer'

interface CreateCustomerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateCustomer({
  open,
  onOpenChange,
}: CreateCustomerProps) {
  const { register, errors, onSubmit, handleAddressChange, isPending } =
    useCreateCustomer(() => onOpenChange(false))

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Customer"
      description="Fill in the details to add a new customer."
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
          placeholder="Customer name"
          error={errors.name}
          {...register('name')}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            className="h-8"
            label="Phone"
            prefix="+62"
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
          errors={[errors.shippingAddress as { message?: string } | undefined]}
        />
      </FieldGroup>
    </FormDialog>
  )
}
