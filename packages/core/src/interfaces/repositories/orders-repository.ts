import type { Order } from '../../domain/structs'

export interface IOrdersRepository {
  findAll(): Promise<Order[]>
  findAllByCustomerId(customerId: string): Promise<Order[]>
  add(order: Order): Promise<void>
  addMany(orders: Order[]): Promise<void>
  removeAll(): Promise<void>
}
