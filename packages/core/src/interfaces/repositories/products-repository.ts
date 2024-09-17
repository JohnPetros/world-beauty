import type { Product } from '../../domain/entities'

export interface IProductsRepository {
  findAll(): Promise<Product[]>
  findAllPaginated(page: number): Promise<Product[]>
  removeAll(): Promise<void>
  count(): Promise<number>
  add(customer: Product): Promise<void>
}
