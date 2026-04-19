import { useCallback, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useDelivery } from '@/services/core/delivery'
import { useRestock } from '@/services/core/restock'
import {
  CreateDeliverySchema,
  type CreateDeliveryFormData,
} from '@/schemas/delivery'
import { type RestockSelection, type RestockProductSelection } from '@/types'

interface DeliveryItem {
  stockReplenishmentProductId: string
  quantity: number
  remainingBox: number
  productName: string
}

export const useCreateDelivery = (onSuccess: () => void) => {
  const {
    createDelivery: { mutate, isPending },
  } = useDelivery({ page: 1, limit: 10 })

  const { getRestockSelection } = useRestock({ page: 1, limit: 10 })

  const [selectedRestock, setSelectedRestock] =
    useState<RestockSelection | null>(null)
  const [items, setItems] = useState<DeliveryItem[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateDeliveryFormData>({
    resolver: zodResolver(CreateDeliverySchema),
    defaultValues: {
      deliveryDate: '',
      stockReplenishmentRequestId: '',
      notes: '',
      enableNotification: true,
    },
  })

  const enableNotification = useWatch({ control, name: 'enableNotification' })

  const handleSelectRestock = (
    restockId: string,
    allRestocks: RestockSelection[],
  ) => {
    const restock = allRestocks.find((r) => r.id === restockId)
    if (!restock) return

    setSelectedRestock(restock)
    setValue('stockReplenishmentRequestId', restock.id)

    const availableProducts = restock.products.filter((p) => p.remainingBox > 0)
    setItems(
      availableProducts.map((p: RestockProductSelection) => ({
        stockReplenishmentProductId: p.id,
        quantity: 1,
        remainingBox: p.remainingBox,
        productName: p.product.name,
      })),
    )
  }

  const handleCountChange = useCallback((productId: string, count: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.stockReplenishmentProductId === productId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(count, item.remainingBox)),
            }
          : item,
      ),
    )
  }, [])

  const handleRemoveItem = useCallback((productId: string) => {
    setItems((prev) =>
      prev.filter((item) => item.stockReplenishmentProductId !== productId),
    )
  }, [])

  const handleReset = useCallback(() => {
    setSelectedRestock(null)
    setItems([])
    reset()
  }, [reset])

  const onSubmit = handleSubmit((data) => {
    if (items.length === 0) {
      toast.error('Please select at least one product to deliver')
      return
    }

    mutate(
      {
        restockId: selectedRestock!.id,
        deliveryDate: data.deliveryDate,
        items: items.map(({ stockReplenishmentProductId, quantity }) => ({
          stockReplenishmentProductId,
          quantity,
        })),
        notes: data.notes || undefined,
        enableNotification: data.enableNotification,
      },
      {
        onSuccess: () => {
          toast.success('Delivery created successfully')
          handleReset()
          onSuccess()
        },
        onError: () => toast.error('Failed to create delivery'),
      },
    )
  })

  return {
    register,
    errors,
    isPending,
    onSubmit,
    setValue,
    enableNotification,
    selectedRestock,
    items,
    getRestockSelection,
    handleSelectRestock,
    handleCountChange,
    handleRemoveItem,
    handleReset,
  }
}
