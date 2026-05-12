import z from 'zod'

export const CreateSkuSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  productId: z.string().min(1, 'Product is required'),
  uom: z.string().min(1, 'Unit of measurement is required'),
  unitCount: z.number().min(1, 'Unit count must be at least 1'),
  salePrice: z.number().min(0, 'Sale price must be 0 or greater'),
  resellerPrice: z.number().min(0, 'Reseller price must be 0 or greater'),
  specialPrice: z.number().min(0, 'Special price must be 0 or greater'),
  mainSku: z.boolean(),
})

export type CreateSkuFormData = z.infer<typeof CreateSkuSchema>

export const UpdateSkuSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  uom: z.string().min(1, 'Unit of measurement is required'),
  salePrice: z.number().min(0, 'Sale price must be 0 or greater'),
  resellerPrice: z.number().min(0, 'Reseller price must be 0 or greater'),
  specialPrice: z.number().min(0, 'Special price must be 0 or greater'),
})

export type UpdateSkuFormData = z.infer<typeof UpdateSkuSchema>
