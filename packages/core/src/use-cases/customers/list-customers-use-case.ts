import type { ICustomersRepository } from '../../interfaces/repositories'
import { PaginationResponse } from '../../responses/pagination'

export class ListCustomersUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(page: number) {
    const [customers, customersCount] = await Promise.all([
      this.customersRepository.findAllPaginated(page),
      this.customersRepository.count(),
    ])

    return new PaginationResponse({ items: customers, itemsCount: customersCount })
  }
}
