import type { IHttp } from '@world-beauty/core/interfaces'
import { RegisterProductUseCase } from '@world-beauty/core/use-cases'

import { productsRepository } from '../../../database'
import type { ProductDto } from '@world-beauty/core/dtos'

type Body = ProductDto

export class RegisterProductController {
  async handle(http: IHttp) {
    const productDto = http.getBody<Body>()
    const useCase = new RegisterProductUseCase(productsRepository)
    await useCase.execute(productDto)

    return http.send(null)
  }
}
