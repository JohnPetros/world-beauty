import type { Customer, Product, Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { UseCase } from '../use-case'
import { ListCustomers, ListProducts, ListServices } from '../listing'

export class ConsumeProductrOrService extends UseCase {
  private isRunning = true
  private customers: Customer[]
  private products: Product[]
  private services: Service[]

  constructor(
    customers: Customer[],
    products: Product[],
    services: Service[],
    input: Input,
    output: Output,
  ) {
    super(input, output)
    this.customers = customers
    this.products = products
    this.services = services
  }

  async consume() {
    const customersList = new ListCustomers(this.customers, this.input, this.output)
    customersList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do cliente:')

      const customer = this.customers.find((customer) => customer.id === id)

      if (!customer) {
        this.output.error('Cliente não encontrado')
        continue
      }

      const option = await this.input.select('Produto ou serviço?', [
        ['produto', 'product'],
        ['serviço', 'service'],
      ])

      switch (option) {
        case 'product': {
          await this.addProduct(customer)
          break
        }
        case 'service': {
          await this.addService(customer)
          break
        }
      }

      this.isRunning = false
    }
  }

  async addProduct(customer: Customer) {
    const productsList = new ListProducts(this.products, this.input, this.output)
    productsList.list()

    while (true) {
      const id = await this.input.text('ID do produto:')

      const productIndex = this.products.findIndex((product) => product.id === id)

      if (productIndex === -1) {
        this.output.error('Produto não encontrado')
        continue
      }

      const product = this.products[productIndex]
      customer.consumeProduct(product)
      product.incrementOrdersCount(1)
      this.products[productIndex] = product

      this.output.clear()
      this.output.success(
        `Produto ${product.id} adicionado ao cliente ${customer.id} com sucesso`,
      )
      break
    }
  }

  async addService(customer: Customer) {
    const servicesList = new ListServices(this.services, this.input, this.output)
    servicesList.list()

    while (true) {
      const id = await this.input.text('ID do serviço:')

      const serviceIndex = this.services.findIndex((product) => product.id === id)

      if (serviceIndex === -1) {
        this.output.error('Serviço não encontrado')
        continue
      }

      const service = this.services[serviceIndex]
      customer.consumeService(service)
      service.incrementOrdersCount(1)
      this.services[serviceIndex] = service

      this.output.clear()
      this.output.success(
        `Serviço ${service.id} adicionado ao cliente ${customer.id} com sucesso`,
      )
      break
    }
  }
}
