import type { OrderDto } from '@world-beauty/core/dtos'
import { Order } from '@world-beauty/core/structs'
import type { IOrdersRepository } from '@world-beauty/core/interfaces'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'

export const LocalStorageOrdersRepository = (): IOrdersRepository => {
  const localStorage = LocalStorage()

  return {
    async findAll() {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders)
      if (!ordersDto) return []

      return ordersDto.map(Order.create)
    },

    async findAllByCustomerId(customerId: string) {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders)
      if (!ordersDto) return []

      return ordersDto
        .map(Order.create)
        .filter((order) => order.customerId === customerId)
    },

    async add(order: Order) {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders) ?? []

      ordersDto.push(order.dto)
      localStorage.set(KEYS.orders, ordersDto)
    },

    async removeAll() {
      localStorage.remove(KEYS.orders)
    },
  }
}
