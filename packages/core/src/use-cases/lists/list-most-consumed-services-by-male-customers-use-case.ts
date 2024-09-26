import type { IServicesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListMostConsumedServicesByMaleCustomersUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(page: number) {
    const { services, count } =
    await this.servicesRepository.findManyMostConsumedServicesByCustomersGender(page, 'male')

    return new PaginationResponse({
      items: services.map((service) => service.dto),
      itemsCount: count,
    })
  }
}
