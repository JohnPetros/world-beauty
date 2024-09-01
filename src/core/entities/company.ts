import type { Customer } from './customer'
import type { Product } from './product'
import type { Service } from './service'

export class Company {
  private _customers: Customer[] = []
  private _products: Product[] = []
  private _services: Service[] = []

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
