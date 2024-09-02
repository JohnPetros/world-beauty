import type { Cpf } from './cpf'
import type { Phone } from './phone'
import type { Product } from './product'
import type { Rg } from './rg'
import type { Service } from './service'
import { EntityWithId } from './entity-with-id'

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

export class Customer extends EntityWithId {
  public name: string
  public socialName: string
  public gender: string
  private _cpf: Cpf
  private _registrationDate: Date
  private _rgs: Rg[]
  private _phones: Phone[]
  private _consumedProducts: Product[]
  private _consumedServices: Service[]

  constructor(props: CustomerProps) {
    super()
    this.name = props.name
    this.socialName = props.socialName
    this.gender = props.gender
    this._cpf = props.cpf
    this._rgs = props.rgs ?? []
    this._phones = props.phones ?? []
    this._consumedProducts = props.consumedProducts ?? []
    this._consumedServices = props.consumedServices ?? []
    this._registrationDate = new Date()
  }

  public get consumedProductsOrServicesCount(): number {
    return this.consumedProductsCount + this.consumedServicesCount
  }

  public get consumedProductsCount(): number {
    return this.consumedProducts.reduce((count) => count + 1, 0)
  }

  public get consumedServicesCount(): number {
    return this.consumedServices.reduce((count) => count + 1, 0)
  }

  public get cpf(): Cpf {
    return this._cpf
  }

  public get rgs(): Rg[] {
    return this._rgs
  }

  public get registrationDate(): Date {
    return this._registrationDate
  }

  public get phones(): Phone[] {
    return this._phones
  }

  public get consumedProducts(): Product[] {
    return this._consumedProducts
  }

  public get consumedServices(): Service[] {
    return this._consumedServices
  }
}
