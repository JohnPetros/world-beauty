import type { CustomerWithAddressDto } from '../../dtos'
import { Entity } from '../abstracts'
import { Address, Phone } from '../structs'

type CustomerWithAddressProps = {
  name: string
  lastname: string
  email: string
  address: Address
  phones: Phone[]
}

export class CustomerWithAddress extends Entity<CustomerWithAddressProps> {
  static create(dto: CustomerWithAddressDto) {
    return new CustomerWithAddress(
      {
        name: dto.name,
        lastname: dto.lastname,
        email: dto.email,
        address: Address.create(dto.address),
        phones: dto.phones.map(Phone.create),
      },
      dto.id,
    )
  }

  get name() {
    return this.props.name
  }

  get lastname() {
    return this.props.lastname
  }

  get email() {
    return this.props.email
  }

  get address() {
    return this.props.address
  }

  get phones() {
    return this.props.phones
  }

  get phonesList() {
    return this.phones.map((phone) => phone.value).join('; ')
  }

  get formattedAddress() {
    return `${this.address.street}, ${this.address.number}, ${this.address.city} - ${this.address.state}`
  }

  get dto() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      address: this.address,
      phones: this.phones,
    }
  }
}
