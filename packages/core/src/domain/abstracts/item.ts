import type { ItemDto } from '../../dtos/item-dto'
import type { ItemCategory } from '../../types'
import { Entity } from './entity'

export type ItemProps = {
  name: string
  price: number
  description: string
  category: ItemCategory
  customersCount: number
}

export abstract class Item extends Entity<ItemProps> {
  constructor(dto: ItemDto, id?: string) {
    super(
      {
        name: dto.name,
        category: dto.category,
        description: dto.description,
        price: dto.price,
        customersCount: dto.customersCount ?? 0,
      },
      id,
    )
  }

  set customersCount(customersCount: number) {
    this.props.customersCount = customersCount
  }

  get customersCount() {
    return this.props.customersCount
  }

  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get description() {
    return this.props.description
  }

  get category() {
    return this.props.category
  }
}
