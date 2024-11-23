import type { OrderItem } from '@prisma/client'

export type PrismaProduct = OrderItem & {
  _count: {
    orders: number
  }
}
