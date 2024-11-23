import type { IHttp } from '@world-beauty/core/interfaces'
import { UpdateServiceUseCase } from '@world-beauty/core/use-cases'

import { servicesRepository } from '../../../database'
import type { ServiceDto } from '@world-beauty/core/dtos'

type RouteParams = {
  serviceId: string
}

type Body = ServiceDto

export class UpdateServiceController {
  async handle(http: IHttp) {
    const { serviceId } = http.getRouteParams<RouteParams>()
    const serviceDto = http.getBody<Body>()
    const useCase = new UpdateServiceUseCase(servicesRepository)
    await useCase.execute(serviceDto, serviceId)

    return http.send(null)
  }
}
