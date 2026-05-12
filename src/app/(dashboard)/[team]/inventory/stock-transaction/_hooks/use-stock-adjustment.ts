import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useSku } from '@/services'

export const useStockAdjustment = (open: boolean, onSuccess: () => void) => {
  const {
    getSkuStockSelection,
    stockAdjustment: { mutate, isPending },
  } = useSku({ page: 1, limit: 10 })

  const [overrides, setOverrides] = useState<Map<string, number>>(new Map())

  const { data, isLoading, refetch } = getSkuStockSelection

  useEffect(() => {
    if (open) refetch()
  }, [open, refetch])

  const items = useMemo(
    () =>
      data?.data?.map((sku) => ({
        skuId: sku.id,
        quantity: overrides.get(sku.id) ?? sku.stock?.actualQuantity ?? 0,
      })) ?? [],
    [data, overrides],
  )

  const handleQuantityChange = useCallback(
    (skuId: string, quantity: number) => {
      setOverrides((prev) => new Map(prev).set(skuId, Math.max(0, quantity)))
    },
    [],
  )

  const handleReset = useCallback(() => setOverrides(new Map()), [])

  const handleSubmit = () => {
    mutate(
      { items },
      {
        onSuccess: () => {
          toast.success('Stock adjustment submitted successfully')
          handleReset()
          refetch()
          onSuccess()
        },
        onError: () => toast.error('Failed to submit stock adjustment'),
      },
    )
  }

  return {
    getSkuStockSelection,
    items,
    isPending,
    isLoading,
    handleQuantityChange,
    handleReset,
    handleSubmit,
  }
}
