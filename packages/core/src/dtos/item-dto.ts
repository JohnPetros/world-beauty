import type { ItemCategory } from '../types'

export type ItemDto = {
  id?: string
  name: string
  description: string
  price: number
  category: ItemCategory
  ordersCount?: number
}