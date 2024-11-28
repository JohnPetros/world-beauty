import { ISSUE_DATE_REGEX } from '@/core/constants'
import { Cpf, Customer, Phone, Rg } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Register } from '../register'
import { Validator } from '@/core/utils'

export class RegisterCustomer extends Register {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async register(): Promise<void> {
    const validator = new Validator(this.output)
    let name = ''
    let socialName = ''
    let gender = ''
    let cpfValue = ''
    let cpfIssueDate = ''

    while (true) {
      name = await this.input.text('Nome do cliente:')
      if (!validator.validateText(name)) {
        this.output.error('Nome é obrigatório')
        continue
      }
      break
    }

    socialName = await this.input.text('Nome social do cliente: (opcional)')

    while (true) {
      cpfValue = await this.input.text('CPF: (Digite apenas números)')
      if (!validator.validateCpfValue(cpfValue))  continue
      break
    }

    while (true) {
      cpfIssueDate = await this.input.text('Data de emissão do CPF (dd/mm/yyyy):')
      if (!validator.validateIssueDate(cpfIssueDate))  continue
      break
    }

    gender = await this.input.select('Gênero:', [['masculino'], ['feminino']])

    const customer = new Customer({
      name,
      socialName,
      gender,
      cpf: new Cpf(cpfValue, cpfIssueDate),
    })

    const rgsCount = await this.input.number("Quantidade de RG's:")

    for (let count = 0; count < rgsCount; count++) {
      let value = ''
      let issueDate = ''

      while (true) {
        value = await this.input.text(`Por favor, informe o RG ${count + 1}:`)
        if (!validator.validateRgValue(value)) continue
        break
      }

      while (true) {
        issueDate = await this.input.text('Data de emissão do CPF (dd/mm/yyyy):')
        if (!validator.validateIssueDate(issueDate)) continue
        break
      }
      customer.rgs.push(new Rg(value, issueDate))
    }

    const phonesCount = await this.input.number('Quantidade de telefones:')

    for (let count = 0; count < phonesCount; count++) {
      let codeArea = ''
      let number = ''

      while (true) {
        codeArea = await this.input.text('DDD:')
        if (!validator.validatePhoneCodeArea(codeArea)) continue
        break
      }

      while (true) {
        number = await this.input.text('Número:')
        if (!validator.validatePhoneNumber(number)) continue
        break
      }

      customer.phones.push(new Phone(codeArea, number))
    }

    this.customers.push(customer)
    this.output.clear()
    this.output.success('Cliente cadastrado com sucesso')
  }
}
