import type { FastifyInstance } from 'fastify'

import {} from '../../../api/controllers'
import { FastifyHttp } from '../fastify-http'
import {
  ListCustomersOrderedProductsController,
  ListCustomersOrderedServicesController,
  RegisterOrdersController,
} from 'src/api/controllers/orders'

export const OrdersRoutes = async (app: FastifyInstance) => {
  const registerOrderController = new RegisterOrdersController()
  const listCustomersOrderedProductsController =
    new ListCustomersOrderedProductsController()
  const listCustomersOrderedServicesController =
    new ListCustomersOrderedServicesController()

  app.get('/:customerId/products', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listCustomersOrderedProductsController.handle(http)
  })

  app.get('/:customerId/services', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listCustomersOrderedServicesController.handle(http)
  })

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerOrderController.handle(http)
  })
}
