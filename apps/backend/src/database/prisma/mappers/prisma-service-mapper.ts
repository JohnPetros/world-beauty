import { Service } from '@world-beauty/core/entities'

import type { PrismaService } from '../types'
import type { Decimal } from '@prisma/client/runtime/library'

export class PrismaServicesMapper {
  toDomain(prismaService: PrismaService): Service {
    return Service.create({
      id: prismaService.id,
      name: prismaService.name,
      category: 'service',
      price: Number(prismaService.price),
      description: prismaService.description,
      ordersCount: prismaService._count.orders,
    })
  }

  toPrisma(service: Service): PrismaService {
    return {
      id: service.id,
      name: service.name,
      category: 'SERVICE',
      price: service.price as unknown as Decimal,
      description: service.description,
      registered_at: new Date(),
      _count: { orders: service.ordersCount },
    }
  }
}
