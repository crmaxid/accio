import z from 'zod'

const PurchaseOrderProductSchema = z.object({
  productId: z.string().min(1),
  productName: z.string(),
  quantity: z.number().int().positive('Quantity must be greater than 0'),
  price: z.number().positive('Price must be greater than 0'),
})

export const CreatePurchaseOrderSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  products: z
    .array(PurchaseOrderProductSchema)
    .min(1, 'At least one product is required'),
  notes: z.string().optional(),
})

export type CreatePurchaseOrderFormData = z.infer<
  typeof CreatePurchaseOrderSchema
>
export type PurchaseOrderProductFormItem = z.infer<
  typeof PurchaseOrderProductSchema
>
