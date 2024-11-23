import type { IHttp } from '@world-beauty/core/interfaces'
import type { Gender } from '@world-beauty/core/types'
import {
  ListMostConsumedProductsByFemaleCustomersUseCase,
  ListMostConsumedProductsByMaleCustomersUseCase,
  ListMostConsumedProductsUseCase,
} from '@world-beauty/core/use-cases'

import { productsRepository } from '../../../database'

type QueryParams = {
  page: number
  gender?: Gender
}

export class ListMostConsumedProductsController {
  async handle(http: IHttp) {
    const { page, gender } = http.getQueryParams<QueryParams>()

    switch (gender) {
      case 'male': {
        const useCase = new ListMostConsumedProductsByMaleCustomersUseCase(
          productsRepository,
        )
        const response = await useCase.execute(page)
        return http.send(response)
      }
      case 'female': {
        const useCase = new ListMostConsumedProductsByFemaleCustomersUseCase(
          productsRepository,
        )
        const response = await useCase.execute(page)
        return http.send(response)
      }
      default: {
        const useCase = new ListMostConsumedProductsUseCase(productsRepository)
        const customers = await useCase.execute(page)
        return http.send(customers)
      }
    }
  }
}
