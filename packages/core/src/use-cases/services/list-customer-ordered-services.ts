import type { ICustomersRepository, IServicesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination-response'

export class ListCustomerOrderedservicesUseCase {
  constructor(
    private readonly servicesRepository: IServicesRepository,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute(customerId: string, page: number) {
    const customer = await this.customersRepository.findById(customerId)
    if (!customer) throw new Error('Cliente não encontrado')

    const { services, count } = await this.servicesRepository.findManyByCustomerId(
      page,
      customerId,
    )

    return new PaginationResponse({
      items: services.map((service) => service.dto),
      itemsCount: count,
    })
  }
}
