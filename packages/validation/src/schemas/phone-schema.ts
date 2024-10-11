import { z } from 'zod'

export const phoneSchema = z.object({
  number: z.string().min(9, 'telefone deve conter 9 dígitos'),
  codeArea: z
    .string()
    .min(2, 'DDD deve conter 12 dígitos')
    .max(2, 'DDD deve conter 12 dígitos'),
})
