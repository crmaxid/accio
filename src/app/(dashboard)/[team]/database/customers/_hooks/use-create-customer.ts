import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useCustomer } from '@/services/core/customer'
import {
  CreateCustomerSchema,
  type CreateCustomerFormData,
} from '@/schemas/customer'
import { type GenericAddress } from '@/types'

export const useCreateCustomer = (onSuccess: () => void) => {
  const {
    createCustomer: { mutate, isPending },
  } = useCustomer({})

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(CreateCustomerSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  })

  const handleAddressChange = useCallback(
    (address: GenericAddress | null) =>
      setValue('shippingAddress', address ?? undefined, {
        shouldValidate: true,
      }),
    [setValue],
  )

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        shippingAddress: data.shippingAddress!,
      },
      {
        onSuccess: () => {
          toast.success('Customer created successfully')
          reset()
          onSuccess()
        },
        onError: () => toast.error('Failed to create customer'),
      },
    )
  })

  return {
    register,
    errors,
    isPending,
    onSubmit,
    handleAddressChange,
  }
}
