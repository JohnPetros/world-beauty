import type { FastifyInstance } from 'fastify'

import {
  DeleteCustomersController,
  ListCustomersController,
  RegisterCustomerController,
  UpdateCustomerController,
} from '../../../api/controllers'
import { FastifyHttp } from '../fastify-http'

export const CustomersRoutes = async (app: FastifyInstance) => {
  const registerCustomerController = new RegisterCustomerController()
  const listCustomerController = new ListCustomersController()
  const deleteCustomerController = new DeleteCustomersController()
  const updateCustomerController = new UpdateCustomerController()

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listCustomerController.handle(http)
  })

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerCustomerController.handle(http)
  })

  app.put('/:customerId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateCustomerController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteCustomerController.handle(http)
  })
}
