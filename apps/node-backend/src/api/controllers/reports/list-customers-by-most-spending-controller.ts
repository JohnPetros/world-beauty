import type { IHttp } from '@world-beauty/core/interfaces'
import { ListCustomersByMostSpendingUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '../../../database'

export class ListCustomersByMostSpendingController {
  async handle(http: IHttp) {
    const useCase = new ListCustomersByMostSpendingUseCase(customersRepository)
    const customers = await useCase.execute()

    return http.send(customers)
  }
}
