import z from 'zod'

export const priceSchema = z.coerce.number().min(1, 'Preço não deve ser R$0,00')
