import type { FastifyReply, FastifyRequest } from 'fastify'

import type { IHttp } from '@world-beauty/core/interfaces'
import { HTTP_STATUS_CODE } from '@world-beauty/core/constants'

export class FastifyHttp implements IHttp {
  constructor(
    private readonly request: FastifyRequest,
    private readonly reply: FastifyReply,
  ) {}

  send(response: unknown, statusCode = HTTP_STATUS_CODE.ok) {
    return this.reply.status(statusCode).send(response)
  }

  redirect(route: string) {
    return this.reply.redirect(route)
  }

  getCurrentRoute(): string {
    return this.request.originalUrl
  }

  setHeader(key: string, value: string): void {
    this.reply.header(key, value)
  }

  getBody<Body>(): Body {
    return this.request.body as Body
  }

  getRouteParams<RouteParams>(): RouteParams {
    return this.request.params as RouteParams
  }

  getQueryParams<QueryParams>(): QueryParams {
    return this.request.query as QueryParams
  }
}
