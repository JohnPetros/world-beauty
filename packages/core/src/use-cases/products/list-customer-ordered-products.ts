import type { ICustomersRepository, IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination-response'

export class ListCustomerOrderedProductsUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute(customerId: string, page: number) {
    const customer = await this.customersRepository.findById(customerId)
    if (!customer) throw new Error('Cliente não encontrado')

    const { products, count } = await this.productsRepository.findManyByCustomerId(
      page,
      customerId,
    )

    return new PaginationResponse({ items: products, itemsCount: count })
  }
}
