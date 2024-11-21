import { Prisma } from '@prisma/client'

import type { Service } from '@world-beauty/core/entities'
import type { IServicesRepository } from '@world-beauty/core/interfaces'

import { prisma } from '../client'
import { PrismaServicesMapper } from '../mappers'
import type { PrismaService } from '../types'
import { PAGINATION } from '@world-beauty/core/constants'

const servicesQuery = Prisma.sql`
  SELECT I.*, COUNT(O.id) orders_count FROM order_items I
  LEFT JOIN orders O ON O.item_id = I.id
  WHERE category = 'Service'
  ORDER BY registered_at DESC
`

export class PrismaServicesRepository implements IServicesRepository {
  private readonly mapper = new PrismaServicesMapper()

  async findAll(): Promise<Service[]> {
    const prismaItems = await prisma.$queryRaw<PrismaService[]>`${servicesQuery}`
    return prismaItems.map(this.mapper.toDomain)
  }

  async findMany(page: number): Promise<Service[]> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1})`

    const prismaItems = await prisma.$queryRaw<
      PrismaService[]
    >`${servicesQuery} ${paginationQuery}`
    return prismaItems.map(this.mapper.toDomain)
  }

  async findManyByCustomerId(
    page: number,
    customerId: string,
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1})`

    const prismaItems = await prisma.$queryRaw<PrismaService[]>`
      SELECT I.*, COUNT  
      FROM order_items I
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'Service' AND customer_id = ${customerId}
      ORDER BY registered_at DESC
      GROUPY BY I.*
      ${paginationQuery}
    `

    const count = await prisma.$queryRaw<{ count: number }[]>`
      SELECT COUNT(I.id)
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'Service' AND customer_id = ${customerId}
    `

    return {
      services: prismaItems.map(this.mapper.toDomain),
      count: count[0].count,
    }
  }

  async findManyMostConsumedServices(
    page: number,
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1})`

    const prismaItems = await prisma.$queryRaw<PrismaService[]>`
      SELECT I.*, COUNT(O.id) 
      FROM order_items I
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'SERVICE'
      GROUPY BY I.*
      ORDER BY COUNT(O.id) DESC
      ${paginationQuery}
    `

    const count = await prisma.$queryRaw<{ count: number }[]>`
      SELECT COUNT(I.id)
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'Service'
    `

    return {
      services: prismaItems.map(this.mapper.toDomain),
      count: count[0].count,
    }
  }

  async findManyMostConsumedServicesByCustomersGender(
    page: number,
    gender: 'male' | 'female',
  ): Promise<{ services: Service[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1})`

    const prismaItems = await prisma.$queryRaw<PrismaService[]>`
      SELECT I.*, COUNT(O.id) 
      FROM order_items I
      LEFT JOIN orders O ON O.item_id = I.id
      LEFT JOIN customers C ON O.customer_id = C.id
      WHERE category = 'SERVICE' AND C.gender = ${gender}
      GROUPY BY I.*
      ORDER BY COUNT(O.id) DESC
      ${paginationQuery}
    `

    const count = await prisma.$queryRaw<{ count: number }[]>`
      SELECT COUNT(I.id)
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'Service'
    `

    return {
      services: prismaItems.map(this.mapper.toDomain),
      count: count[0].count,
    }
  }

  async removeAll(): Promise<void> {
    await prisma.orderItem.deleteMany({ where: { category: 'SERVICE' } })
  }

  async removeMany(ServicesIds: string[]): Promise<void> {
    await prisma.orderItem.deleteMany({ where: { id: { in: ServicesIds } } })
  }

  async count(): Promise<number> {
    return await prisma.orderItem.count()
  }

  async update(service: Service): Promise<void> {
    await prisma.orderItem.update({
      data: {
        name: service.name,
        price: service.price,
        description: service.description,
        category: 'SERVICE',
      },
      where: {
        id: service.id,
      },
    })
  }

  async add(service: Service): Promise<void> {
    await prisma.orderItem.create({
      data: {
        name: service.name,
        price: service.price,
        description: service.description,
        category: 'SERVICE',
      },
    })
  }

  async addMany(services: Service[]): Promise<void> {
    const prismaItems = services.map(this.mapper.toPrisma)

    await prisma.orderItem.createMany({
      data: prismaItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        category: 'SERVICE',
      })),
    })
  }
}
