import z from 'zod'

export const CreateDeliverySchema = z.object({
  deliveryDate: z.string().min(1, 'Delivery date is required'),
  stockReplenishmentRequestId: z.string().min(1, 'Restock request is required'),
  notes: z.string().optional(),
  enableNotification: z.boolean(),
})

export type CreateDeliveryFormData = z.infer<typeof CreateDeliverySchema>
