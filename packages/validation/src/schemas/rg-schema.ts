import z from 'zod'

import { issueDateSchema } from './issue-date-schema'

export const rgSchema = z.object({
  value: z.coerce
    .number({ message: 'rg deve ser um número inteiro' })
    .int({ message: 'rg deve ser um número inteiro' })
    .refine((value) => String(value).length === 9, 'rg deve ser um número inteiro')
    .transform((value) => String(value)),
  issueDate: issueDateSchema,
})