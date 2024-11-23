import type { IHttp } from '@world-beauty/core/interfaces'
import type { Gender } from '@world-beauty/core/types'
import {
  ListMostConsumedServicesByFemaleCustomersUseCase,
  ListMostConsumedServicesByMaleCustomersUseCase,
  ListMostConsumedServicesUseCase,
} from '@world-beauty/core/use-cases'

import { servicesRepository } from '../../../database'

type QueryParams = {
  page: number
  gender?: Gender
}

export class ListMostConsumedServicesController {
  async handle(http: IHttp) {
    const { page, gender } = http.getQueryParams<QueryParams>()

    switch (gender) {
      case 'male': {
        const useCase = new ListMostConsumedServicesByMaleCustomersUseCase(
          servicesRepository,
        )
        const response = await useCase.execute(page)
        return http.send(response)
      }
      case 'female': {
        const useCase = new ListMostConsumedServicesByFemaleCustomersUseCase(
          servicesRepository,
        )
        const response = await useCase.execute(page)
        return http.send(response)
      }
      default: {
        const useCase = new ListMostConsumedServicesUseCase(servicesRepository)
        const customers = await useCase.execute(page)
        return http.send(customers)
      }
    }
  }
}
