import type { CustomerDto, ProductDto, ServiceDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { Gender } from '../../types'

export interface IReportsService {
  listCustomersByGender(
    gender: Gender,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<CustomerDto>>>
  listCustomersByLessConsumption(): Promise<ApiResponse<CustomerDto[]>>
  listCustomersByMostConsumption(): Promise<ApiResponse<CustomerDto[]>>
  listMostConsumedProducts(
    page: number,
    customerGender?: Gender,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  listMostConsumedServices(
    page: number,
    customerGender?: Gender,
  ): Promise<ApiResponse<PaginationResponse<ServiceDto>>>
}
