import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListMostConsumedProductsByMaleCustomersUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(page: number) {
    const { products, count } =
    await this.productsRepository.findManyMostConsumedProductsByCustomersGender(page, 'male')

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
