import { Entity } from '../abstracts'
import type { ServiceDto } from '../../dtos'

export type ServiceProps = {
  id?: string
  name: string
  price: number
  description: string
}

export class Service extends Entity<ServiceProps> {
  static create(dto: ServiceDto) {
    return new Service(
      { name: dto.name, description: dto.description, price: dto.price },
      dto.id,
    )
  }

  update(dto: ServiceDto): Service {
    return Service.create({ ...this.dto, ...dto })
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

  get description() {
    return this.props.description
  }

  get name() {
    return this.props.name
  }

  get dto(): ServiceDto {
    return {
      id: this.id,
      description: this.description,
      name: this.name,
      price: this.props.price,
    }
  }
}
