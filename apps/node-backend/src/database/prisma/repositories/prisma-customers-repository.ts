import type { Customer } from '@world-beauty/core/entities'
import type { ICustomersRepository } from '@world-beauty/core/interfaces'
import { PAGINATION } from '@world-beauty/core/constants'
import { prisma } from '../client'
import { PrismaCustomersMapper } from '../mappers'
import type { PrismaCustomer } from '../types'

export class PrismaCustomersRepository implements ICustomersRepository {
  private readonly mapper = new PrismaCustomersMapper()

  async findById(customerId: string): Promise<Customer | null> {
    const data = await prisma.customer.findUnique({
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        id: customerId,
      },
    })

    if (!data) return null

    const prismaCustomer = {
      id: data.id,
      cpf: data.cpf,
      name: data.name,
      socialName: data.socialName,
      gender: data.gender,
      phones: data.phones,
      rgs: data.rgs,
      registered_at: data.registered_at,
      consumption: data.orders.reduce((total) => total + 1, 0),
      spending: data.orders.reduce((total, order) => total + Number(order.amount), 0),
    }

    return this.mapper.toDomain(prismaCustomer as PrismaCustomer)
  }

  async findByCpf(customerCpf: string): Promise<Customer | null> {
    const data = await prisma.customer.findFirst({
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        cpf: { value: customerCpf },
      },
    })

    if (!data) return null

    const prismaCustomer = {
      id: data.id,
      cpf: data.cpf,
      name: data.name,
      socialName: data.socialName,
      gender: data.gender,
      phones: data.phones,
      rgs: data.rgs,
      registered_at: data.registered_at,
      consumption: data.orders.reduce((total) => total + 1, 0),
      spending: data.orders.reduce((total, order) => total + Number(order.amount), 0),
    }

    return this.mapper.toDomain(prismaCustomer as PrismaCustomer)
  }

  async findByRg(customerRg: string): Promise<Customer | null> {
    const data = await prisma.customer.findFirst({
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        rgs: { some: { value: customerRg } },
      },
    })

    if (!data) return null

    const prismaCustomer = {
      id: data.id,
      cpf: data.cpf,
      name: data.name,
      socialName: data.socialName,
      gender: data.gender,
      phones: data.phones,
      rgs: data.rgs,
      registered_at: data.registered_at,
      consumption: data.orders.reduce((total) => total + 1, 0),
      spending: data.orders.reduce((total, order) => total + Number(order.amount), 0),
    }

    return this.mapper.toDomain(prismaCustomer as PrismaCustomer)
  }

  async findByPhone(customerPhone: string): Promise<Customer | null> {
    const data = await prisma.customer.findFirst({
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        phones: { some: { number: customerPhone } },
      },
    })

    if (!data) return null

    const prismaCustomer = {
      id: data.id,
      cpf: data.cpf,
      name: data.name,
      socialName: data.socialName,
      gender: data.gender,
      phones: data.phones,
      rgs: data.rgs,
      registered_at: data.registered_at,
      consumption: data.orders.reduce((total) => total + 1, 0),
      spending: data.orders.reduce((total, order) => total + Number(order.amount), 0),
    }

    return this.mapper.toDomain(prismaCustomer as PrismaCustomer)
  }

  async findAll(): Promise<Customer[]> {
    const data = await prisma.customer.findMany({
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaCustomers = data.map((prismaCustomer) => ({
      id: prismaCustomer.id,
      cpf: prismaCustomer.cpf,
      name: prismaCustomer.name,
      socialName: prismaCustomer.socialName,
      gender: prismaCustomer.gender,
      phones: prismaCustomer.phones,
      rgs: prismaCustomer.rgs,
      registered_at: prismaCustomer.registered_at,
      consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
      spending: prismaCustomer.orders.reduce(
        (total, order) => total + Number(order.amount),
        0,
      ),
    }))

    return (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain)
  }

  async findAllMale(): Promise<Customer[]> {
    const data = await prisma.customer.findMany({
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        gender: 'MALE',
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaCustomers = data.map((prismaCustomer) => ({
      id: prismaCustomer.id,
      cpf: prismaCustomer.cpf,
      name: prismaCustomer.name,
      socialName: prismaCustomer.socialName,
      gender: prismaCustomer.gender,
      phones: prismaCustomer.phones,
      rgs: prismaCustomer.rgs,
      registered_at: prismaCustomer.registered_at,
      consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
      spending: prismaCustomer.orders.reduce(
        (total, order) => total + Number(order.amount),
        0,
      ),
    }))

    return (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain)
  }

  async findAllFemale(): Promise<Customer[]> {
    const data = await prisma.customer.findMany({
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        gender: 'FEMALE',
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaCustomers = data.map((prismaCustomer) => ({
      id: prismaCustomer.id,
      cpf: prismaCustomer.cpf,
      name: prismaCustomer.name,
      socialName: prismaCustomer.socialName,
      gender: prismaCustomer.gender,
      phones: prismaCustomer.phones,
      rgs: prismaCustomer.rgs,
      registered_at: prismaCustomer.registered_at,
      consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
      spending: prismaCustomer.orders.reduce(
        (total, order) => total + Number(order.amount),
        0,
      ),
    }))

    return (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain)
  }

  async findManyMale(page: number): Promise<{ customers: Customer[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const data = await prisma.customer.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        gender: 'MALE',
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaCustomers = data.map((prismaCustomer) => ({
      id: prismaCustomer.id,
      cpf: prismaCustomer.cpf,
      name: prismaCustomer.name,
      socialName: prismaCustomer.socialName,
      gender: prismaCustomer.gender,
      phones: prismaCustomer.phones,
      rgs: prismaCustomer.rgs,
      registered_at: prismaCustomer.registered_at,
      consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
      spending: prismaCustomer.orders.reduce(
        (total, order) => total + Number(order.amount),
        0,
      ),
    }))

    const count = await prisma.customer.count({ where: { gender: 'MALE' } })

    return {
      customers: (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain),
      count,
    }
  }

  async findManyFemale(page: number): Promise<{ customers: Customer[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const data = await prisma.customer.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      where: {
        gender: 'FEMALE',
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaCustomers = data.map((prismaCustomer) => ({
      id: prismaCustomer.id,
      cpf: prismaCustomer.cpf,
      name: prismaCustomer.name,
      socialName: prismaCustomer.socialName,
      gender: prismaCustomer.gender,
      phones: prismaCustomer.phones,
      rgs: prismaCustomer.rgs,
      registered_at: prismaCustomer.registered_at,
      consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
      spending: prismaCustomer.orders.reduce(
        (total, order) => total + Number(order.amount),
        0,
      ),
    }))

    const count = await prisma.customer.count({ where: { gender: 'FEMALE' } })

    return {
      customers: (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain),
      count,
    }
  }

  async findMany(page: number): Promise<{ customers: Customer[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const data = await prisma.customer.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaCustomers = data.map((prismaCustomer) => ({
      id: prismaCustomer.id,
      cpf: prismaCustomer.cpf,
      name: prismaCustomer.name,
      socialName: prismaCustomer.socialName,
      gender: prismaCustomer.gender,
      phones: prismaCustomer.phones,
      rgs: prismaCustomer.rgs,
      registered_at: prismaCustomer.registered_at,
      consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
      spending: prismaCustomer.orders.reduce(
        (total, order) => total + Number(order.amount),
        0,
      ),
    }))

    const count = await prisma.customer.count()

    return {
      customers: (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain),
      count,
    }
  }

  async findTop10CustomersByMostConsumption(): Promise<Customer[]> {
    const data = await prisma.customer.findMany({
      take: 10,
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
      orderBy: {
        registered_at: 'desc',
      },
    })

    const prismaCustomers = data
      .map((prismaCustomer) => ({
        id: prismaCustomer.id,
        cpf: prismaCustomer.cpf,
        name: prismaCustomer.name,
        socialName: prismaCustomer.socialName,
        gender: prismaCustomer.gender,
        phones: prismaCustomer.phones,
        rgs: prismaCustomer.rgs,
        registered_at: prismaCustomer.registered_at,
        consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
        spending: prismaCustomer.orders.reduce(
          (total, order) => total + Number(order.amount),
          0,
        ),
      }))
      .sort((fisrtCustomer, secondCustomer) => {
        return secondCustomer.consumption - fisrtCustomer.consumption
      })

    return (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain)
  }

  async findTop10CustomersByLessConsumption(): Promise<Customer[]> {
    const data = await prisma.customer.findMany({
      take: 10,
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
    })

    const prismaCustomers = data
      .map((prismaCustomer) => ({
        id: prismaCustomer.id,
        cpf: prismaCustomer.cpf,
        name: prismaCustomer.name,
        socialName: prismaCustomer.socialName,
        gender: prismaCustomer.gender,
        phones: prismaCustomer.phones,
        rgs: prismaCustomer.rgs,
        registered_at: prismaCustomer.registered_at,
        consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
        spending: prismaCustomer.orders.reduce(
          (total, order) => total + Number(order.amount),
          0,
        ),
      }))
      .sort((fisrtCustomer, secondCustomer) => {
        return fisrtCustomer.consumption - secondCustomer.consumption
      })

    return (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain)
  }

  async findTop5CustomersByMostSpending(): Promise<Customer[]> {
    const data = await prisma.customer.findMany({
      take: 10,
      include: {
        cpf: true,
        phones: true,
        rgs: true,
        orders: {
          select: {
            amount: true,
          },
        },
      },
    })

    const prismaCustomers = data
      .map((prismaCustomer) => ({
        id: prismaCustomer.id,
        cpf: prismaCustomer.cpf,
        name: prismaCustomer.name,
        socialName: prismaCustomer.socialName,
        gender: prismaCustomer.gender,
        phones: prismaCustomer.phones,
        rgs: prismaCustomer.rgs,
        registered_at: prismaCustomer.registered_at,
        consumption: prismaCustomer.orders.reduce((total) => total + 1, 0),
        spending: prismaCustomer.orders.reduce(
          (total, order) => total + Number(order.amount),
          0,
        ),
      }))
      .sort((fisrtCustomer, secondCustomer) => {
        return secondCustomer.spending - fisrtCustomer.spending
      })

    return (prismaCustomers as PrismaCustomer[]).map(this.mapper.toDomain)
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
        id: customer.id,
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
          create: prismaCustomer.rgs.map((rg) => ({
            value: rg.value,
            issued_at: rg.issued_at,
          })),
        },
        phones: {
          create: prismaCustomer.phones.map((phone) => ({
            number: phone.number,
            code_area: phone.code_area,
          })),
        },
      },
    })
  }

  async addMany(customers: Customer[]): Promise<void> {
    for (const customer of customers) await this.add(customer)
  }

  async update(customer: Customer): Promise<void> {
    const prismaCustomer = this.mapper.toPrisma(customer)

    await prisma.$transaction([
      prisma.rg.deleteMany({ where: { customer_id: customer.id } }),
      prisma.phone.deleteMany({ where: { customer_id: customer.id } }),
      prisma.customer.update({
        data: {
          name: prismaCustomer.name,
          socialName: prismaCustomer.socialName,
          gender: prismaCustomer.gender,
          cpf: {
            update: {
              value: prismaCustomer.cpf.value,
              issued_at: prismaCustomer.cpf.issued_at,
            },
          },
          rgs: {
            create: customer.rgs.map((rg) => ({
              value: rg.value,
              issued_at: rg.issueDate,
            })),
          },
          phones: {
            create: customer.phones.map((phone) => ({
              code_area: phone.codeArea,
              number: phone.number,
            })),
          },
        },
        where: {
          id: customer.id,
        },
      }),
    ])
  }
}
