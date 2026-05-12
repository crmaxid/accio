import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useSku } from '@/services'
import { UpdateSkuSchema, type UpdateSkuFormData } from '@/schemas/sku'
import { type Sku, type UpdateSkuPayload } from '@/types'
import { Uom } from '@/enums/uom.enum'

const UOM_OPTIONS = Object.values(Uom).map((value) => ({
  label: value.charAt(0) + value.slice(1).toLowerCase(),
  value,
}))

export const useUpdateSku = (sku: Sku | null, onSuccess: () => void) => {
  const {
    updateSku: { mutate, isPending },
  } = useSku({ page: 1, limit: 10 })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateSkuFormData>({
    resolver: zodResolver(UpdateSkuSchema),
    defaultValues: {
      code: '',
      uom: '',
      salePrice: 0,
      resellerPrice: 0,
      specialPrice: 0,
    },
  })

  useEffect(() => {
    if (sku) {
      reset({
        code: sku.code ?? '',
        uom: sku.uom ?? '',
        salePrice: sku.salePrice ?? 0,
        resellerPrice: sku.resellerPrice ?? 0,
        specialPrice: sku.specialPrice ?? 0,
      })
    }
  }, [sku, reset])

  const onSubmit = handleSubmit((data) => {
    if (!sku) return
    mutate(
      { id: sku.id, ...(data as unknown as UpdateSkuPayload) },
      {
        onSuccess: () => {
          toast.success('SKU updated successfully')
          onSuccess()
        },
        onError: () => toast.error('Failed to update SKU'),
      },
    )
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
