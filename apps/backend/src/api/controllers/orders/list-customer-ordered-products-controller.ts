import type { IHttp } from '@world-beauty/core/interfaces'
import { ListCustomerOrderedProductsUseCase } from '@world-beauty/core/use-cases'

import { ordersRepository } from '../../../database'

type QueryParams = {
  page: number
}

export class ListCustomersOrderedProductsController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const useCase = new ListCustomerOrderedProductsUseCase(ordersRepository)
    const response = await useCase.execute(page)

    return http.send(response)
  }
}
