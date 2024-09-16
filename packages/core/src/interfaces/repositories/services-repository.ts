import type { Product } from '../../domain/entities'

export interface IServicesRepository {
  findAll(): Promise<Product>
}
