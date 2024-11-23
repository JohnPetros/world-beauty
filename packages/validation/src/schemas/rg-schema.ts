import z from 'zod'

import { issueDateSchema } from './issue-date-schema'

export const rgSchema = z.object({
  value: z.string().min(9, 'rg deve conter 9 números').max(9, 'rg deve conter 9 números'),
  issueDate: issueDateSchema,
})
