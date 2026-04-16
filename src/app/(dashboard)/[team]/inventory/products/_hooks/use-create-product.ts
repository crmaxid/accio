import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useProduct } from '@/services'
import {
  CreateProductSchema,
  type CreateProductFormData,
} from '@/schemas/product'
import { type CreateProductPayload } from '@/types'

export const useCreateProduct = (onSuccess: () => void) => {
  const {
    createProduct: { mutate, isPending },
    getRestockDeliverySelection,
  } = useProduct({})

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: '',
      productionPrice: 0,
      productRestockDeliveryId: '',
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data as unknown as CreateProductPayload, {
      onSuccess: () => {
        toast.success('Product created successfully')
        reset()
        onSuccess()
      },
      onError: () => toast.error('Failed to create product'),
    })
  })

  return {
    register,
    control,
    errors,
    isPending,
    onSubmit,
    getRestockDeliverySelection,
  }
}
