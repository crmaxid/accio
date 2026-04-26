'use client'

import { useEffect } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import {
  FormCombobox,
  FormDialog,
  FormInput,
  FormSelect,
  FormTextarea,
} from '@/components/common'
import { FieldGroup } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { HugeiconsIcon } from '@hugeicons/react'
import { PackageIcon } from '@hugeicons/core-free-icons'
import { useCreateSale } from '../_hooks/use-create-sale'
import { SaleProductRow } from './sale-product-row'
import type { CustomerSelection, ShippingProviderSelection } from '@/types'

interface CreateSaleProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ORDER_TYPES = [
  { value: 'SALE', label: 'Sale' },
  { value: 'EMPLOYEE_BENEFIT', label: 'Employee Benefit' },
  { value: 'OWNER_BENEFIT', label: 'Owner Benefit' },
]

const PAYMENT_METHODS = [
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'Cash', label: 'Cash' },
]

const formatIDR = (value: number) =>
  value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })

export default function CreateSale({ open, onOpenChange }: CreateSaleProps) {
  const {
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
  } = useCreateSale(() => onOpenChange(false))

  const { data: customerData, refetch: refetchCustomers } = getCustomerSelection
  const { data: providerData, refetch: refetchProviders } =
    getShippingProviderSelection
  const { data: skuData, refetch: refetchSkus } = getSkuOrderSelection

  const discount = useWatch({ control, name: 'discount' }) ?? 0
  const taxAmount = useWatch({ control, name: 'taxAmount' }) ?? 0
  const shippingFee = useWatch({ control, name: 'shippingFee' }) ?? 0
  const amount = subTotal - discount + taxAmount + shippingFee

  const handleOpenChange = (value: boolean) => {
    if (!value) handleReset()
    onOpenChange(value)
  }

  useEffect(() => {
    if (open) {
      refetchCustomers()
      refetchProviders()
      refetchSkus()
    }
  }, [open, refetchCustomers, refetchProviders, refetchSkus])

  const selectedSkuIds = new Set(orderProducts.map((p) => p.skuId))
  const customers = customerData?.data ?? []
  const providers = providerData?.data ?? []

  return (
    <FormDialog
      title="Create Order"
      description="Fill in the order details, products, and payment information"
      size="lg"
      open={open}
      onOpenChange={handleOpenChange}
      onSubmit={onSubmit}
      buttons={[
        { type: 'cancel', label: 'Cancel' },
        { type: 'submit', label: 'Create Order', loading: isPending },
      ]}
    >
      <div className="max-h-[70vh] overflow-y-auto pr-1">
        <FieldGroup>
          {/* General */}
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-gray-700">General</p>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={control}
              name="orderType"
              render={({ field }) => (
                <FormSelect
                  label="Order Type"
                  options={ORDER_TYPES}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />

            <FormInput
              className="h-8"
              label="Date"
              type="date"
              error={errors.date}
              {...register('date')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={control}
              name="customerId"
              render={({ field }) => (
                <FormCombobox<CustomerSelection>
                  label="Customer"
                  items={customers}
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  getItemValue={(c) => c.id}
                  getItemLabel={(c) => c.name}
                  placeholder="Search customer..."
                  searchPlaceholder="Search customer..."
                  emptyText="No customers found."
                  error={errors.customerId}
                  renderItem={(c) => (
                    <span className="flex flex-col">
                      <span className="font-medium">{c.name}</span>
                      {c.email && (
                        <span className="text-muted-foreground text-[11px]">
                          {c.email}
                        </span>
                      )}
                      {c.phone && (
                        <span className="text-muted-foreground text-[11px]">
                          {c.phone}
                        </span>
                      )}
                    </span>
                  )}
                />
              )}
            />

            <Controller
              control={control}
              name="shippingProviderId"
              render={({ field }) => (
                <FormCombobox<ShippingProviderSelection>
                  label="Shipping Provider"
                  optional
                  items={providers}
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  getItemValue={(p) => p.id}
                  getItemLabel={(p) => p.name}
                  placeholder="Search provider..."
                  searchPlaceholder="Search provider..."
                  emptyText="No providers found."
                />
              )}
            />
          </div>

          <FormTextarea
            label="Notes"
            optional
            placeholder="Add order notes..."
            {...register('notes')}
          />

          {/* Products */}
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-gray-700">Products</p>
            <Separator className="flex-1" />
          </div>

          <Select
            onValueChange={(id) => handleSelectProduct(id, skuData?.data ?? [])}
            value=""
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Add product..." />
            </SelectTrigger>
            <SelectContent>
              {skuData?.data?.map((sku) => (
                <SelectItem
                  key={sku.id}
                  value={sku.id}
                  disabled={selectedSkuIds.has(sku.id)}
                >
                  <span className="font-mono font-medium">{sku.code}</span>
                  <span className="ml-2 text-[11px] text-gray-400">
                    {sku.product.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {orderProducts.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-4 text-gray-400">
              <HugeiconsIcon
                icon={PackageIcon}
                size={28}
                strokeWidth={1.5}
                className="opacity-40"
              />
              <p className="text-xs">Add products above</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {orderProducts.map((op) => {
                const sku = skuData?.data?.find((s) => s.id === op.skuId)
                if (!sku) return null
                return (
                  <SaleProductRow
                    key={op.skuId}
                    product={sku}
                    quantity={op.quantity}
                    unitPrice={op.unitPrice}
                    onQuantityChange={handleQuantityChange}
                    onUnitPriceChange={handleUnitPriceChange}
                    onRemove={handleRemoveProduct}
                  />
                )
              })}
            </div>
          )}

          {/* Payment */}
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-gray-700">Payment</p>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={control}
              name="method"
              render={({ field }) => (
                <FormSelect
                  label="Method"
                  options={PAYMENT_METHODS}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select method..."
                  error={errors.method}
                />
              )}
            />

            <FormInput
              label="Currency"
              readOnly
              className="h-8 bg-gray-50 font-mono text-xs"
              {...register('currency')}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FormInput
              className="h-8"
              label="Tax"
              type="number"
              placeholder="0"
              error={errors.taxAmount}
              {...register('taxAmount', { valueAsNumber: true })}
            />
            <FormInput
              className="h-8"
              label="Discount"
              type="number"
              placeholder="0"
              error={errors.discount}
              {...register('discount', { valueAsNumber: true })}
            />
            <FormInput
              className="h-8"
              label="Shipping Fee"
              type="number"
              placeholder="0"
              error={errors.shippingFee}
              {...register('shippingFee', { valueAsNumber: true })}
            />
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Subtotal</span>
              <span className="font-mono font-medium text-gray-800">
                {formatIDR(subTotal)}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-gray-700">
              <span>Amount</span>
              <span className="font-mono">{formatIDR(amount)}</span>
            </div>
          </div>
        </FieldGroup>
      </div>
    </FormDialog>
  )
}
