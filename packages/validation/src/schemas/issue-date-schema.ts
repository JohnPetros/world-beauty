import z from 'zod'

export const issueDateSchema = z.coerce.date({ message: 'data inválida' })
