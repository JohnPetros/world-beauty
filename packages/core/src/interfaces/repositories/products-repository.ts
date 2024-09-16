import type { Product } from '../../domain/entities'

export interface IProductsRepository {
  findAll(): Promise<Product>
}
