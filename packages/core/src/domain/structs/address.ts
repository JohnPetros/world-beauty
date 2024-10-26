import type { AddressDto } from '../../dtos'

export class Address {
  readonly state: string
  readonly city: string
  readonly number: number
  readonly zipcode: string
  readonly street: string
  readonly complement?: string

  private constructor(dto: AddressDto) {
    this.state = dto.state
    this.city = dto.city
    this.number = dto.number
    this.zipcode = dto.zipcode
    this.street = dto.street
    this.complement = dto.complement
  }

  static create(dto: AddressDto): Address {
    return new Address(dto)
  }
}
