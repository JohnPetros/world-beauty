import { Entity, type Item } from '../abstracts'
import { Cpf } from '../structs/cpf'
import { Phone } from '../structs/phone'
import { Rg } from '../structs/rg'
import type { CustomerDto } from '../../dtos'

export type CustomerProps = {
  name: string
  socialName: string
  cpf: Cpf
  gender: string
  rgs: Rg[]
  phones: Phone[]
  newRgs: Rg[]
  newPhones: Phone[]
  consumption: number
  spending: number
}

export class Customer extends Entity<CustomerProps> {
  static create(dto: CustomerDto): Customer {
    return new Customer(
      {
        name: dto.name,
        gender: dto.gender,
        socialName: dto.socialName,
        cpf: Cpf.create(dto.cpf),
        phones: dto.phones?.map(Phone.create),
        rgs: dto.rgs.map(Rg.create),
        consumption: dto.consumption ?? 0,
        spending: dto.spending ?? 0,
        newRgs: [],
        newPhones: [],
      },
      dto.id,
    )
  }

  orderItem(item: Item) {
    this.props.spending += item.price
    this.props.consumption += 1
  }

  update(dto: Partial<CustomerDto>): Customer {
    const updatedCustomer = Customer.create({
      ...this.dto,
      ...dto,
      rgs: this.dto.rgs,
      phones: this.dto.phones,
    })

    if (dto.rgs?.length) {
      const newRgs = dto.rgs.filter((rg) => {
        const currentRgs = this.rgs.map((currentRg) => currentRg.value)
        return !currentRgs.includes(rg.value)
      })
      updatedCustomer.newRgs = newRgs.map(Rg.create)
    }
    if (dto.phones?.length) {
      const newPhones = dto.phones.filter((phone) => {
        const currentPhones = this.phones.map((currentPhone) => currentPhone.number)
        return !currentPhones.includes(phone.number)
      })
      console.log('newPhones', newPhones)
      updatedCustomer.newPhones = newPhones.map(Phone.create)
    }

    return updatedCustomer
  }

  set spending(spending: number) {
    this.props.spending = spending
  }

  set consumption(consumption: number) {
    this.props.consumption = consumption
  }

  set newPhones(phones: Phone[]) {
    this.props.newPhones = phones
  }

  set newRgs(Rgs: Rg[]) {
    this.props.newRgs = Rgs
  }

  get newRgs() {
    return this.props.newRgs
  }

  get newPhones() {
    return this.props.newPhones
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

  get socialName(): string {
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
      socialName: this.socialName,
      gender: this.gender,
      cpf: this.cpf.dto,
      rgs: this.rgs.map((rg) => rg.dto),
      phones: this.phones.map((phone) => phone.dto),
      consumption: this.consumption,
      spending: this.spending,
    }
  }
}
