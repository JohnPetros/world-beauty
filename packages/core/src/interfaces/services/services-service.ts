import type { Service } from '../../domain/entities'
import type { ServiceDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'

export interface IServicesService {
  listServices(page: number): Promise<ApiResponse<PaginationResponse<ServiceDto>>>
  registerService(service: Service): Promise<ApiResponse<void>>
  updateService(service: Service): Promise<ApiResponse<void>>
  deleteServices(serviceIds: string[]): Promise<ApiResponse<void>>
}
