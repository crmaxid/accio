import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useSku } from '@/services'
import { CreateSkuSchema, type CreateSkuFormData } from '@/schemas/sku'
import { type CreateSkuPayload } from '@/types'
import { Uom } from '@/enums/uom.enum'

const UOM_OPTIONS = Object.values(Uom).map((value) => ({
  label: value.charAt(0) + value.slice(1).toLowerCase(),
  value,
}))

export const useCreateSku = (onSuccess: () => void) => {
  const {
    createSku: { mutate, isPending },
  } = useSku({ page: 1, limit: 10 })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateSkuFormData>({
    resolver: zodResolver(CreateSkuSchema),
    defaultValues: {
      code: '',
      productId: '',
      uom: '',
      unitCount: 0,
      salePrice: 0,
      resellerPrice: 0,
      specialPrice: 0,
      mainSku: false,
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data as unknown as CreateSkuPayload, {
      onSuccess: () => {
        toast.success('SKU created successfully')
        reset()
        onSuccess()
      },
      onError: () => toast.error('Failed to create SKU'),
    })
  })

  return {
    register,
    control,
    errors,
    isPending,
    onSubmit,
    uomOptions: UOM_OPTIONS,
  }
}
