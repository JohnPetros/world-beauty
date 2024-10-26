import type { CustomerWithAddress } from '@world-beauty/core/entities'
import type { JavaServerCustomerDto } from '../types'
import type { CustomerWithAddressDto } from '@world-beauty/core/dtos'

export const JavaServerCustomerMapper = () => {
  return {
    toDto(customer: JavaServerCustomerDto): CustomerWithAddressDto {
      return {
        id: customer.id,
        name: customer.nome,
        email: customer.email,
        lastname: customer.sobreNome,
        address: {
          state: customer.endereco.estado,
          city: customer.endereco.cidade,
          number: customer.endereco.numero,
          street: customer.endereco.rua,
          zipcode: customer.endereco.codigoPostal,
          neighborhood: customer.endereco.bairro,
          complement: customer.endereco.informacoesAdicionais,
        },
        phones: customer.telefones.map((telefone) => ({
          codeArea: telefone.ddd,
          number: telefone.numero,
        })),
      }
    },

    toJavaServer(customer: CustomerWithAddress) {
      return {
        nome: customer.name,
        sobreNome: customer.lastname,
        email: customer.email,
        endereco: {
          estado: customer.address.state,
          cidade: customer.address.city,
          rua: customer.address.street,
          numero: customer.address.number,
          codigoPostal: customer.address.zipcode,
          bairro: customer.address.neighborhood,
          informacoesAdicionais: customer.address.complement,
        },
        telefones: customer.phones.map((phone) => ({
          ddd: phone.codeArea,
          numero: phone.number,
        })),
      }
    },
  }
}
