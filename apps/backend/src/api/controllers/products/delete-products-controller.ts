import type { IHttp } from '@world-beauty/core/interfaces'
import { DeleteProductsUseCase } from '@world-beauty/core/use-cases'

import { productsRepository } from '../../../database'

type Body = {
  productsIds: string[]
}

export class DeleteProductsController {
  async handle(http: IHttp) {
    const { productsIds } = http.getBody<Body>()
    const useCase = new DeleteProductsUseCase(productsRepository)
    await useCase.execute(productsIds)

    return http.send(null)
  }
}
