import type { IHttp } from '@world-beauty/core/interfaces'
import { ListProductsUseCase } from '@world-beauty/core/use-cases'

import { productsRepository } from '../../../database'

type QueryParams = {
  page: number
}

export class ListProductsController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const useCase = new ListProductsUseCase(productsRepository)
    const response = await useCase.execute(page)

    return http.send(response)
  }
}
