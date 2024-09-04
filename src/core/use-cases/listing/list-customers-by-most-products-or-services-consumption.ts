import type { Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'
import { ListCustomers } from './list-customers'

export class ListCustomersByMostProductsOrServicesConsumption extends List {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    const sortedProducts = [...this.customers]
      .sort((fisrtCustomer, secondCustomer) => {
        return (
          secondCustomer.consumedProductsOrServicesCount -
          fisrtCustomer.consumedProductsOrServicesCount
        )
      })
      .slice(0, 10)

    console.log({ sortedProducts })

    const useCase = new ListCustomers(this.customers, this.input, this.output)
    useCase.list()
  }
}
