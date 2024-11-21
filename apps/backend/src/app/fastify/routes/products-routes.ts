import type { FastifyInstance } from 'fastify'

import {
  DeleteProductsController,
  ListProductsController,
  RegisterProductController,
  UpdateProductController,
} from '../../../api/controllers'
import { FastifyHttp } from '../fastify-http'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const registerProductController = new RegisterProductController()
  const listProductController = new ListProductsController()
  const deleteProductController = new DeleteProductsController()
  const updateProductController = new UpdateProductController()

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listProductController.handle(http)
  })

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerProductController.handle(http)
  })

  app.put('/:productId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateProductController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteProductController.handle(http)
  })
}
