import type { Customer } from '@world-beauty/core/entities'
import type { CustomerDto } from '@world-beauty/core/dtos'
import type { PaginationResponse } from '@world-beauty/core/responses'
import type { IApiClient, ICustomersService } from '@world-beauty/core/interfaces'

export const CustomersService = (apiClient: IApiClient): ICustomersService => {
  return {
    async listCustomers(page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<CustomerDto>>('/customers')
    },

    async registerCustomer(customer: Customer) {
      return await apiClient.post('/customers', customer.dto)
    },

    async updateCustomer(customer: Customer) {
      return await apiClient.put(`/customers/${customer.id}`, customer.dto)
    },

    async deleteCustomers(customerIds: string[]) {
      return await apiClient.delete('/customers', { customersIds: customerIds })
    },
  }
}
