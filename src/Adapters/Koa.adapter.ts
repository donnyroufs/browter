import { IRouteContext, IRouterAdapter } from './IRouterAdapter'
import Router from 'koa-router'

export type KoaFactory = new () => Router

export class KoaToBrowterAdapter implements IRouterAdapter<KoaFactory, Router> {
  public adaptee: KoaFactory
  public router!: Router
  public logExceptions: boolean

  constructor(adaptee: new () => Router, logExceptions: boolean = true) {
    this.adaptee = adaptee
    this.router = new adaptee()
    this.logExceptions = logExceptions
  }

  // TODO: Add Koa type
  // TODO: implement wrapper
  public catchExceptionsWrapper(handler: any) {
    return handler
  }

  // Create a new instance of the router
  // TODO: Becomes the factory
  public create() {
    return new KoaToBrowterAdapter(this.adaptee, this.logExceptions)
  }

  public route({
    verb,
    endpoint,
    middleware,
    routeHandler,
  }: IRouteContext): void {
    const wrappedHandler = this.catchExceptionsWrapper(routeHandler)
    this.router[verb](endpoint, ...middleware, wrappedHandler)
  }

  public use(namespace: string, router: Router): void {
    this.router.prefix(namespace)
    this.router.use(router.routes())
  }

  public build() {
    return this.router.routes()
  }
}
