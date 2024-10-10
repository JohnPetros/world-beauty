import type { Customer, Product, Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { UseCase } from '../use-case'
import { ListProducts } from './list-products'
import { ListServices } from './list-services'

export class ListProductsAndServicesByMostComsumptionAndCustomerGenderUseCase extends UseCase {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    this.output.clear()
    this.listByGender('masculino')
    this.listByGender('feminino')
  }

  private listByGender(gender: 'masculino' | 'feminino') {
    const customers = this.customers.filter((customer) => customer.gender === gender)
    this.output.title(`Produtos mais consumidos pelo sexo ${gender}`)
    this.listProducts(customers)
    this.output.title(`Serviços mais consumidos pelo sexo ${gender}`)
    this.listServices(customers)
  }

  private listProducts(customers: Customer[]) {
    const products: Product[] = []

    for (const customer of customers) {
      for (const product of customer.consumedProducts) {
        const productIndex = products.findIndex((currentProduct) =>
          currentProduct.isEqualTo(product),
        )
        if (productIndex !== -1) {
          products[productIndex].incrementOrdersCount(product.ordersCount)
          continue
        }
        products.push(product)
      }
    }

    products.sort((fisrtProduct, secondProduct) => {
      return secondProduct.ordersCount - fisrtProduct.ordersCount
    })
    const useCase = new ListProducts(products, this.input, this.output)
    useCase.list()
  }

  private listServices(customers: Customer[]) {
    const services: Service[] = []

    for (const customer of customers) {
      for (const service of customer.consumedServices) {
        const serviceIndex = services.findIndex((currentservice) =>
          currentservice.isEqualTo(service),
        )
        if (serviceIndex !== -1) {
          services[serviceIndex].incrementOrdersCount(service.ordersCount)
          continue
        }
        services.push(service)
      }
    }

    services.sort((fisrtService, secondService) => {
      return secondService.ordersCount - fisrtService.ordersCount
    })
    const useCase = new ListServices(services, this.input, this.output)
    useCase.list()
  }
}
