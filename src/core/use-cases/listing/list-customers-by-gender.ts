import type { Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'
import { ListCustomers } from './list-customers'

type Gender = 'masculino' | 'feminino'

export class ListCustomersByGender extends List {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    this.output.title('Clientes do sexo masculino')

    const listMaleCustomers = new ListCustomers(
      this.maleCustomers,
      this.input,
      this.output,
    )
    listMaleCustomers.list()

    this.output.title('Clientes do sexo feminino')

    const listFemaleCustomers = new ListCustomers(
      this.femaleCustomers,
      this.input,
      this.output,
    )
    listFemaleCustomers.list()
  }

  private get maleCustomers() {
    return this.customers.filter((customer) => customer.gender === 'masculino')
  }

  private get femaleCustomers() {
    return this.customers.filter((customer) => customer.gender === 'feminino')
  }
}
