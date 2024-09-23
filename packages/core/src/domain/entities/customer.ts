import { Entity } from '../abstracts'
import { Cpf } from '../structs/cpf'
import { Phone } from '../structs/phone'
import { Product } from './product'
import { Rg } from '../structs/rg'
import { Service } from './service'
import type { CustomerDto } from '../../dtos'

export type CustomerProps = {
  name: string
  socialName: string
  cpf: Cpf
  gender: string
  rgs?: Rg[]
  phones?: Phone[]
  consumedProducts?: Product[]
  consumedServices?: Service[]
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
        consumedProducts: dto.consumedProducts
          ? dto.consumedProducts.map(Product.create)
          : [],
        consumedServices: dto.consumedServices
          ? dto.consumedServices.map(Service.create)
          : [],
        rgs: dto.rgs.map(Rg.create),
      },
      dto.id,
    )
  }

  update(dto: CustomerDto): Customer {
    return Customer.create({ ...this.dto, ...dto })
  }

  get consumedProductsOrServicesCount(): number {
    return this.consumedProductsCount + this.consumedServicesCount
  }

  get spending(): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(this.spendingInProducts + this.spendingInServices)
  }

  get spendingAsNumber(): number {
    return this.spendingInProducts + this.spendingInServices
  }

  get consumedProductsCount(): number {
    return this.consumedProducts.reduce((count) => count + 1, 0)
  }

  get consumedServicesCount(): number {
    return this.consumedServices.reduce((count) => count + 1, 0)
  }

  get spendingInProducts(): number {
    return this.consumedProducts.reduce(
      (spending, product) => spending + product.priceAsNumber,
      0,
    )
  }

  get spendingInServices(): number {
    return this.consumedServices.reduce(
      (spending, service) => spending + service.priceAsNumber,
      0,
    )
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

  get consumedProducts(): Product[] {
    return this.props.consumedProducts ?? []
  }

  get consumedServices(): Service[] {
    return this.props.consumedServices ?? []
  }

  get dto(): CustomerDto {
    return {
      id: this.id,
      name: this.name,
      socialName: this.socialName,
      gender: this.gender,
      cpf: this.cpf.dto,
      rgs: this.rgs.map((rg) => rg.dto),
      phones: this.phones,
      consumedProducts: this.consumedProducts.map((product) => product.dto),
      consumedServices: this.consumedProducts.map((product) => product.dto),
    }
  }
}
