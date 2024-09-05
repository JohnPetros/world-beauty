import { Cpf, Rg, type Customer } from '@/core/entities'
import type { Input, Output } from '../../interfaces'
import { Update } from '../update'
import { ListCustomers } from '../listing'

export class UpdateCustomer extends Update {
  private isRunning = true
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async update(): Promise<void> {
    this.output.clear()
    const customersList = new ListCustomers(this.customers, this.input, this.output)
    customersList.list()

    while (this.customers.length && this.isRunning) {
      const id = await this.input.text('ID do cliente:')

      const customer = this.customers.find((customer) => customer.id === id)

      if (!customer) {
        this.output.error('Cliente não encontrado')
        continue
      }

      await this.updateCustomer(customer)
      this.isRunning = false
    }
  }

  public async updateCustomer(customer: Customer): Promise<void> {
    const option = await this.input.select('Escolha uma opção para atualizar:', [
      ['Nome', 'name'],
      ['CPF', 'cpf'],
      ['Nome social', 'socialName'],
      ['Gênero', 'gender'],
      ["RG's", 'rgs'],
      ['Telefones', 'rgs'],
    ])

    switch (option) {
      case 'name':
        customer.name = await this.input.text('Insira o novo nome do Cliente:')
        break
      case 'socialName':
        customer.socialName = await this.input.text('Nome social do cliente:')
        break
      case 'gender':
        customer.gender = await this.input.select('Gênero:', [
          ['masculino'],
          ['feminino'],
        ])
        break
      case 'rgs':
        await this.updateRg(customer)
        break
      case 'phones':
        await this.updatePhone(customer)
        break
      case 'cpf':
        await this.updateCpf(customer)
        break
      case 'back':
        return
      default:
        this.output.error('Opção inválida')
    }

    const customerIndex = this.customers.findIndex((currentCustomer) =>
      currentCustomer.isEqualTo(customer),
    )
    this.customers.splice(customerIndex, 1, customer)

    this.output.clear()
    this.output.success('Cliente atualizado com sucesso')
  }

  private async updatePhone(customer: Customer) {
    if (!customer.phones.length) {
      this.output.error('Nenhum telefone encontrado')
      return
    }

    while (true) {
      const phoneIndex = await this.input.select('Escolha um Telefone para atualizar:', [
        ...customer.phones.map((phone, index) => [
          `1)  ${phone.number}`,
          String(index + 1),
        ]),
      ])

      const phone = customer.phones[Number(phoneIndex) - 1]

      if (!phone) {
        this.output.error('Telefone não encontrado')
        continue
      }

      let isRunning = true
      while (isRunning) {
        const option = await this.input.select(
          'Escolha o que você quer atualizar no telefone:',
          [
            [`DDD do telefone. Valor atual ${phone.codeArea}`, 'codeArea'],
            [`Número do telefone. Valor atual ${phone.number}`, 'number'],
          ],
        )

        switch (option) {
          case 'number':
            phone.number = await this.input.text('Novo número do telefone:')
            isRunning = false
            break
          case 'codeArea':
            phone.codeArea = await this.input.text('date de emissão do CPF (dd/mm/yyyy):')
            isRunning = false
            break
          default:
            this.output.unknownCommand()
        }
      }
      return
    }
  }

  private async updateRg(customer: Customer) {
    if (!customer.rgs.length) {
      this.output.error('Nenhum RG encontrado')
      return
    }

    while (true) {
      const rgIndex = await this.input.select('Escolha um RG para atualizar:', [
        ...customer.rgs.map((rg, index) => [`1) ${rg.value}`, String(index + 1)]),
      ])

      const rg = customer.rgs[Number(rgIndex) - 1]

      if (!rg) {
        this.output.error('RG não encontrado')
        continue
      }

      let isRunning = true
      while (isRunning) {
        const option = await this.input.select(
          'Escolha o que você quer atualizar no rg:',
          [
            [`valor do RG. Valor atual ${rg.value}`, 'value'],
            [`valor da data de emissão. Valor atual ${rg.issueDate}`, 'issueDate'],
          ],
        )

        switch (option) {
          case 'value':
            rg.value = await this.input.text('Novo valor do CPF:')
            isRunning = false
            break
          case 'issueDate':
            rg.issueDate = await this.input.text('date de emissão do CPF (dd/mm/yyyy):')
            isRunning = false
            break
          default:
            this.output.unknownCommand()
        }
      }
      return
    }
  }

  private async updateCpf(customer: Customer) {
    while (true) {
      const option = await this.input.select('Escolha uma opção do CPF para atualizar:', [
        [`Valor do CPF. Valor atual: ${customer.cpf.value}`, 'value'],
        [
          `date de emissão. Data de emissão atual: ${customer.cpf.issueDate}`,
          'issueDate',
        ],
      ])

      switch (option) {
        case 'value':
          customer.cpf.value = await this.input.text('Novo valor do CPF:')
          return
        case 'issueDate':
          customer.cpf.issueDate = await this.input.text(
            'date de emissão do CPF (dd/mm/yyyy):',
          )
          return
        default:
          this.output.unknownCommand()
      }
    }
  }
}
