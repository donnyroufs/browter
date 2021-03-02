import { HttpMethod, IBrowter, IBrowterOptions, Middleware } from './Types'
import { Options, DefaultOptions } from './Options'
import { IRouterAdapter } from './IRouterAdapter'
import { BindController } from './BindController'

/**
 * @description
 * Browter adds more juice to the given Router and then
 * returns the created routes in the required type.
 */
export class Browter<T> implements IBrowter {
  public readonly router: IRouterAdapter

  private readonly controllers: unknown[] = []
  private readonly options: IBrowterOptions = new Options()
  private readonly bindController: BindController = new BindController()

  constructor(
    routerAdapter: IRouterAdapter,
    options?: Partial<IBrowterOptions>
  ) {
    this.router = routerAdapter

    this.options = new Options({ ...DefaultOptions, ...options })
    this.controllers = require(this.options.controllersDir)
  }

  /**
   *
   * @param namespace
   * namespace will also be used to find the given controller. e.g "Users" will
   * try to find a controller named "UsersController".
   * @param callback
   * Returns a new instance of Browter which allows you to group
   * routes and or nest routes.
   */
  public group(
    namespace: string,
    callback: (router: Omit<Browter<T>, 'build' | 'router'>) => void
  ) {
    const route = this.createRouteFromNamespace(namespace)

    const browter = new Browter(
      this.router.create() as any,
      this.options
    ) as Omit<Browter<T>, 'build'>

    callback(browter)

    this.router.use(route, browter.router.router)
  }

  /**
   * @description
   * Returns the actual router based on the used adapter.
   */
  public build() {
    return this.router.build() as T
  }

  //#region router methods
  public get(endpoint: string, handlerPath: string, middleware?: Middleware[]) {
    this.setHandlerAndMiddlewareForVerb(
      'get',
      endpoint,
      handlerPath,
      middleware
    )
  }

  public post(
    endpoint: string,
    handlerPath: string,
    middleware?: Middleware[]
  ) {
    this.setHandlerAndMiddlewareForVerb(
      'post',
      endpoint,
      handlerPath,
      middleware
    )
  }

  public put(endpoint: string, handlerPath: string, middleware?: Middleware[]) {
    this.setHandlerAndMiddlewareForVerb(
      'put',
      endpoint,
      handlerPath,
      middleware
    )
  }

  public patch(
    endpoint: string,
    handlerPath: string,
    middleware?: Middleware[]
  ) {
    this.setHandlerAndMiddlewareForVerb(
      'patch',
      endpoint,
      handlerPath,
      middleware
    )
  }

  public delete(
    endpoint: string,
    handlerPath: string,
    middleware?: Middleware[]
  ) {
    this.setHandlerAndMiddlewareForVerb(
      'delete',
      endpoint,
      handlerPath,
      middleware
    )
  }

  // Not sure if this behaves the same?
  public head(
    endpoint: string,
    handlerPath: string,
    middleware?: Middleware[]
  ) {
    this.setHandlerAndMiddlewareForVerb(
      'head',
      endpoint,
      handlerPath,
      middleware
    )
  }

  public all(endpoint: string, handlerName: string, middleware?: Middleware[]) {
    this.setHandlerAndMiddlewareForVerb(
      'all',
      endpoint,
      handlerName,
      middleware
    )
  }
  //#endregion

  private setHandlerAndMiddlewareForVerb(
    verb: HttpMethod,
    endpoint: string,
    handlerPath: string,
    middleware: Middleware[] = []
  ) {
    const [
      controllerName,
      handlerName,
    ] = this.bindController.getControllerAndHandlerName(handlerPath)

    const routeHandler = this.bindController.getRouteHandlerOrThrow({
      controllerName,
      handlerName,
      controllers: this.controllers,
    })

    this.router.route({
      verb,
      endpoint,
      middleware,
      routeHandler,
      handlerPath,
    })
  }

  private createRouteFromNamespace(namespace: string) {
    return namespace.charAt(0) === '/' ? namespace : `/${namespace}`
  }
}
