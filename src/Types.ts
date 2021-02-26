import { CatchExceptionsHandler } from './CatchExceptionsHandler'

export type Middleware = any

export type RouteHandler = (
  endpoint: string,
  handler: string,
  middleware?: Middleware[]
) => void

export type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'head'
  | 'all'

export type GroupCallbackFn = (router: IBrowter) => void
export type createRoutesCallbackFn = (router: IBrowter) => any

export type IBrowter = Record<
  HttpMethod,
  (endpoint: string, handlerPath: string, middleware?: Middleware[]) => void
> & {
  build: () => unknown
}

// TODO: Could become troublesome when moving to adapters
export interface IBrowterOptions {
  controllersDir: string
}
