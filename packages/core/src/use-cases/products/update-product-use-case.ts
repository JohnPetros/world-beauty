import { Product } from '../../domain/entities'
import type { ProductDto } from '../../dtos'
import type { IProductsRepository } from '../../interfaces/repositories'

export class UpdateProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(productDto: ProductDto, productId: string) {
    const product = Product.create({ id: productId, ...productDto })
    await this.productsRepository.update(product)
  }
}
