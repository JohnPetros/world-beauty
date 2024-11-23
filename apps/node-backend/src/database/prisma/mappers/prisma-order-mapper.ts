import { Order } from '@world-beauty/core/structs'

import type { PrismaOrder } from '../types'
import type { Decimal } from '@prisma/client/runtime/library'

export class PrismaOrderssMapper {
  toDomain(prismaOrder: PrismaOrder): Order {
    return Order.create({
      customerId: prismaOrder.customer_id,
      itemId: prismaOrder.item_id,
      amount: Number(prismaOrder.amount),
    })
  }

  toPrisma(order: Order): PrismaOrder {
    return {
      id: '',
      item_id: order.itemId,
      customer_id: order.customerId,
      amount: order.amount as unknown as Decimal,
      registered_at: new Date(),
    }
  }
}
