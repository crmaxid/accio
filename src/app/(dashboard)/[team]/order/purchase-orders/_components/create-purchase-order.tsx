'use client'

import { useState } from 'react'
import { Cancel01Icon, AddSquareIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { FormDialog } from '@/components/common/form-dialog'
import { FormCombobox } from '@/components/common/form-combobox'
import { FormInput } from '@/components/common/form-input'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { useCustomer } from '@/services/core/customer'
import { useProduct } from '@/services/core/product'
import { useCreatePurchaseOrder } from '../_hooks/use-create-purchase-order'

interface CreatePurchaseOrderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreatePurchaseOrder({
  open,
  onOpenChange,
}: CreatePurchaseOrderProps) {
  const [selectedProductId, setSelectedProductId] = useState('')

  const {
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
    isPending,
  } = useCreatePurchaseOrder(() => {
    setSelectedProductId('')
    onOpenChange(false)
  })

  const { getCustomerSelection } = useCustomer({})
  const { getProductSelection } = useProduct({})

  const customers = getCustomerSelection.data?.data ?? []
  const productOptions = getProductSelection.data?.data ?? []

  const handleAddProduct = () => {
    const product = productOptions.find((p) => p.id === selectedProductId)
    if (!product) return
    addProduct(product.id, product.name)
    setSelectedProductId('')
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Purchase Order"
      description="Select a customer and add products to create a purchase order."
      size="lg"
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        {
          type: 'submit',
          label: 'Create',
          loading: isPending,
          disabled: !isValid,
          onClick: onSubmit,
        },
      ]}
    >
      <FieldGroup>
        <FormCombobox
          label="Customer"
          items={customers}
          value={customerId}
          onValueChange={setCustomerId}
          getItemValue={(c) => c.id}
          getItemLabel={(c) => c.name}
          renderItem={(c) => (
            <div className="flex flex-col">
              <span className="text-xs font-medium">{c.name}</span>
              {c.phone && (
                <span className="text-[11px] text-gray-400">{c.phone}</span>
              )}
            </div>
          )}
          placeholder="Select customer..."
          searchPlaceholder="Search customers..."
        />

        <div className="flex flex-col gap-2">
          <FieldLabel>Products</FieldLabel>
          <div className="flex gap-2">
            <div className="flex-1">
              <FormCombobox
                items={productOptions.filter(
                  (p) => !products.some((row) => row.productId === p.id),
                )}
                value={selectedProductId}
                onValueChange={setSelectedProductId}
                getItemValue={(p) => p.id}
                getItemLabel={(p) => p.name}
                placeholder="Select product to add..."
                searchPlaceholder="Search products..."
              />
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 shrink-0"
              disabled={!selectedProductId}
              onClick={handleAddProduct}
            >
              <HugeiconsIcon icon={AddSquareIcon} size={14} strokeWidth={2} />
              Add
            </Button>
          </div>

          {products.length > 0 && (
            <div className="flex flex-col gap-2 rounded-lg border border-gray-100 p-3">
              {products.map((product, index) => (
                <div
                  key={product.productId}
                  className="flex items-center gap-2"
                >
                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-gray-700">
                    {product.productName}
                  </span>
                  <div className="w-20">
                    <FormInput
                      label=""
                      className="h-7 text-xs"
                      type="number"
                      placeholder="Qty"
                      defaultValue={product.quantity}
                      onChange={(e) =>
                        updateProduct(index, 'quantity', Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="w-28">
                    <FormInput
                      label=""
                      className="h-7 text-xs"
                      type="number"
                      placeholder="Price"
                      defaultValue={product.price}
                      onChange={(e) =>
                        updateProduct(index, 'price', Number(e.target.value))
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-gray-400 hover:text-red-500"
                    onClick={() => removeProduct(index)}
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      size={14}
                      strokeWidth={2}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Field>
          <FieldLabel>
            Notes{' '}
            <span className="text-xs font-normal text-gray-400">(optional)</span>
          </FieldLabel>
          <Textarea
            className="resize-none text-xs"
            rows={2}
            placeholder="Additional notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Field>
      </FieldGroup>
    </FormDialog>
  )
}
