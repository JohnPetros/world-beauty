import type { Customer } from '../../domain/entities'
import type { CustomerDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'

export interface ICustomersService {
  listCustomers(page: number): Promise<ApiResponse<PaginationResponse<CustomerDto>>>
  registerCustomer(customer: Customer): Promise<ApiResponse<void>>
  updateCustomer(
    customer: Partial<CustomerDto>,
    customerId: string,
  ): Promise<ApiResponse<void>>
  deleteCustomers(customerIds: string[]): Promise<ApiResponse<void>>
}
