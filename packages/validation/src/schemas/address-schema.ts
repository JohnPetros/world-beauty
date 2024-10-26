import { z } from 'zod'

import { nameSchema } from './name-schema'
import { numberSchema } from './number-schema'

export const addressSchema = z.object({
  state: nameSchema,
  city: nameSchema,
  number: numberSchema.transform((number) => String(number)),
  street: nameSchema,
  zipcode: nameSchema,
  neighborhood: nameSchema,
  complement: z.string().optional(),
})
