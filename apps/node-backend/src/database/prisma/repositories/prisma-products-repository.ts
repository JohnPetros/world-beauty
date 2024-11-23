import type { Product } from '@world-beauty/core/entities'
import type { IProductsRepository } from '@world-beauty/core/interfaces'

import { prisma } from '../client'
import { PrismaProductsMapper } from '../mappers'
import { PAGINATION } from '@world-beauty/core/constants'

export class PrismaProductsRepository implements IProductsRepository {
  private readonly mapper = new PrismaProductsMapper()

  async findById(productId: string): Promise<Product | null> {
    const prismaItem = await prisma.orderItem.findUnique({
      include: { _count: { select: { orders: true } } },
      where: { id: productId },
    })

    if (!prismaItem) return null

    return this.mapper.toDomain(prismaItem)
  }

  async findAll(): Promise<Product[]> {
    const prismaProducts = await prisma.orderItem.findMany({
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc' },
    })

    return prismaProducts.map(this.mapper.toDomain)
  }

  async findMany(page: number): Promise<Product[]> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaProducts = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      where: { category: 'PRODUCT' },
      include: { _count: { select: { orders: true } } },
      orderBy: { registered_at: 'desc' },
    })

    return prismaProducts.map(this.mapper.toDomain)
  }

  async findManyByCustomerId(
    page: number,
    customerId: string,
  ): Promise<{ products: Product[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaProducts = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      where: { category: 'PRODUCT', orders: { some: { customer_id: customerId } } },
      include: {
        _count: { select: { orders: { where: { customer_id: customerId } } } },
      },
      orderBy: { registered_at: 'desc' },
    })

    const count = await prisma.orderItem.count({
      where: { category: 'PRODUCT', orders: { some: { customer_id: customerId } } },
    })

    return {
      products: prismaProducts.map(this.mapper.toDomain),
      count,
    }
  }

  async findManyMostConsumedProducts(
    page: number,
  ): Promise<{ products: Product[]; count: number }> {
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaProducts = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      include: { _count: { select: { orders: true } } },
      where: { category: 'PRODUCT' },
      orderBy: [{ orders: { _count: 'desc' } }, { registered_at: 'desc' }],
    })

    const count = await prisma.orderItem.count({ where: { category: 'PRODUCT' } })

    return {
      products: prismaProducts.map(this.mapper.toDomain),
      count,
    }
  }

  async findManyMostConsumedProductsByCustomersGender(
    page: number,
    gender: 'male' | 'female',
  ): Promise<{ products: Product[]; count: number }> {
    const prismaGender = gender === 'male' ? 'MALE' : 'FEMALE'
    const itemsPerPage = PAGINATION.itemsPerPage

    const prismaProducts = await prisma.orderItem.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage,
      include: {
        _count: {
          select: {
            orders: {
              where: { customer: { gender: prismaGender } },
            },
          },
        },
      },
      orderBy: [{ orders: { _count: 'desc' } }, { registered_at: 'desc' }],
      where: {
        category: 'PRODUCT',
        orders: { some: { customer: { gender: prismaGender } } },
      },
    })

    const count = await prisma.orderItem.count({
      where: {
        category: 'PRODUCT',
        orders: { some: { customer: { gender: prismaGender } } },
      },
    })

    return {
      products: prismaProducts
        .map(this.mapper.toDomain)
        .sort(
          (firstProduct, secondProduct) =>
            secondProduct.ordersCount - firstProduct.ordersCount,
        ),
      count,
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
    const prismaProducts = products.map(this.mapper.toPrisma)

    await prisma.orderItem.createMany({
      data: prismaProducts.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        category: 'PRODUCT',
      })),
    })
  }
}
