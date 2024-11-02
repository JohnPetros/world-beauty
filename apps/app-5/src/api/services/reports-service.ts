import type { CustomerDto, ProductDto, ServiceDto } from '@world-beauty/core/dtos'
import type { IApiClient, IReportsService } from '@world-beauty/core/interfaces'
import type { PaginationResponse } from '@world-beauty/core/responses'

export const ReportsService = (apiClient: IApiClient): IReportsService => {
  return {
    async listCustomersByGender(gender, page) {
      apiClient.setParam('page', page.toString())

      return await apiClient.get<PaginationResponse<CustomerDto>>(
        `/customers-by-gender/${gender}`,
      )
    },

    async listCustomersByLessConsumption() {
      return await apiClient.get<CustomerDto[]>('/customers-by-less-consumption')
    },

    async listCustomersByMostConsumption() {
      return await apiClient.get<CustomerDto[]>('/customers-by-most-consumption')
    },

    async listMostConsumedProducts(page: number, gender) {
      apiClient.setParam('page', page.toString())
      if (gender) apiClient.setParam('gender', gender)

      return await apiClient.get<PaginationResponse<ProductDto>>(
        '/most-consumed-products',
      )
    },

    async listMostConsumedServices(page: number, gender) {
      apiClient.setParam('page', page.toString())
      if (gender) apiClient.setParam('gender', gender)

      return await apiClient.get<PaginationResponse<ServiceDto>>(
        '/most-consumed-services',
      )
    },
  }
}
