import type { CustomerGender } from '@prisma/client'

import { Customer } from '@world-beauty/core/entities'

import type { PrismaCustomer } from '../types'

export class PrismaCustomersMapper {
  toDomain(prismaCustomer: PrismaCustomer): Customer {
    return Customer.create({
      id: prismaCustomer.id,
      name: prismaCustomer.name,
      cpf: {
        value: prismaCustomer.cpf.value,
        issueDate: prismaCustomer.cpf.issued_at,
      },
      consumption: Number(prismaCustomer.consumption),
      spending: Number(prismaCustomer.spending),
      phones: prismaCustomer.phones
        .filter((phone) => Boolean(phone.number))
        .map((phone) => ({
          number: phone.number,
          codeArea: phone.code_area,
        })),
      rgs: prismaCustomer.rgs
        .filter((rg) => Boolean(rg.value))
        .map((rg) => ({
          value: rg.value,
          issueDate: rg.issued_at,
        })),
      socialName: prismaCustomer.socialName,
      gender: prismaCustomer.gender === 'MALE' ? 'male' : 'female',
    })
  }

  toPrisma(customer: Customer): PrismaCustomer {
    return {
      id: customer.id,
      name: customer.name,
      cpf: {
        id: '',
        value: customer.cpf.value,
        issued_at:
          customer.cpf.issueDate instanceof Date
            ? customer.cpf.issueDate
            : new Date(customer.cpf.issueDate),
        customer_id: customer.id,
      },
      socialName: customer.socialName,
      spending: customer.spending,
      rgs: customer.rgs.map((rg) => ({
        id: '',
        value: rg.value,
        issued_at: rg.issueDate instanceof Date ? rg.issueDate : new Date(rg.issueDate),
        customer_id: customer.id,
      })),
      phones: customer.phones.map((phone) => ({
        id: '',
        number: phone.number,
        code_area: phone.codeArea,
        customer_id: customer.id,
      })),
      consumption: 0,
      registered_at: new Date(),
      gender: customer.gender.toUpperCase() as CustomerGender,
    }
  }
}
