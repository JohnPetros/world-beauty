import type { Service } from '@world-beauty/core/entities'
import type { IServicesRepository } from '@world-beauty/core/interfaces'

import { prisma } from '../client'
import { PrismaServicesMapper } from '../mappers'
import { PAGINATION } from '@world-beauty/core/constants'

export class PrismaServicesRepository implements IServicesRepository {
  private readonly mapper = new PrismaServicesMapper()

  async findById(ServiceId: string): Promise<Service | null> {
    const prismaItem = await prisma.orderItem.findUnique({
      include: { _count: { select: { orders: true } } },
      where: { id: ServiceId },
    })

    if (!prismaItem) return null

    return this.mapper.toDomain(prismaItem)
  }

  async findAll(): Promise<Service[]> {
    const prismaServices = await prisma.orderItem.findMany({
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc' },
    })

    return prismaServices.map(this.mapper.toDomain)
  }

  async findMany(page: number): Promise<Service[]> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaServices = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      where: { category: 'SERVICE' },
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc' },
    })

    return prismaServices.map(this.mapper.toDomain)
  }

  async findManyByCustomerId(
    page: number,
    customerId: string,
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaServices = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      where: { category: 'SERVICE', orders: { every: { customer_id: customerId } } },
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc' },
    })

    const count = await prisma.orderItem.count({ where: { category: 'SERVICE' } })

    return {
      services: prismaServices.map(this.mapper.toDomain),
      count,
    }
  }

  async findManyMostConsumedServices(
    page: number,
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaServices = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc', orders: { _count: 'desc' } },
    })

    const count = await prisma.orderItem.count({ where: { category: 'SERVICE' } })

    return {
      services: prismaServices.map(this.mapper.toDomain),
      count,
    }
  }

  async findManyMostConsumedServicesByCustomersGender(
    page: number,
    gender: 'male' | 'female',
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaServices = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc', orders: { _count: 'desc' } },
      where: {
        orders: {
          every: { customer: { gender: gender === 'male' ? 'MALE' : 'FEMALE' } },
        },
      },
    })

    const count = await prisma.orderItem.count({
      where: {
        category: 'SERVICE',
        orders: {
          every: { customer: { gender: gender === 'male' ? 'MALE' : 'FEMALE' } },
        },
      },
    })

    return {
      services: prismaServices.map(this.mapper.toDomain),
      count,
    }
  }

  async removeAll(): Promise<void> {
    await prisma.orderItem.deleteMany({ where: { category: 'SERVICE' } })
  }

  async removeMany(ServicesIds: string[]): Promise<void> {
    await prisma.orderItem.deleteMany({ where: { id: { in: ServicesIds } } })
  }

  async count(): Promise<number> {
    return await prisma.orderItem.count({ where: { category: 'SERVICE' } })
  }

  async update(Service: Service): Promise<void> {
    await prisma.orderItem.update({
      data: {
        name: Service.name,
        price: Service.price,
        description: Service.description,
        category: 'SERVICE',
      },
      where: {
        id: Service.id,
      },
    })
  }

  async add(Service: Service): Promise<void> {
    await prisma.orderItem.create({
      data: {
        id: Service.id,
        name: Service.name,
        price: Service.price,
        description: Service.description,
        category: 'SERVICE',
      },
    })
  }

  async addMany(Services: Service[]): Promise<void> {
    const prismaServices = Services.map(this.mapper.toPrisma)

    await prisma.orderItem.createMany({
      data: prismaServices.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        category: 'SERVICE',
      })),
    })
  }
}
