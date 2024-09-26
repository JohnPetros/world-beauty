import type { Product } from '../../domain/entities'

export interface IProductsRepository {
  findAll(): Promise<Product[]>
  findMany(page: number): Promise<Product[]>
  findManyMostConsumedProducts(
    page: number,
  ): Promise<{ products: Product[]; count: number }>
  findManyMostConsumedProductsByMaleCustomers(
    page: number,
  ): Promise<{ products: Product[]; count: number }>
  findManyMostConsumedProductsByFemaleCustomers(
    page: number,
  ): Promise<{ products: Product[]; count: number }>
  removeAll(): Promise<void>
  removeMany(productsIds: string[]): Promise<void>
  count(): Promise<number>
  update(product: Product): Promise<void>
  add(customer: Product): Promise<void>
}
