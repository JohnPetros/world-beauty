import { RegisterCustomer } from '@/core/use-cases/customers/register-customer'
import {
  ListCustomers,
  ListCustomersByGender,
  ListCustomersByMostConsumption,
  ListCustomersByLessConsumption,
  ListCustomersByMostSpeding,
  ListProductsAndServicesByMostConsumption,
  ListCustomersByMostConsumptionAndGenderUseCase,
  ListProducts,
  ListServices,
} from '@/core/use-cases/listing'
import type { Company } from '@/core/entities/company'
import { InquirerInput } from './inquirer-input'
import { ChalkOutput } from './chalk-output'
import { CompanyFaker } from '@/__tests__/fakers'
import { DeleteProduct, RegisterProduct, UpdateProduct } from '@/core/use-cases/products'
import { DeleteService, RegisterService, UpdateService } from '@/core/use-cases/services'
import {
  ConsumeProductrOrService,
  DeleteCustomer,
  UpdateCustomer,
} from '@/core/use-cases/customers'

export class App {
  private input: InquirerInput
  private output: ChalkOutput
  private company: Company

  constructor() {
    this.input = new InquirerInput()
    this.output = new ChalkOutput()
    this.company = CompanyFaker.fake()
  }

  public async start() {
    this.output.title('Bem vindo ao cadastro de clientes do Grupo World Beauty')

    while (true) {
      const option = await this.input.select('Escolha uma das opções:', [
        ['Clientes'],
        ['Produtos'],
        ['Serviços'],
        ['Listagens'],
        ['Sair'],
      ])

      switch (option) {
        case 'Clientes':
          await this.handleCustomersOptions()
          break
        case 'Produtos':
          await this.handleProductsOptions()
          break
        case 'Serviços':
          await this.handleServicesOptions()
          break
        case 'Listagens':
          await this.handleListingOptions()
          break
        case 'Sair':
          this.exit()
          break
        default:
          this.unknownCommand()
      }
    }
  }

  private async handleCustomersOptions() {
    this.output.clear()
    const option = await this.input.select('Escolha uma das opções:', [
      ['Cadastrar cliente', 'register'],
      ['Atualizar um cliente', 'update'],
      ['Deletar o cadastro de um cliente', 'delete'],
      ['Listar todos os clientes', 'list'],
      ['Consumir produto ou serviço', 'consume-product-or-service'],
      ['Voltar', 'back'],
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
      case 'update': {
        const useCase = new UpdateCustomer(
          this.company.customers,
          this.input,
          this.output,
        )
        await useCase.update()
        break
      }
      case 'delete': {
        const useCase = new DeleteCustomer(
          this.company.customers,
          this.input,
          this.output,
        )
        await useCase.delete()
        break
      }
      case 'list': {
        const useCase = new ListCustomers(this.company.customers, this.input, this.output)
        useCase.list()
        break
      }
      case 'consume-product-or-service': {
        const useCase = new ConsumeProductrOrService(
          this.company.customers,
          this.company.products,
          this.company.services,
          this.input,
          this.output,
        )
        await useCase.consume()
        break
      }
      case 'back':
        this.output.clear()
        break
      default:
        this.unknownCommand()
    }
  }

  private async handleProductsOptions() {
    this.output.clear()
    const option = await this.input.select('Escolha uma das opções:', [
      ['Cadastrar produto', 'register'],
      ['Deletar o cadastro de um produto', 'delete'],
      ['Atualizar um produto', 'update'],
      ['Listar todos os produtos', 'list'],
      ['Voltar', 'back'],
    ])

    switch (option) {
      case 'register': {
        const useCase = new RegisterProduct(
          this.company.products,
          this.input,
          this.output,
        )
        await useCase.register()
        break
      }
      case 'update': {
        const useCase = new UpdateProduct(this.company.products, this.input, this.output)
        await useCase.update()
        break
      }
      case 'delete': {
        const useCase = new DeleteProduct(this.company.products, this.input, this.output)
        await useCase.delete()
        break
      }
      case 'list': {
        const useCase = new ListProducts(this.company.products, this.input, this.output)
        useCase.list()
        break
      }
      case 'back':
        this.output.clear()
        break
      default:
        this.unknownCommand()
    }
  }

  private async handleServicesOptions() {
    this.output.clear()
    const option = await this.input.select('Escolha uma das opções:', [
      ['Cadastrar serviço', 'register'],
      ['Deletar o cadastro de um serviço', 'delete'],
      ['Atualizar um serviço', 'update'],
      ['Listar todos os serviços', 'list'],
      ['Voltar', 'back'],
    ])

    switch (option) {
      case 'register': {
        const useCase = new RegisterService(
          this.company.services,
          this.input,
          this.output,
        )
        await useCase.register()
        break
      }
      case 'update': {
        const useCase = new UpdateService(this.company.services, this.input, this.output)
        await useCase.update()
        break
      }
      case 'delete': {
        const useCase = new DeleteService(this.company.services, this.input, this.output)
        await useCase.delete()
        break
      }
      case 'list': {
        const useCase = new ListServices(this.company.services, this.input, this.output)
        useCase.list()
        break
      }
      case 'back':
        this.output.clear()
        break
      default:
        this.unknownCommand()
    }
  }

  private async handleListingOptions() {
    this.output.clear()
    const option = await this.input.select('Escolha uma das opções:', [
      ['Listar clientes por gênero', 'list-customer-by-gender'],
      [
        'Listar os 10 clientes que mais consumiram produtos ou serviços',
        'list-customers-by-most-consumption',
      ],
      [
        'Listar os produtos ou serviços mais consumidos',
        'list-products-and-services-by-most-consumption',
      ],
      [
        'Listar os produtos ou serviços mais consumidos por gênero',
        'list-by-most-consumption-and-gender',
      ],
      [
        'Listar os 10 clientes que menos consumiram produtos ou serviços',
        'list-customers-by-less-consumption',
      ],
      [
        'Listar os 5 clientes que mais consumiram em valor',
        'list-customers-by-most-spending',
      ],
      ['Sair', 'back'],
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
      case 'list-products-and-services-by-most-consumption': {
        const useCase = new ListProductsAndServicesByMostConsumption(
          this.company.customers,
          this.input,
          this.output,
        )
        useCase.list()
        break
      }
      case 'list-by-most-consumption-and-gender': {
        const useCase = new ListCustomersByMostConsumptionAndGenderUseCase(
          this.company.customers,
          this.input,
          this.output,
        )
        useCase.list()
        break
      }
      case 'list-customers-by-most-consumption': {
        const useCase = new ListCustomersByMostConsumption(
          this.company.customers,
          this.input,
          this.output,
        )
        useCase.list()
        break
      }
      case 'list-customers-by-less-consumption': {
        const useCase = new ListCustomersByLessConsumption(
          this.company.customers,
          this.input,
          this.output,
        )
        useCase.list()
        break
      }
      case 'list-customers-by-most-spending': {
        const useCase = new ListCustomersByMostSpeding(
          this.company.customers,
          this.input,
          this.output,
        )
        useCase.list()
        break
      }
      case 'back':
        this.output.clear()
        break
      default:
        this.unknownCommand()
    }
  }

  async unknownCommand() {
    this.output.error('Comando desconhecido')
  }

  async exit() {
    this.output.clear()
    this.output.success('Até a próxima')
    process.exit(0)
  }
}
