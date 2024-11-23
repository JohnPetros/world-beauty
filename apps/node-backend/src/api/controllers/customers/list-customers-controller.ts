import type { IHttp } from '@world-beauty/core/interfaces'
import { ListCustomersUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '../../../database'

type QueryParams = {
  page: number
}

export class ListCustomersController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const useCase = new ListCustomersUseCase(customersRepository)
    const response = await useCase.execute(page)

    return http.send(response)
  }
}
