import type { AddressDto } from '../../dtos'

export class Address {
  readonly state: string
  readonly city: string
  readonly number: string
  readonly zipcode: string
  readonly neighborhood: string
  readonly street: string
  readonly complement?: string

  private constructor(dto: AddressDto) {
    this.state = dto.state
    this.city = dto.city
    this.number = dto.number
    this.zipcode = dto.zipcode
    this.street = dto.street
    this.neighborhood = dto.neighborhood
    this.complement = dto.complement
  }

  static create(dto: AddressDto): Address {
    return new Address(dto)
  }
}
