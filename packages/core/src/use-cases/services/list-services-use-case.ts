import type { IServicesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination-response'

export class ListServicesUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(page: number) {
    const [services, servicesCount] = await Promise.all([
      this.servicesRepository.findMany(page),
      this.servicesRepository.count(),
    ])

    return new PaginationResponse({
      items: services.map((service) => service.dto),
      itemsCount: servicesCount,
    })
  }
}
