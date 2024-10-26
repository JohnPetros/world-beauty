import type { CustomerWithAddress } from '../../domain/entities'
import type { CustomerWithAddressDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface ICustomersService {
  listCustomers(): Promise<ApiResponse<CustomerWithAddressDto[]>>
  registerCustomer(customer: CustomerWithAddress): Promise<ApiResponse<void>>
  updateCustomer(customer: CustomerWithAddress): Promise<ApiResponse<void>>
  deleteCustomers(customerIds: string[]): Promise<ApiResponse<void>>
}
