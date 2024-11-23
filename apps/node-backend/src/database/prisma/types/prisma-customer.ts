import type { Customer, Cpf, Rg, Phone } from '@prisma/client'

export type PrismaCustomer = Customer & {
  cpf: Cpf
  rgs: Rg[]
  phones: Phone[]
  consumption: number
  spending: number
}
