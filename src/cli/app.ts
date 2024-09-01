import { RegisterCustomer } from '@/core/use-cases/customer/register-customer'
import { ListCustomers, ListCustomersByGender } from '@/core/use-cases/listing'
import { InquirerInput } from './inquirer-input'
import { ChalkOutput } from './chalk-output'
import { Company } from '@/core/entities/company'
import { CustomersFaker } from '@/__tests__/fakers'

export class App {
  private isRunning = true
  private input: InquirerInput
  private output: ChalkOutput
  private company: Company

  constructor() {
    this.input = new InquirerInput()
    this.output = new ChalkOutput()
    this.company = new Company({
      customers: CustomersFaker.fakeMany(30),
      products: [],
      services: [],
    })
  }

  public async start() {
    this.output.title('Bem vindo ao cadastro de clientes do Grupo World Beauty')

    while (true) {
      const option = await this.input.select('Escolha uma das opções:', [
        ['clientes'],
        ['produtos'],
        ['serviços'],
        ['listagens'],
      ])

      switch (option) {
        case 'clientes':
          await this.handleCustomerOptions()
          break
        case 'listagens':
          await this.handleListingOptions()
      }
    }
  }

  private async handleCustomerOptions() {
    const option = await this.input.select('Escolha uma das opções:', [
      ['Cadastrar cliente', 'register'],
      ['Deletar o cadastro de um cliente', 'delete'],
      ['Atualizar um cliente', 'update'],
      ['Listar todos os clientes', 'list'],
    ])

    switch (option) {
      case 'register': {
        const useCase = new RegisterCustomer(
          this.company.customers,
          this.input,
          this.output,
        )
        await useCase.register()
        break
      }
      case 'list': {
        const useCase = new ListCustomers(this.company.customers, this.input, this.output)
        useCase.list()
        break
      }
    }
  }

  private async handleListingOptions() {
    const option = await this.input.select('Escolha uma das opções:', [
      ['Listar clientes por gênero', 'list-customer-by-gender'],
      [
        'Listar os 10 clientes que mais consumiram produtos ou serviços',
        'list-customers-by-most-products-or-services-consumption',
      ],
      [
        'Listar os produtos ou serviços mais consumidos',
        'list-products-or-services-by-most-consumption',
      ],
      [
        'Listar os produtos ou serviços mais consumidos por gênero',
        'list-products-or-services-by-most-consumption-and-gender',
      ],
      [
        'Listar os 10 clientes que menos consumiram produtos ou serviços',
        'list-customers-by-less-products-or-services-consumption',
      ],
      [
        'Listar os 5 clientes que mais consumiram em valor',
        'list-customers-by-most-spending',
      ],
    ])

    switch (option) {
      case 'list-customer-by-gender': {
        const useCase = new ListCustomersByGender(
          this.company.customers,
          this.input,
          this.output,
        )
        useCase.list()
        break
      }
    }
  }
}
