import type { IProductsRepository } from '../../interfaces'

export class DeleteProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(productsIds: string[]) {
    for (const productId of productsIds) {
      const product = await this.productsRepository.findById(productId)
      if (!product) throw new Error('Product não encontrado')
    }

    await this.productsRepository.removeMany(productsIds)
  }
}
