'use client'

import { FormDialog } from '@/components/common'
import { useStockAdjustment } from '../_hooks/use-stock-adjustment'
import { StockAdjustmentRow } from './stock-adjustment-row'

interface CreateStockAdjustmentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateStockAdjustment({
  open,
  onOpenChange,
}: CreateStockAdjustmentProps) {
  const {
    getSkuStockSelection,
    items,
    isPending,
    isLoading,
    handleQuantityChange,
    handleReset,
    handleSubmit,
  } = useStockAdjustment(open, () => onOpenChange(false))

  const { data } = getSkuStockSelection

  const handleOpenChange = (value: boolean) => {
    if (!value) handleReset()
    onOpenChange(value)
  }

  return (
    <FormDialog
      title="Stock Adjustment"
      description="Set the actual stock count for each SKU"
      size="md"
      open={open}
      onOpenChange={handleOpenChange}
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        {
          type: 'submit',
          label: 'Submit Adjustment',
          loading: isPending,
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="max-h-[55vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <span className="text-xs text-gray-400">Loading SKUs...</span>
          </div>
        ) : !data?.data?.length ? (
          <p className="py-6 text-center text-xs text-gray-400">
            No SKUs available.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {data.data.map((sku) => {
              const item = items.find((i) => i.skuId === sku.id)
              return (
                <StockAdjustmentRow
                  key={sku.id}
                  item={sku}
                  quantity={item?.quantity ?? sku.stock?.actualQuantity ?? 0}
                  onQuantityChange={handleQuantityChange}
                />
              )
            })}
          </div>
        )}
      </div>
    </FormDialog>
  )
}
