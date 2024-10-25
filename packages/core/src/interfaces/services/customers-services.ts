import type { Customer } from '../../domain/entities'
import type { CustomerDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface ICustomersService {
  registerCustomer(customer: Customer): Promise<ApiResponse<void>>
  listCustomers(): Promise<ApiResponse<void>>
  updateCustomer(
    customer: Partial<CustomerDto>,
    customerId: string,
  ): Promise<ApiResponse<void>>
  deleteCustomers(customersIds: string[]): Promise<ApiResponse<void>>
}
