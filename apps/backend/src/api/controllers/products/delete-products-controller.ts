import type { IHttp } from '@world-beauty/core/interfaces'
import { DeleteProductsUseCase } from '@world-beauty/core/use-cases'

import { productsRepository } from '../../../database'

type Body = {
  ProductsIds: string[]
}

export class DeleteProductsController {
  async handle(http: IHttp) {
    const { ProductsIds } = http.getBody<Body>()
    const useCase = new DeleteProductsUseCase(productsRepository)
    await useCase.execute(ProductsIds)

    return http.send(null)
  }
}
