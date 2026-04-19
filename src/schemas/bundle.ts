import z from 'zod'

const bundleItemSchema = z.object({
  skuId: z.string().min(1, 'SKU is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
})

export const CreateBundleSchema = z
  .object({
    code: z.string().min(1, 'Code is required'),
    skuGroupItems: z.array(bundleItemSchema),
  })
  .refine((data) => data.skuGroupItems.some((i) => i.skuId && i.quantity > 0), {
    message: 'Add at least one SKU with quantity greater than 0',
    path: ['skuGroupItems'],
  })

export type CreateBundleFormData = z.infer<typeof CreateBundleSchema>
