import type { Order } from '../../domain/structs'
import type { ProductDto, ServiceDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'

export interface IOrdersService {
  listProducts(
    customerId: string,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  listServices(
    customerId: string,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<ServiceDto>>>
  registerOrders(orders: Order[]): Promise<ApiResponse<void>>
}
