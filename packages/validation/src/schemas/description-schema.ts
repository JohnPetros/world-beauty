import z from 'zod'

export const descriptionSchema = z
  .string()
  .min(5, 'Descrição deve conter ao menos 5 caracteres')
