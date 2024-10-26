import { CustomerWithAddress } from '@world-beauty/core/entities'
import type { JavaServerCustomerDto } from '../types'

export const JavaServerCustomerMapper = () => {
  return {
    toDomain(customer: JavaServerCustomerDto) {
      return CustomerWithAddress.create({
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
          complement: customer.endereco.informacoesAdicionais,
        },
        phones: customer.telefones.map((telefone) => ({
          number: telefone.numero,
          codeArea: telefone.ddd,
        })),
      })
    },

    toJavaServer(customer: CustomerWithAddress) {
      return {
        nome: customer.name,
        sobreNome: customer.lastname,
        email: customer.email,
        endereco: {
          estado: customer.address.state,
          cidade: customer.address.number,
          rua: customer.address.state,
          numero: customer.address.number,
          codigoPostal: customer.address.zipcode,
          informacoesAdicionais: customer.address.complement,
        },
        telefones: customer.phones.map((phone) => ({
          id: `${customer.id}-${phone.number}`,
          ddd: phone.codeArea,
          numero: phone.number,
        })),
      }
    },
  }
}
