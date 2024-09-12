import type { Customer, Product, Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'
import { ListProducts } from './list-products'
import { ListServices } from './list-services'

type ConsumedMap = {
  [key: string]: number
}

export class ListProductsAndServicesByMostConsumption extends List {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    const products: Product[] = []
    const services: Service[] = []
    const consumedProductsMap: ConsumedMap = {}
    const consumedServicesMap: ConsumedMap = {}

    for (const customer of this.customers) {
      for (const product of customer.consumedProducts) {
        const isIncluded = products.some((currentProduct) =>
          currentProduct.isEqualTo(product),
        )
        if (!isIncluded) {
          products.push(product)
          consumedProductsMap[product.id] = 0
        }
      }
    }

    for (const customer of this.customers) {
      for (const service of customer.consumedServices) {
        if (!service) continue
        const isIncluded = services.some((currentService) =>
          currentService.isEqualTo(service),
        )
        if (!isIncluded) {
          services.push(service)
          consumedServicesMap[service.id] = 0
        }
      }
    }

    for (const customer of this.customers) {
      for (const product of customer.consumedProducts) {
        consumedProductsMap[product.id] = consumedProductsMap[product.id] + 1
      }

      for (const service of customer.consumedServices) {
        consumedServicesMap[service.id] = consumedServicesMap[service.id] + 1
      }
    }

    const sortedProducts = [...products].sort(
      (firstProduct, secondProduct) =>
        consumedProductsMap[secondProduct.id] - consumedProductsMap[firstProduct.id],
    )

    const sortedServices = [...services].sort(
      (firstService, secondService) =>
        consumedServicesMap[secondService.id] - consumedServicesMap[firstService.id],
    )

    const productsList = new ListProducts(sortedProducts, this.input, this.output)
    const servicesList = new ListServices(sortedServices, this.input, this.output)

    this.output.title('Produtos mais consumidos')
    productsList.list()
    this.output.title('Serviços mais consumidos')
    servicesList.list()
  }
}
