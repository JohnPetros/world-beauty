import type { IHttp } from '@world-beauty/core/interfaces'
import { RegisterOrdersUseCase } from '@world-beauty/core/use-cases'

import { ordersRepository } from '../../../database'
import { OrderDto } from '@world-beauty/core/dtos'

type Body = {
  orders: OrderDto[]
}

export class RegisterOrdersController {
  async handle(http: IHttp) {
    const { orders } = http.getBody<Body>()
    const useCase = new RegisterOrdersUseCase(ordersRepository)
    const response = await useCase.execute(orders)

    return http.send(response)
  }
}
