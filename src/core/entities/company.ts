import type { Customer } from './customer'
import type { Product } from './product'
import type { Service } from './service'

type CompanyProps = {
  customers: Customer[]
  products: Product[]
  services: Service[]
}

export class Company {
  private _customers: Customer[]
  private _products: Product[]
  private _services: Service[]

  constructor(props: CompanyProps) {
    this._customers = props.customers
    this._products = props.products
    this._services = props.services
  }

  getProductByIndex(index: number): Product {
    return this.products[index]
  }

  getServiceByIndex(index: number) {
    return this.services[index]
  }

  get customers(): Customer[] {
    return this._customers
  }

  set customers(customers: Customer[]) {
    this._customers = customers
  }

  get products(): Product[] {
    return this._products
  }

  get services(): Service[] {
    return this._services
  }
}
