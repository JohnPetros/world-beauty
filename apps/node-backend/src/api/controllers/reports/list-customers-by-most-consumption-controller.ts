import type { IHttp } from '@world-beauty/core/interfaces'
import { ListCustomersByMostConsumptionUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '../../../database'

export class ListCustomersByMostConsumptionController {
  async handle(http: IHttp) {
    const useCase = new ListCustomersByMostConsumptionUseCase(customersRepository)
    const customers = await useCase.execute()

    return http.send(customers)
  }
}
