import type { IApiClient, ICustomersService } from '@world-beauty/core/interfaces'
import type { CustomerWithAddress } from '@world-beauty/core/entities'
import { ApiResponse } from '@world-beauty/core/responses'

import type { JavaServerCustomerDto } from '../types'
import { JavaServerCustomerMapper } from '../mappers'

export const CustomersService = (apiClient: IApiClient): ICustomersService => {
  const javaServerCustomerMapper = JavaServerCustomerMapper()

  return {
    async listCustomers() {
      const response = await apiClient.get<JavaServerCustomerDto[]>('/clientes')
      return new ApiResponse({
        body: response.body.map(javaServerCustomerMapper.toDomain),
      })
    },

    async registerCustomer(customer: CustomerWithAddress) {
      return await apiClient.post(
        '/cliente/cadastrar',
        javaServerCustomerMapper.toJavaServer(customer),
      )
    },

    async updateCustomer(customer: CustomerWithAddress) {
      return await apiClient.post(
        '/cliente/atualizar',
        javaServerCustomerMapper.toJavaServer(customer),
      )
    },

    async deleteCustomers(customersIds: string[]) {
      return await apiClient.post('/cliente/excluir', { id: customersIds[0] })
    },
  }
}
