import type { OrderItem } from '@prisma/client'

export type PrismaService = OrderItem & {
  _count: {
    orders: number
  }
}
