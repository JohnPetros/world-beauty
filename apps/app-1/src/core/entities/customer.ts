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

  public consumeProduct(_product: Product) {
    const product = Object.assign(
      Object.create(Object.getPrototypeOf(_product)),
      _product,
    )
    const productIndex = this._consumedProducts.findIndex((currentProduct) =>
      currentProduct.isEqualTo(product),
    )

    if (productIndex === -1) {
      product.resetOrdersCount()
      product.incrementOrdersCount()
      this._consumedProducts.push(product)
      return
    }

    product.incrementOrdersCount()
    this._consumedProducts[productIndex] = product
  }

  public consumeService(_service: Service) {
    const service = Object.assign(
      Object.create(Object.getPrototypeOf(_service)),
      _service,
    )
    const serviceIndex = this._consumedServices.findIndex((currentProduct) =>
      currentProduct.isEqualTo(service),
    )

    if (serviceIndex === -1) {
      service.resetOrdersCount()
      service.incrementOrdersCount(1)
      this._consumedServices.push(service)
      return
    }

    const cosumedService = this._consumedServices[serviceIndex]
    cosumedService.incrementOrdersCount(1)
    this._consumedServices[serviceIndex] = cosumedService
  }

  public hasRg(rgValue: string): boolean {
    return this.rgs.map((rg) => rg.value).includes(rgValue)
  }

  public hasPhone(phoneNumber: string): boolean {
    return this.phones.map((phone) => phone.number).includes(phoneNumber)
  }

  public get consumedProductsOrServicesCount(): number {
    return this.consumedProductsCount + this.consumedServicesCount
  }

  public get spending(): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(this.spendingInProducts + this.spendingInServices)
  }

  public get spendingAsNumber(): number {
    return this.spendingInProducts + this.spendingInServices
  }

  public get consumedProductsCount(): number {
    return this.consumedProducts.reduce(
      (count, product) => count + product.ordersCount,
      0,
    )
  }

  public get consumedServicesCount(): number {
    return this.consumedServices.reduce(
      (count, service) => count + service.ordersCount,
      0,
    )
  }

  public get spendingInProducts(): number {
    return this.consumedProducts.reduce(
      (spending, product) => spending + product.priceAsNumber * product.ordersCount,
      0,
    )
  }

  public get spendingInServices(): number {
    return this.consumedServices.reduce(
      (spending, service) => spending + service.priceAsNumber * service.ordersCount,
      0,
    )
  }

  public get cpf(): Cpf {
    return this._cpf
  }

  public set cpf(cpf: Cpf) {
    this._cpf = cpf
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
