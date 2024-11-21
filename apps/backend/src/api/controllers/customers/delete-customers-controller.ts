import { customersRepository } from '../../../database'
import type { IHttp } from '@world-beauty/core/interfaces'
import { DeleteCustomersUseCase } from '@world-beauty/core/use-cases'

type Body = {
  customersIds: string[]
}

export class DeleteCustomersController {
  async handle(http: IHttp) {
    const { customersIds } = http.getBody<Body>()
    const useCase = new DeleteCustomersUseCase(customersRepository)
    await useCase.execute(customersIds)

    return http.send(null)
  }
}
