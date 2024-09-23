import type { Product } from '../../domain/entities'

export interface IProductsRepository {
  findAll(): Promise<Product[]>
  findAllPaginated(page: number): Promise<Product[]>
  removeAll(): Promise<void>
  removeMany(productsIds: string[]): Promise<void>
  count(): Promise<number>
  update(product: Product): Promise<void>
  add(customer: Product): Promise<void>
}
