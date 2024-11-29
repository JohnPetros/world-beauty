import { Entity, type Item } from '../abstracts'
import { Cpf } from '../structs/cpf'
import { Phone } from '../structs/phone'
import { Rg } from '../structs/rg'
import type { CustomerDto } from '../../dtos'

export type CustomerProps = {
  name: string
  socialName: string | null
  cpf: Cpf
  gender: string
  rgs: Rg[]
  phones: Phone[]
  consumption: number
  spending: number
}

export class Customer extends Entity<CustomerProps> {
  static create(dto: CustomerDto): Customer {
    return new Customer(
      {
        name: dto.name,
        gender: dto.gender,
        socialName: dto.socialName ?? null,
        cpf: Cpf.create(dto.cpf),
        phones: dto.phones?.map(Phone.create),
        rgs: dto.rgs.map(Rg.create),
        consumption: dto.consumption ?? 0,
        spending: dto.spending ?? 0,
      },
      dto.id,
    )
  }

  orderItem(item: Item) {
    this.props.spending += item.price
    this.props.consumption += 1
  }

  update(dto: CustomerDto): Customer {
    return Customer.create({ ...this.dto, ...dto })
  }

  set spending(spending: number) {
    this.props.spending = spending
  }

  set consumption(consumption: number) {
    this.props.consumption = consumption
  }

  get consumption(): number {
    return this.props.consumption
  }

  get spending(): number {
    return this.props.spending
  }

  get isMale(): boolean {
    return this.gender === 'male'
  }

  get isFemale(): boolean {
    return this.gender === 'female'
  }

  get name(): string {
    return this.props.name
  }

  get socialName(): string | null {
    return this.props.socialName
  }

  get gender(): string {
    return this.props.gender
  }

  get cpf(): Cpf {
    return this.props.cpf
  }

  get rgs(): Rg[] {
    return this.props.rgs ?? []
  }

  get phones(): Phone[] {
    return this.props.phones ?? []
  }

  get phonesList(): string {
    return this.phones.map((phone) => phone.value).join('; ')
  }

  get rgsList(): string {
    return this.rgs.map((rg) => rg.value).join('; ')
  }

  get dto(): CustomerDto {
    return {
      id: this.id,
      name: this.name,
      socialName: this.socialName ?? undefined,
      gender: this.gender,
      cpf: this.cpf.dto,
      rgs: this.rgs.map((rg) => rg.dto),
      phones: this.phones,
      consumption: this.consumption,
      spending: this.spending,
    }
  }
}
