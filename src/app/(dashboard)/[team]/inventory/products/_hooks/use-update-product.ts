import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useProduct } from '@/services'
import {
  UpdateProductSchema,
  type UpdateProductFormData,
} from '@/schemas/product'
import { type Product, type UpdateProductPayload } from '@/types'

export const useUpdateProduct = (
  product: Product | null,
  onSuccess: () => void,
) => {
  const {
    updateProduct: { mutate, isPending },
  } = useProduct({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: { name: '' },
  })

  useEffect(() => {
    if (product) {
      reset({ name: product.name })
    }
  }, [product, reset])

  const onSubmit = handleSubmit((data) => {
    if (!product) return
    mutate(
      { id: product.id, ...(data as UpdateProductPayload) },
      {
        onSuccess: () => {
          toast.success('Product updated successfully')
          onSuccess()
        },
        onError: () => toast.error('Failed to update product'),
      },
    )
  })

  return { register, errors, isPending, onSubmit }
}
