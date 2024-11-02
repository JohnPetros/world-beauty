import type { IApiClient, IServicesService } from '@world-beauty/core/interfaces'
import type { PaginationResponse } from '@world-beauty/core/responses'
import type { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

export const ServicesService = (apiClient: IApiClient): IServicesService => {
  return {
    async listServices(page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ServiceDto>>('/clientes')
    },

    async registerService(Service: Service) {
      return await apiClient.post('/cliente/cadastrar', Service.dto)
    },

    async updateService(Service: Service) {
      return await apiClient.put('/cliente/atualizar', {
        ServiceId: Service.id,
        data: Service.dto,
      })
    },

    async deleteServices(ServiceIds: string[]) {
      return await apiClient.delete('/cliente/excluir', { id: ServiceIds[0] })
    },
  }
}
