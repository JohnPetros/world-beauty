export interface IHttp {
  getBody<Body>(): Body
  getRouteParams<RouteParams>(): RouteParams
  getQueryParams<QueryParams>(): QueryParams
  getCurrentRoute(): string
  setHeader(key: string, value: string): void
  send(data: unknown, statusCode?: number): unknown
}
