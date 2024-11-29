import { z } from 'zod'

export const numberSchema = z.coerce.number({ message: 'deve ser um número' })
