import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useSales } from '@/services'
import { useCustomer } from '@/services'
import { useSku } from '@/services'
import { CreateSaleSchema, type CreateSaleFormData } from '@/schemas/sale'
import { type SkuOrderSelection } from '@/types'

interface OrderProduct {
  skuId: string
  quantity: number
  unitPrice: number
}

const defaultValues: CreateSaleFormData = {
  customerId: '',
  shippingProviderId: '',
  orderType: 'SALE',
  date: '',
  notes: '',
  method: 'Bank Transfer',
  currency: 'IDR',
  taxAmount: 0,
  shippingFee: 0,
  discount: 0,
}

export const useCreateSale = (onSuccess: () => void) => {
  const {
    createOrder: { mutate, isPending },
    getShippingProviderSelection,
  } = useSales({ page: 1, limit: 10 })

  const { getCustomerSelection } = useCustomer({})
  const { getSkuOrderSelection } = useSku({ page: 1, limit: 10 })

  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateSaleFormData>({
    resolver: zodResolver(CreateSaleSchema),
    defaultValues,
  })

  const subTotal = useMemo(
    () => orderProducts.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0),
    [orderProducts],
  )

  const handleSelectProduct = useCallback(
    (skuId: string, allSkus: SkuOrderSelection[]) => {
      if (orderProducts.some((p) => p.skuId === skuId)) return
      const sku = allSkus.find((s) => s.id === skuId)
      if (!sku) return
      setOrderProducts((prev) => [
        ...prev,
        { skuId: sku.id, quantity: 1, unitPrice: sku.salePrice },
      ])
    },
    [orderProducts],
  )

  const handleQuantityChange = useCallback(
    (skuId: string, quantity: number) => {
      setOrderProducts((prev) =>
        prev.map((p) =>
          p.skuId === skuId ? { ...p, quantity: Math.max(1, quantity) } : p,
        ),
      )
    },
    [],
  )

  const handleUnitPriceChange = useCallback((skuId: string, price: number) => {
    setOrderProducts((prev) =>
      prev.map((p) =>
        p.skuId === skuId ? { ...p, unitPrice: Math.max(0, price) } : p,
      ),
    )
  }, [])

  const handleRemoveProduct = useCallback((skuId: string) => {
    setOrderProducts((prev) => prev.filter((p) => p.skuId !== skuId))
  }, [])

  const handleReset = useCallback(() => {
    setOrderProducts([])
    reset(defaultValues)
  }, [reset])

  const onSubmit = handleSubmit((data) => {
    if (orderProducts.length === 0) {
      toast.error('Please select at least one product')
      return
    }

    const amount =
      subTotal -
      (data.discount || 0) +
      (data.taxAmount || 0) +
      (data.shippingFee || 0)

    mutate(
      {
        customerId: data.customerId,
        shippingProviderId: data.shippingProviderId || undefined,
        orderType: data.orderType,
        date: data.date,
        notes: data.notes || null,
        product: orderProducts,
        payment: {
          amount,
          currency: data.currency,
          method: data.method,
          taxAmount: data.taxAmount,
          subTotal,
          shippingFee: data.shippingFee,
          discount: data.discount,
        },
      },
      {
        onSuccess: () => {
          toast.success('Order created successfully')
          handleReset()
          onSuccess()
        },
        onError: () => toast.error('Failed to create order'),
      },
    )
  })

  return {
    register,
    control,
    errors,
    isPending,
    orderProducts,
    subTotal,
    getCustomerSelection,
    getShippingProviderSelection,
    getSkuOrderSelection,
    handleSelectProduct,
    handleQuantityChange,
    handleUnitPriceChange,
    handleRemoveProduct,
    handleReset,
    onSubmit,
  }
}
