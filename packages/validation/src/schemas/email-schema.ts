import z from 'zod'

export const emailSchema = z.string().email('E-mail inválido')
