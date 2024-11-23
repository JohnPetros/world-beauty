import type { IHttp } from '@world-beauty/core/interfaces'
import { ListCustomersByGenderUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '../../../database'

type RouteParams = {
  gender: 'male' | 'female'
}

type QueryParams = {
  page: number
}

export class ListCustomersByGenderController {
  async handle(http: IHttp) {
    const { gender } = http.getRouteParams<RouteParams>()
    const { page } = http.getQueryParams<QueryParams>()
    const useCase = new ListCustomersByGenderUseCase(customersRepository)
    const response = await useCase.execute(gender, page)

    return http.send(response)
  }
}
