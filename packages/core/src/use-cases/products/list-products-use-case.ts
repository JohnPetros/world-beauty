import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination-response'

export class ListProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(page: number) {
    const [products, productsCount] = await Promise.all([
      this.productsRepository.findMany(page),
      this.productsRepository.count(),
    ])

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: productsCount,
    })
  }
}
