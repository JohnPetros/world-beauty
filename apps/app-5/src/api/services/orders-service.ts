import type { ProductDto, ServiceDto } from '@world-beauty/core/dtos'
import type { IApiClient, IOrdersService } from '@world-beauty/core/interfaces'
import type { PaginationResponse } from '@world-beauty/core/responses'
import type { Order } from '@world-beauty/core/structs'

export const OrdersService = (apiClient: IApiClient): IOrdersService => {
  return {
    async registerOrders(orders: Order[]) {
      return await apiClient.post('/orders', { orders: orders.map((order) => order.dto) })
    },

    async listProducts(customerId: string, page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ProductDto>>(`${customerId}/products`)
    },

    async listServices(customerId: string, page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ServiceDto>>(`${customerId}/services`)
    },
  }
}
