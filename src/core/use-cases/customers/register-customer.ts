import { Cpf, Customer, Phone, Rg } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Register } from '../register'

export class RegisterCustomer extends Register {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async register(): Promise<void> {
    const name = await this.input.text('Nome do cliente:')
    const socialName = await this.input.text('Nome social do cliente:')
    const gender = await this.input.select('Gênero:', [['masculino'], ['feminino']])
    const cpfValue = await this.input.text('CPF:')
    const cpfIssueDate = await this.input.text('Data de emissão do CPF (dd/mm/yyyy):')

    const customer = new Customer({
      name,
      socialName,
      gender,
      cpf: new Cpf(cpfValue, cpfIssueDate),
    })

    const rgsCount = await this.input.number("Quantidade de RG's:")

    for (let count = 0; count < rgsCount; count++) {
      const value = await this.input.text(`Por favor, informe o RG ${count + 1}:`)
      const issueDate = await this.input.text('Data de emissão do RG (dd/mm/yyyy):')
      customer.rgs.push(new Rg(value, issueDate))
    }

    const phonesCount = await this.input.number('Quantidade de telefones:')

    for (let count = 0; count < phonesCount; count++) {
      const codeArea = await this.input.text('DDD:')
      const number = await this.input.text('Número:')
      customer.phones.push(new Phone(codeArea, number))
    }

    this.customers.push(customer)
    this.output.clear()
    this.output.success('Cliente cadastrado com sucesso')
  }
}
