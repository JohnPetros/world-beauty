import type { ProductDto } from '../../dtos'
import { Entity } from '../abstracts'

export type ProductProps = {
  name: string
  price: number
  description: string
}

export class Product extends Entity<ProductProps> {
  static create(dto: ProductDto): Product {
    return new Product(
      { name: dto.name, description: dto.description, price: dto.price },
      dto.id,
    )
  }

  get price(): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(this.props.price)
  }

  get priceAsNumber() {
    return Number(this.props.price)
  }

  set price(price: number) {
    this.props.price = price
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get dto(): ProductDto {
    return {
      id: this.id,
      description: this.description,
      name: this.name,
      price: this.props.price,
    }
  }
}
