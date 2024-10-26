import type { CustomerWithAddress } from '../../domain/entities'
import type { ApiResponse } from '../../responses'

export interface ICustomersService {
  listCustomers(): Promise<ApiResponse<CustomerWithAddress[]>>
  registerCustomer(customer: CustomerWithAddress): Promise<ApiResponse<void>>
  updateCustomer(customer: CustomerWithAddress): Promise<ApiResponse<void>>
  deleteCustomers(customersIds: string[]): Promise<ApiResponse<void>>
}
