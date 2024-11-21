import type { IHttp } from '@world-beauty/core/interfaces'
import { RegisterCustomerUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '../../../database'
import type { CustomerDto } from '@world-beauty/core/dtos'

type Body = CustomerDto

export class RegisterCustomerController {
  async handle(http: IHttp) {
    const customerDto = http.getBody<Body>()
    const useCase = new RegisterCustomerUseCase(customersRepository)
    await useCase.execute(customerDto)

    return http.send(null)
  }
}
