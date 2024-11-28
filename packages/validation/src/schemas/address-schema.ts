import { z } from 'zod'

import { numberSchema } from './number-schema'

export const addressSchema = z.object({
  state: z.string({message: 'estado é obrigatório'}),
  city: z.string({message: 'cidade é obrigatório'}),
  number: numberSchema.transform((number) => String(number)),
  street: z.string({message: 'rua é obrigatório'}),
  zipcode: z.string({message: 'cep é obrigatório'}),
  neighborhood: z.string({message: 'bairro é obrigatório'}),
  complement: z.string().optional(),
})
