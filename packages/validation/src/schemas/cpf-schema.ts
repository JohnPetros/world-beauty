import z from 'zod'

import { issueDateSchema } from './issue-date-schema'

export const cpfSchema = z.object({
  value: z.coerce
    .number({ message: 'cpf deve ser um número inteiro' })
    .int({ message: 'cpf deve ser um número inteiro' })
    .refine((value) => String(value).length === 11, 'cpf deve conter 11 dígitos')
    .transform((value) => String(value)),
  issueDate: issueDateSchema,
})
