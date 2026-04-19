'use client'

import { FormDialog } from '@/components/common'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { HugeiconsIcon } from '@hugeicons/react'
import { PackageIcon } from '@hugeicons/core-free-icons'
import { useCreateRestock } from '../_hooks/use-create-restock'
import { RestockProductRow } from './restock-product-row'

interface CreateRestockProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateRestock({
  open,
  onOpenChange,
}: CreateRestockProps) {
  const {
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
  } = useCreateRestock(() => onOpenChange(false))

  const { data: productData, isLoading: isLoadingProducts } =
    getProductSelection

  const handleOpenChange = (value: boolean) => {
    if (!value) handleReset()
    onOpenChange(value)
  }

  return (
    <FormDialog
      title="Request Restock"
      description="Select products and set quantities"
      size="md"
      open={open}
      onOpenChange={handleOpenChange}
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        {
          type: 'submit',
          label: 'Submit Request',
          loading: isPending,
          onClick: handleSubmit,
        },
      ]}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Add Product</FieldLabel>
          <Select
            value=""
            onValueChange={(id) => handleSelect(id, productData?.data ?? [])}
            disabled={isLoadingProducts}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Choose product to add..." />
            </SelectTrigger>
            <SelectContent>
              {productData?.data?.map((product) => {
                const isSelected = selectedProducts.some(
                  (p) => p.id === product.id,
                )
                return (
                  <SelectItem
                    key={product.id}
                    value={product.id}
                    disabled={isSelected}
                  >
                    {product.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </Field>

        <Separator />

        {selectedProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-6 text-gray-400">
            <HugeiconsIcon
              icon={PackageIcon}
              size={32}
              strokeWidth={1.5}
              className="opacity-40"
            />
            <p className="text-xs">No products selected yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {selectedProducts.map((product) => (
              <RestockProductRow
                key={product.id}
                {...product}
                onCountChange={handleCountChange}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

        {selectedProducts.length > 0 && (
          <Field>
            <FieldLabel>
              Notes{' '}
              <span className="text-xs font-normal text-gray-400">
                (optional)
              </span>
            </FieldLabel>
            <Textarea
              placeholder="Add any notes for this restock request..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
        )}
      </FieldGroup>
    </FormDialog>
  )
}
