import type { IHttp } from '@world-beauty/core/interfaces'
import { UpdateProductUseCase } from '@world-beauty/core/use-cases'

import { productsRepository } from '../../../database'
import type { ProductDto } from '@world-beauty/core/dtos'

type RouteParams = {
  ProductId: string
}

type Body = ProductDto

export class UpdateProductController {
  async handle(http: IHttp) {
    const { ProductId } = http.getRouteParams<RouteParams>()
    const ProductDto = http.getBody<Body>()
    const useCase = new UpdateProductUseCase(productsRepository)
    await useCase.execute(ProductDto, ProductId)

    return http.send(null)
  }
}
