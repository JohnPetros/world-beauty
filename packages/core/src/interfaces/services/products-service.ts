import type { Product } from '../../domain/entities'
import type { ProductDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'

export interface IProductsService {
  listProducts(page: number): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  registerProduct(product: Product): Promise<ApiResponse<void>>
  updateProduct(product: Product): Promise<ApiResponse<void>>
  deleteProducts(productIds: string[]): Promise<ApiResponse<void>>
}
