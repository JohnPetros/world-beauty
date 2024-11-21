import type { IOrdersRepository } from '@world-beauty/core/interfaces'
import type { Order } from '@world-beauty/core/structs'
import { prisma } from '../client'
import { PrismaOrderssMapper } from '../mappers'

export class PrismaOrdersRepository implements IOrdersRepository {
  private readonly mapper = new PrismaOrderssMapper()

  async findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.')
  }

  async findAllByCustomerId(customerId: string): Promise<Order[]> {
    const prismaOrders = await prisma.order.findMany({
      where: { customer_id: customerId },
    })
    return prismaOrders.map(this.mapper.toDomain)
  }

  async add(order: Order): Promise<void> {
    await prisma.order.create({
      data: {
        customer_id: order.customerId,
        item_id: order.itemId,
        amount: order.amount,
      },
    })
  }

  async addMany(orders: Order[]): Promise<void> {
    await prisma.order.createMany({
      data: orders.map((order) => ({
        customer_id: order.customerId,
        item_id: order.itemId,
        amount: order.amount,
      })),
    })
  }

  async removeAll(): Promise<void> {
    await prisma.order.deleteMany({})
  }
}
