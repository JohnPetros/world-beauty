import { z } from 'zod'

import { nameSchema } from './name-schema'
import { numberSchema } from './number-schema'

export const addressSchema = z.object({
  state: nameSchema,
  city: nameSchema,
  number: numberSchema,
  street: nameSchema,
  zipcode: nameSchema,
  complement: z.string().optional(),
})
