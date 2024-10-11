import z from 'zod'

export const nameSchema = z.string().min(3, 'nome deve conter ao menos 3 caracteres')
