import type { Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'

export class ListCustomers extends List {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    if (!this.customers.length) {
      this.output.error('Nenhum cliente encontrado')
      return
    }

    this.output.table(
      this.customers.map((customer) => ({
        Nome: customer.name,
        CPF: customer.cpf.value,
        Gênero: customer.gender,
        'Nome social': customer.socialName,
        "RG's": customer.rgs.map((rg) => rg.value).join(', '),
        Telefones: customer.phones.map((phone) => phone.number).join(', '),
      })),
    )
  }
}
