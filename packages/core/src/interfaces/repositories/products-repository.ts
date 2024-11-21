import type { Product } from '../../domain/entities'

export interface IProductsRepository {
  findAll(): Promise<Product[]>
  findMany(page: number): Promise<Product[]>
  findManyByCustomerId(
    page: number,
    customerId: string,
  ): Promise<{ products: Product[]; count: number }>
  findManyMostConsumedProducts(
    page: number,
  ): Promise<{ products: Product[]; count: number }>
  findManyMostConsumedProductsByCustomersGender(
    page: number,
    gender: 'male' | 'female',
  ): Promise<{ products: Product[]; count: number }>
  removeAll(): Promise<void>
  removeMany(productsIds: string[]): Promise<void>
  count(): Promise<number>
  update(product: Product): Promise<void>
  add(product: Product): Promise<void>
  addMany(products: Product[]): Promise<void>
}
