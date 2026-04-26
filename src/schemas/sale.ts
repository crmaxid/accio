import z from 'zod'

export const CreateSaleSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  shippingProviderId: z.string().optional(),
  orderType: z.string(),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
  method: z.string().min(1, 'Payment method is required'),
  currency: z.string(),
  taxAmount: z.number().min(0),
  shippingFee: z.number().min(0),
  discount: z.number().min(0),
})

export type CreateSaleFormData = z.infer<typeof CreateSaleSchema>
