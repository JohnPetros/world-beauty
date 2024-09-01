import type { Customer } from './customer'
import type { Product } from './product'
import type { Service } from './service'

type CompanyProps = {
  customers: Customer[]
  products: Product[]
  services: Service[]
}

export class Company {
  private _customers: Customer[] = []
  private _products: Product[] = []
  private _services: Service[] = []

  constructor(props: CompanyProps) {
    this._customers = props.customers
    this._products = props.products
    this._services = props.services
  }

  get customers(): Customer[] {
    return this._customers
  }

  get products(): Product[] {
    return this._products
  }

  get services(): Service[] {
    return this._services
  }
}
