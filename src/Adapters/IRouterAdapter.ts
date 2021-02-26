import { HttpMethod, Middleware } from '../Types'

export interface IRouteContext {
  verb: HttpMethod
  endpoint: string
  handlerPath: string
  middleware: Middleware[]
  routeHandler: any
}

export interface IRouterAdapter {
  adaptee: unknown
  router: unknown
  logExceptions: boolean

  use(namespace: string, router: unknown): void
  route(context: IRouteContext): void
  create(): void
  build(): unknown
  catchExceptionsWrapper(handler: unknown): Function
}
