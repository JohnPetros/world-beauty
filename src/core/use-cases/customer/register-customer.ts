import { Cpf, Customer } from '../../entities'
import type { Prompt } from '../../interfaces'
import { Register } from '../register'

export class RegisterCustomer extends Register {
  private customers: Customer[]
  private prompt: Prompt

  constructor(customers: Customer[], prompt: Prompt) {
    super()
    this.customers = customers
    this.prompt = prompt
  }

  public async register(): Promise<void> {
    const name = await this.prompt.input('Nome do cliente: ')
    const socialName = await this.prompt.input('Nome social do cliente: ')
    const gender = await this.prompt.select('Gênero:', [['masculino'], ['feminino']])
    const cpfValue = await this.prompt.input('CPF: ')
    const cpfIssueDate = await this.prompt.input('date de emissão do CPF (dd/mm/yyyy): ')

    const customer = new Customer({
      name,
      socialName,
      gender,
      cpf: new Cpf(cpfValue, cpfIssueDate),
    })

    this.customers.push(customer)
  }
}
