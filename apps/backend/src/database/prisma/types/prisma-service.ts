import type { OrderItem } from '@prisma/client'

export type PrismaService = OrderItem & { orders_count: number }
