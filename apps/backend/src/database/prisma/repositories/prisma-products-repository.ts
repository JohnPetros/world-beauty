import { Prisma } from '@prisma/client'

import type { Product } from '@world-beauty/core/entities'
import type { IProductsRepository } from '@world-beauty/core/interfaces'

import { prisma } from '../client'
import { PrismaProductsMapper } from '../mappers'
import type { PrismaProduct } from '../types'
import { PAGINATION } from '@world-beauty/core/constants'

export class PrismaProductsRepository implements IProductsRepository {
  private readonly mapper = new PrismaProductsMapper()

  async findAll(): Promise<Product[]> {
    const prismaItems = await prisma.$queryRaw<PrismaProduct[]>`
      SELECT I.*, COUNT(O.id) orders_count FROM order_items I
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'PRODUCT'
      GROUP BY I.id
      ORDER BY registered_at DESC
    `
    return prismaItems.map(this.mapper.toDomain)
  }

  async findMany(page: number): Promise<Product[]> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1})`

    const prismaItems = await prisma.$queryRaw<PrismaProduct[]>`
      SELECT I.*, COUNT(O.id) orders_count FROM order_items I
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'PRODUCT'
      GROUP BY I.id
      ORDER BY registered_at DESC
      ${paginationQuery}
    `

    return prismaItems.map(this.mapper.toDomain)
  }

  async findManyByCustomerId(
    page: number,
    customerId: string,
  ): Promise<{ products: Product[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1})`

    const prismaItems = await prisma.$queryRaw<PrismaProduct[]>`
      SELECT I.*, COUNT  
      FROM order_items I
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'PRODUCT' AND customer_id = ${customerId}
      ORDER BY registered_at DESC
      GROUP BY I.id
      ${paginationQuery}
    `

    const count = await prisma.$queryRaw<{ count: number }[]>`
      SELECT COUNT(I.id)
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'PRODUCT' AND customer_id = ${customerId}
    `

    return {
      products: prismaItems.map(this.mapper.toDomain),
      count: count[0].count,
    }
  }

  async findManyMostConsumedProducts(
    page: number,
  ): Promise<{ products: Product[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1})`

    const prismaItems = await prisma.$queryRaw<PrismaProduct[]>`
      SELECT I.*, COUNT(O.id) 
      FROM order_items I
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'PRODUCT'
      GROUP BY I.id
      ORDER BY COUNT(O.id) DESC
      ${paginationQuery}
    `

    const count = await prisma.$queryRaw<{ count: number }[]>`
      SELECT COUNT(I.id)
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'PRODUCT'
    `

    return {
      products: prismaItems.map(this.mapper.toDomain),
      count: count[0].count,
    }
  }

  async findManyMostConsumedProductsByCustomersGender(
    page: number,
    gender: 'male' | 'female',
  ): Promise<{ products: Product[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage
    const paginationQuery = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * (${page - 1})`

    const prismaItems = await prisma.$queryRaw<PrismaProduct[]>`
      SELECT I.*, COUNT(O.id) 
      FROM order_items I
      LEFT JOIN orders O ON O.item_id = I.id
      LEFT JOIN customers C ON O.customer_id = C.id
      WHERE category = 'PRODUCT' AND C.gender = ${gender}
      GROUP BY I.id
      ORDER BY COUNT(O.id) DESC
      ${paginationQuery}
    `

    const count = await prisma.$queryRaw<{ count: number }[]>`
      SELECT COUNT(I.id)
      LEFT JOIN orders O ON O.item_id = I.id
      WHERE category = 'PRODUCT'
    `

    return {
      products: prismaItems.map(this.mapper.toDomain),
      count: count[0].count,
    }
  }

  async removeAll(): Promise<void> {
    await prisma.orderItem.deleteMany({ where: { category: 'PRODUCT' } })
  }

  async removeMany(productsIds: string[]): Promise<void> {
    await prisma.orderItem.deleteMany({ where: { id: { in: productsIds } } })
  }

  async count(): Promise<number> {
    return await prisma.orderItem.count({ where: { category: 'PRODUCT' } })
  }

  async update(product: Product): Promise<void> {
    await prisma.orderItem.update({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        category: 'PRODUCT',
      },
      where: {
        id: product.id,
      },
    })
  }

  async add(product: Product): Promise<void> {
    await prisma.orderItem.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: 'PRODUCT',
      },
    })
  }

  async addMany(products: Product[]): Promise<void> {
    const prismaItems = products.map(this.mapper.toPrisma)

    await prisma.orderItem.createMany({
      data: prismaItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        category: 'PRODUCT',
      })),
    })
  }
}
