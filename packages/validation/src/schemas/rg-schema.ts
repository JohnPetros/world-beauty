import z from 'zod'

import { issueDateSchema } from './issue-date-schema'

export const rgSchema = z.object({
  value: z.string().min(10, 'rg deve conter 10 números'),
  issueDate: issueDateSchema,
})
