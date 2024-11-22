import type { ProductDto } from '../../dtos'
import type { IProductsRepository } from '../../interfaces/repositories'

export class UpdateProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(productDto: Partial<ProductDto>, productId: string) {
    const product = await this.productsRepository.findById(productId)
    if (!product) throw new Error('Cliente não encontrado')

    const updatedProduct = product.update(productDto)
    await this.productsRepository.update(updatedProduct)
  }
}
