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

export const CreateCustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.email('Invalid email address').or(z.literal('')).optional(),
  shippingAddress: GenericAddressSchema.optional().refine(
    (val) => val !== undefined,
    { message: 'Address is required' },
  ),
})

export type CreateCustomerFormData = z.infer<typeof CreateCustomerSchema>
