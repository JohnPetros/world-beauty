import type { Customer } from '@world-beauty/core/entities'
import type { ICustomersRepository } from '@world-beauty/core/interfaces'
import { PAGINATION } from '@world-beauty/core/constants'
import { prisma } from '../client'
import { PrismaCustomersMapper } from '../mappers'
import type { PrismaCustomer } from '../types'
import { Prisma } from '@prisma/client'

const custumersQuery = Prisma.sql`
SELECT 
  C.*, 
  SUM(OI.amount) spending, 
  COUNT(OI.id) consumption, 
  JSON_BUILD_OBJECT(
    'value', CPF.value,
    'issued_at', CPF.issued_at
  ) cpf
FROM customers C
LEFT JOIN cpfs CPF ON CPF.customer_id = C.id 
LEFT JOIN rgs RG ON RG.customer_id = C.id
LEFT JOIN phones P ON P.customer_id = C.id
LEFT JOIN orders O ON O.customer_id = C.id 
LEFT JOIN order_items OI ON O.item_id = OI.id
`

export class PrismaCustomersRepository implements ICustomersRepository {
  private readonly mapper = new PrismaCustomersMapper()

  async findAll(): Promise<Customer[]> {
    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`${custumersQuery}`
    return prismaCustomers.map(this.mapper.toDomain)
  }

  async findAllMale(): Promise<Customer[]> {
    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`
      ${custumersQuery}
      WHERE gender = 'MALE'
    `
    return prismaCustomers.map(this.mapper.toDomain)
  }

  async findAllFemale(): Promise<Customer[]> {
    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`
      ${custumersQuery}
      WHERE gender = 'FEMALE'
    `
    return prismaCustomers.map(this.mapper.toDomain)
  }

  async findManyMale(page: number): Promise<{ customers: Customer[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1});`

    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`
      ${custumersQuery}
      WHERE gender = 'MALE'
      ${paginationQuery}
    `

    const count = await prisma.customer.count({ where: { gender: 'FEMALE' } })

    return { customers: prismaCustomers.map(this.mapper.toDomain), count }
  }

  async findManyFemale(page: number): Promise<{ customers: Customer[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1});`

    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`
      ${custumersQuery}
      WHERE gender = 'FEMALE'
      ${paginationQuery}
    `

    const count = await prisma.customer.count({ where: { gender: 'FEMALE' } })

    return { customers: prismaCustomers.map(this.mapper.toDomain), count }
  }

  async findMany(page: number): Promise<{ customers: Customer[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1});`

    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`
      ${custumersQuery}
      ${paginationQuery}
    `

    const count = await prisma.customer.count()

    return { customers: prismaCustomers.map(this.mapper.toDomain), count }
  }

  async findTop10CustomersByMostConsumption(): Promise<Customer[]> {
    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`
      ${custumersQuery}
      ORDER BY COUNT(OI.id) DESC
      LIMIT 10
    `

    return prismaCustomers.map(this.mapper.toDomain)
  }

  async findTop10CustomersByLessConsumption(): Promise<Customer[]> {
    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`
      ${custumersQuery}
      ORDER BY SUM(OI.amount) ASC
      LIMIT 10
    `

    return prismaCustomers.map(this.mapper.toDomain)
  }

  async findTop5CustomersByMostSpending(): Promise<Customer[]> {
    const prismaCustomers = await prisma.$queryRaw<PrismaCustomer[]>`
    ${custumersQuery}
    ORDER BY SUM(OI.amount) DESC
    LIMIT 5
  `

    return prismaCustomers.map(this.mapper.toDomain)
  }

  async removeAll(): Promise<void> {
    await prisma.customer.deleteMany()
  }

  async removeMany(customerIds: string[]): Promise<void> {
    await prisma.customer.deleteMany({
      where: {
        id: { in: customerIds },
      },
    })
  }

  async add(customer: Customer): Promise<void> {
    const prismaCustomer = this.mapper.toPrisma(customer)

    await prisma.customer.create({
      data: {
        name: prismaCustomer.name,
        socialName: prismaCustomer.socialName,
        gender: prismaCustomer.gender,
        cpf: {
          create: {
            value: prismaCustomer.cpf.value,
            issued_at: prismaCustomer.cpf.issued_at,
          },
        },
        rgs: {
          create: prismaCustomer.rgs,
        },
        phones: {
          create: prismaCustomer.phones,
        },
      },
    })
  }

  async addMany(customers: Customer[]): Promise<void> {
    const prismaCustomers = customers.map(this.mapper.toPrisma)

    await prisma.customer.createMany({
      data: prismaCustomers.map((prismaCustomer) => ({
        name: prismaCustomer.name,
        socialName: prismaCustomer.socialName,
        gender: prismaCustomer.gender,
        cpf: {
          create: {
            value: prismaCustomer.cpf.value,
            issued_at: prismaCustomer.cpf.issued_at,
          },
        },
        rgs: {
          create: prismaCustomer.rgs,
        },
        phones: {
          create: prismaCustomer.phones,
        },
      })),
    })
  }

  async update(customer: Customer): Promise<void> {
    // await prisma.customer.update({
    //   where: { id: customer.id },
    //   data: customer,
    // })
  }
}
