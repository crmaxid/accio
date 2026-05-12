import z from 'zod'

export const CreateRestockSchema = z.object({
  notes: z.string().optional(),
})

export type CreateRestockFormData = z.infer<typeof CreateRestockSchema>
