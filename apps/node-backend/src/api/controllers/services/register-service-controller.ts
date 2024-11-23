import type { IHttp } from '@world-beauty/core/interfaces'
import { RegisterServiceUseCase } from '@world-beauty/core/use-cases'

import { servicesRepository } from '../../../database'
import type { ServiceDto } from '@world-beauty/core/dtos'

type Body = ServiceDto

export class RegisterServiceController {
  async handle(http: IHttp) {
    const serviceDto = http.getBody<Body>()
    const useCase = new RegisterServiceUseCase(servicesRepository)
    await useCase.execute(serviceDto)

    return http.send(null)
  }
}
