import type { IHttp } from '@world-beauty/core/interfaces'
import { UpdateProductUseCase } from '@world-beauty/core/use-cases'

import { productsRepository } from '../../../database'
import type { ProductDto } from '@world-beauty/core/dtos'

type RouteParams = {
  productId: string
}

type Body = Partial<ProductDto>

export class UpdateProductController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const productDto = http.getBody<Body>()
    const useCase = new UpdateProductUseCase(productsRepository)
    await useCase.execute(productDto, productId)

    return http.send(null)
  }
}
