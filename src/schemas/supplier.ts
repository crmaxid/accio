import z from 'zod'

const GenericAddressSchema = z.object({
  fullAddress: z.string(),
  line1: z.string(),
  line2: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  subDistrict: z.string().optional(),
  village: z.string().nullable().optional(),
  city: z.string(),
  province: z.string().optional(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export const CreateSupplierSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
  email: z.email('Invalid email address').or(z.literal('')).optional(),
  address: GenericAddressSchema.optional().refine(
    (val) => val !== undefined,
    { message: 'Address is required' },
  ),
})

export type CreateSupplierFormData = z.infer<typeof CreateSupplierSchema>

export const SUPPLIER_PRODUCT_UNITS = ['pcs', 'liter', 'kg', 'gram', 'meter', 'box'] as const

export const CreateSupplierProductSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.number().positive('Price must be greater than 0'),
  unit: z.enum(SUPPLIER_PRODUCT_UNITS, { message: 'Unit is required' }),
})

export type CreateSupplierProductFormData = z.infer<typeof CreateSupplierProductSchema>
