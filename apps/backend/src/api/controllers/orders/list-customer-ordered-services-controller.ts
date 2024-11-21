import type { IHttp } from '@world-beauty/core/interfaces'
import { ListCustomerOrderedservicesUseCase } from '@world-beauty/core/use-cases'

import { servicesRepository } from '../../../database'

type QueryParams = {
  page: number
}

type RouteParams = {
  customerId: string
}

export class ListCustomersOrderedServicesController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const { customerId } = http.getRouteParams<RouteParams>()
    const useCase = new ListCustomerOrderedServicesUseCase(servicesRepository)
    const response = await useCase.execute(customerId, page)

    return http.send(response)
  }
}
