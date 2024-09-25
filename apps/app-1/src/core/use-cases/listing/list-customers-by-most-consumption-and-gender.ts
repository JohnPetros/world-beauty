import type { Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'
import { ListCustomers } from './list-customers'

export class ListCustomersByMostConsumptionAndGenderUseCase extends List {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    this.output.title('Clientes do sexo masculino')
    this.listByGender('masculino')
    this.output.title('Clientes do sexo feminino')
    this.listByGender('feminino')
  }

  private listByGender(gender: 'masculino' | 'feminino') {
    const customers = this.customers.filter((customer) => customer.gender === gender)

    customers
      .sort((fisrtCustomer, secondCustomer) => {
        return (
          secondCustomer.consumedProductsOrServicesCount -
          fisrtCustomer.consumedProductsOrServicesCount
        )
      })
      .slice(0, 10)

    const useCase = new ListCustomers(customers, this.input, this.output)
    useCase.list()
  }
}
