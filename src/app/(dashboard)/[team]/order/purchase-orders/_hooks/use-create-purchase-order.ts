import { useState } from 'react'
import { toast } from 'sonner'
import { usePurchaseOrder } from '@/services/core/purchase-order'
import { PurchaseOrderProductFormItem } from '@/schemas/purchase-order'

interface ProductRow extends PurchaseOrderProductFormItem {
  productName: string
}

export const useCreatePurchaseOrder = (onSuccess: () => void) => {
  const { createPurchaseOrder } = usePurchaseOrder({})
  const [customerId, setCustomerId] = useState('')
  const [products, setProducts] = useState<ProductRow[]>([])
  const [notes, setNotes] = useState('')

  const addProduct = (productId: string, productName: string) => {
    if (products.some((p) => p.productId === productId)) return
    setProducts((prev) => [
      ...prev,
      { productId, productName, quantity: 1, price: 0 },
    ])
  }

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index))
  }

  const updateProduct = (
    index: number,
    field: 'quantity' | 'price',
    value: number,
  ) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    )
  }

  const isValid =
    customerId.trim().length > 0 &&
    products.length > 0 &&
    products.every((p) => p.quantity > 0 && p.price > 0)

  const reset = () => {
    setCustomerId('')
    setProducts([])
    setNotes('')
  }

  const onSubmit = () => {
    if (!isValid) return
    createPurchaseOrder.mutate(
      {
        customerId,
        products: products.map(({ productId, quantity, price }) => ({
          productId,
          quantity,
          price,
        })),
        notes: notes || null,
      },
      {
        onSuccess: () => {
          toast.success('Purchase order created successfully')
          reset()
          onSuccess()
        },
        onError: () => toast.error('Failed to create purchase order'),
      },
    )
  }

  return {
    customerId,
    setCustomerId,
    products,
    notes,
    setNotes,
    addProduct,
    removeProduct,
    updateProduct,
    isValid,
    onSubmit,
    isPending: createPurchaseOrder.isPending,
  }
}
