import { useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useSku } from '@/services'
import { CreateBundleSchema, type CreateBundleFormData } from '@/schemas/bundle'

const defaultValues: CreateBundleFormData = {
  code: '',
  skuGroupItems: [{ skuId: '', quantity: 1 }],
}

export const useCreateBundle = (onSuccess: () => void) => {
  const {
    createBundle: { mutate, isPending },
    getSkuOrderSelection,
  } = useSku({ page: 1, limit: 10 })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateBundleFormData>({
    resolver: zodResolver(CreateBundleSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skuGroupItems',
  })

  const handleReset = useCallback(() => reset(defaultValues), [reset])

  const onSubmit = handleSubmit((data) => {
    const validItems = data.skuGroupItems.filter(
      (i) => i.skuId && i.quantity > 0,
    )
    mutate(
      { code: data.code.trim(), skuGroupItems: validItems },
      {
        onSuccess: () => {
          toast.success('Bundle created successfully')
          handleReset()
          onSuccess()
        },
        onError: () => toast.error('Failed to create bundle'),
      },
    )
  })

  return {
    register,
    control,
    errors,
    isPending,
    fields,
    append,
    remove,
    onSubmit,
    handleReset,
    getSkuOrderSelection,
  }
}
