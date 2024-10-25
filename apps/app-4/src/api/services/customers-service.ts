import type { IApiClient, ICustomersService } from '@world-beauty/core/interfaces'
import type { Customer, CustomerWithAddress } from '@world-beauty/core/entities'

export const CustomersService = (apiClient: IApiClient): ICustomersService => {
  return {
    async registerCustomer(customer: CustomerWithAddress) {
      return await apiClient.post('/cliente/cadastrar', {
        nome: customer.name,
        sobreNome: customer.lastname,
        email: customer.email,
        endereco: {
          estado: customer.address.state,
          cidade: customer.address.city,
          rua: customer.address.state,
          numero: customer.address.number,
          codigoPostal: customer.address.zipcode,
          informacoesAdicionais: customer.address.complement,
        },
      })
    },
  }
}
