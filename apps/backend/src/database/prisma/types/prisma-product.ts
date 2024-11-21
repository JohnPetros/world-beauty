import type { OrderItem } from '@prisma/client'

export type PrismaProduct = OrderItem & { orders_count: number }
