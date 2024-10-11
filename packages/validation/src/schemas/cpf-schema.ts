import z from 'zod'

import { issueDateSchema } from './issue-date-schema'

export const cpfSchema = z.object({
  value: z
    .string()
    .min(11, 'cpf deve conter 11 caracteres')
    .max(11, 'cpf deve conter 11 caracteres'),
  issueDate: issueDateSchema,
})
