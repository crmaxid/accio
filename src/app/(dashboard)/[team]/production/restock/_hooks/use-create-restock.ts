import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { useRestock } from '@/services/core/restock'
import { useProduct } from '@/services'
import { type ProductSelection } from '@/types'

interface SelectedProduct {
  id: string
  name: string
  uom: string
  containerCapacity: number
  count: number
}

export const useCreateRestock = (onSuccess: () => void) => {
  const {
    createRestock: { mutate, isPending },
  } = useRestock({ page: 1, limit: 10 })

  const { getProductSelection } = useProduct({})

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  )
  const [notes, setNotes] = useState('')

  const handleSelect = (productId: string, allProducts: ProductSelection[]) => {
    const product = allProducts.find((p) => p.id === productId)
    if (!product || selectedProducts.some((p) => p.id === productId)) return

    setSelectedProducts((prev) => [
      ...prev,
      {
        id: product.id,
        name: product.name,
        uom: product.restockDelivery.uom,
        containerCapacity: product.restockDelivery.containerCapacity,
        count: 1,
      },
    ])
  }

  const handleCountChange = useCallback((productId: string, count: number) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, count: Math.max(1, count) } : p,
      ),
    )
  }, [])

  const handleRemove = useCallback((productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const handleReset = useCallback(() => {
    setSelectedProducts([])
    setNotes('')
  }, [])

  const handleSubmit = () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product')
      return
    }

    mutate(
      {
        products: selectedProducts.map((p) => ({
          productId: p.id,
          quantity: p.count * p.containerCapacity,
          uom: p.uom,
        })),
        notes: notes || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Restock requested successfully')
          handleReset()
          onSuccess()
        },
        onError: () => toast.error('Failed to request restock'),
      },
    )
  }

  return {
    selectedProducts,
    notes,
    setNotes,
    isPending,
    getProductSelection,
    handleSelect,
    handleCountChange,
    handleRemove,
    handleReset,
    handleSubmit,
  }
}
