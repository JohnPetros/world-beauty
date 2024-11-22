import { Product } from '@world-beauty/core/entities'

import type { PrismaProduct } from '../types'
import type { Decimal } from '@prisma/client/runtime/library'

export class PrismaProductsMapper {
  toDomain(prismaProduct: PrismaProduct): Product {
    return Product.create({
      id: prismaProduct.id,
      name: prismaProduct.name,
      category: 'product',
      price: Number(prismaProduct.price),
      description: prismaProduct.description,
      ordersCount: Number(prismaProduct.orders_count),
    })
  }

  toPrisma(product: Product): PrismaProduct {
    return {
      id: product.id,
      name: product.name,
      category: 'PRODUCT',
      price: product.price as unknown as Decimal,
      description: product.description,
      orders_count: product.ordersCount,
      registered_at: new Date(),
    }
  }
}
