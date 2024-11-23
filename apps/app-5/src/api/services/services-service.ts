import type { IApiClient, IServicesService } from '@world-beauty/core/interfaces'
import type { PaginationResponse } from '@world-beauty/core/responses'
import type { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

export const ServicesService = (apiClient: IApiClient): IServicesService => {
  return {
    async listServices(page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ServiceDto>>('/services')
    },

    async registerService(service: Service) {
      return await apiClient.post('/services', service.dto)
    },

    async updateService(service: Service) {
      return await apiClient.put(`/services/${service.id}`, service.dto)
    },

    async deleteServices(servicesIds: string[]) {
      return await apiClient.delete('/services', { servicesIds })
    },
  }
}
