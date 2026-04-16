import z from 'zod'

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  productionPrice: z.number().min(1, 'Production price must be at least 1'),
  productRestockDeliveryId: z
    .string()
    .min(1, 'Restock delivery format is required'),
})

export type CreateProductFormData = z.infer<typeof CreateProductSchema>

export const UpdateProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export type UpdateProductFormData = z.infer<typeof UpdateProductSchema>
