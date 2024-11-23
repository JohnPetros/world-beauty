import type { FastifyInstance } from 'fastify'

import {
  DeleteServicesController,
  ListServicesController,
  RegisterServiceController,
  UpdateServiceController,
} from '../../../api/controllers'
import { FastifyHttp } from '../fastify-http'

export const ServicesRoutes = async (app: FastifyInstance) => {
  const registerServiceController = new RegisterServiceController()
  const listServiceController = new ListServicesController()
  const deleteServicesController = new DeleteServicesController()
  const updateServiceController = new UpdateServiceController()

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listServiceController.handle(http)
  })

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerServiceController.handle(http)
  })

  app.put('/:serviceId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateServiceController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteServicesController.handle(http)
  })
}
