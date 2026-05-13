import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useSupplier } from '@/services/core/supplier'
import {
  CreateSupplierSchema,
  type CreateSupplierFormData,
} from '@/schemas/supplier'
import { type GenericAddress } from '@/types'

export const useCreateSupplier = (onSuccess: () => void) => {
  const {
    createSupplier: { mutate, isPending },
  } = useSupplier({})

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateSupplierFormData>({
    resolver: zodResolver(CreateSupplierSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  })

  const handleAddressChange = useCallback(
    (address: GenericAddress | null) =>
      setValue('address', address ?? undefined, { shouldValidate: true }),
    [setValue],
  )

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        name: data.name,
        phone: data.phone || null,
        email: data.email || null,
        address: data.address!,
      },
      {
        onSuccess: () => {
          toast.success('Supplier created successfully')
          reset()
          onSuccess()
        },
        onError: () => toast.error('Failed to create supplier'),
      },
    )
  })

  return { register, errors, isPending, onSubmit, handleAddressChange }
}
