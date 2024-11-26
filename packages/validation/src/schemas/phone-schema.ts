import { z } from 'zod'

export const phoneSchema = z.object({
  number: z.coerce
    .number({ message: 'Telefone deve ser um número inteiro' })
    .int({ message: 'Telefone deve ser um número inteiro' })
    .min(9, 'telefone deve conter 9 dígitos')
    .refine((value) => String(value).length === 9, 'telefone deve conter 9 dígitos')
    .transform((value) => String(value)),
  codeArea: z.coerce
    .number({ message: 'ddd deve ser um número inteiro' })
    .int({ message: 'ddd deve ser um número inteiro' })
    .refine((value) => String(value).length === 2, 'ddd deve conter 2 dígitos')
    .transform((value) => String(value)),
})
