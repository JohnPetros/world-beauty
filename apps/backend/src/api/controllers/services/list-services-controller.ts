import type { IHttp } from '@world-beauty/core/interfaces'
import { ListServicesUseCase } from '@world-beauty/core/use-cases'

import { servicesRepository } from '../../../database'

type QueryParams = {
  page: number
}

export class ListServicesController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const useCase = new ListServicesUseCase(servicesRepository)
    const response = await useCase.execute(page)

    return http.send(response)
  }
}
