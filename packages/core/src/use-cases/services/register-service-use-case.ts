import { Product } from '../../domain/entities'
import type { ServiceDto } from '../../dtos'
import type { IProductsRepository } from '../../interfaces/repositories'

export class RegisterServiceUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(serviceDto: ServiceDto) {
    const product = Product.create(serviceDto)
    await this.productsRepository.add(product)
  }
}
