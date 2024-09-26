import type { OrderDto } from '../../dtos/order-dto'

type OrderProps = {
  customerId: string
  itemId: string
  amount: number
}

export class Order {
  readonly customerId: string
  readonly itemId: string
  readonly amount: number

  private constructor(dto: OrderProps) {
    this.customerId = dto.customerId
    this.itemId = dto.itemId
    this.amount = dto.amount
  }

  static create(dto: OrderDto) {
    return new Order({
      amount: dto.amount,
      customerId: dto.customerId,
      itemId: dto.itemId,
    })
  }

  get dto() {
    return {
      customerId: this.customerId,
      itemId: this.itemId,
      amount: this.amount,
    }
  }
}
