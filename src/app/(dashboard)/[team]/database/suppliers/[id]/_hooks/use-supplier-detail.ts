import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useSupplier } from '@/services/core/supplier'
import {
  CreateSupplierProductSchema,
  type CreateSupplierProductFormData,
} from '@/schemas/supplier'

export const useSupplierDetail = (supplierId: string) => {
  const [addProductOpen, setAddProductOpen] = useState(false)

  const { getSupplierDetail, createSupplierProduct } = useSupplier({
    detailId: supplierId,
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateSupplierProductFormData>({
    resolver: zodResolver(CreateSupplierProductSchema),
    defaultValues: { name: '', price: 0, unit: 'pcs' },
  })

  const handleUnitChange = (value: string) => {
    setValue('unit', value as CreateSupplierProductFormData['unit'], {
      shouldValidate: true,
    })
  }

  const onSubmit = handleSubmit((data) => {
    createSupplierProduct.mutate(
      { supplierId, payload: data },
      {
        onSuccess: () => {
          toast.success('Product added successfully')
          reset()
          setAddProductOpen(false)
        },
        onError: () => toast.error('Failed to add product'),
      },
    )
  })

  return {
    supplier: getSupplierDetail.data?.data ?? null,
    isLoading: getSupplierDetail.isLoading,
    addProductOpen,
    setAddProductOpen,
    register,
    errors,
    onSubmit,
    handleUnitChange,
    isPending: createSupplierProduct.isPending,
  }
}
