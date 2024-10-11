import z from 'zod'

export const issueDateSchema = z.date({ message: 'data inválida' })
