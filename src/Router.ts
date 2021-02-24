import { HttpMethod, IBrowter, IBrowterOptions, Middleware } from './Types'
import { Options, DefaultOptions } from './Options'
import { IRouterAdapter } from './Adapters/IRouterAdapter'
import {
  MissingDotInHandlerPath,
  NoControllerException,
  NoMethodHandlerException,
} from './Exceptions'

/**
 * @description
 * Browter adds more juice to the given Router and then
 * returns the created routes in the required type.
 */
export class Browter implements IBrowter {
  private routerAdapter: IRouterAdapter<unknown, unknown>
  private controllers: unknown[] = []
  private options: IBrowterOptions = new Options()

  constructor(
    routerAdapter: IRouterAdapter<unknown, unknown>,
    options?: Partial<IBrowterOptions>
  ) {
    this.routerAdapter = routerAdapter
    this.routerAdapter.create()

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
    callback: (router: Omit<Browter, 'build' | 'routes'>) => void
  ) {
    const route = this.createRouteFromNamespace(namespace)

    const browter = new Browter(
      this.routerAdapter.create() as any,
      this.options
    )

    callback(browter)

    this.routerAdapter.use(route, browter.routerAdapter.router)
  }

  /**
   * @description
   * Returns the actual router based on the used adapter.
   */
  public build() {
    return this.routerAdapter.build()
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
    const [controllerName, handlerName] = this.getControllerAndHandlerName(
      handlerPath
    )
    const routeHandler = this.getRouteHandlerOrThrowException(
      controllerName,
      handlerName
    )

    this.routerAdapter.route({
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

  private getRouteHandlerOrThrowException(
    controllerName: string,
    handlerName: string
  ) {
    const controller = this.getController(this.controllers, controllerName)

    if (!controller) {
      throw new NoControllerException(controllerName)
    }

    const routeHandler = controller[handlerName]

    if (!routeHandler) {
      throw new NoMethodHandlerException(controllerName, handlerName)
    }

    return routeHandler
  }

  /**
   * @param handler
   * String format <controller.routeHandler>
   * @description
   * Parses the handler string and gets  the controller
   * and handler names.
   */
  private getControllerAndHandlerName(handler: string) {
    if (!handler.includes('.')) {
      throw new MissingDotInHandlerPath()
    }

    return handler.split('.') as [string, string]
  }

  private getController(controllers: any, controllerName: string) {
    const result = Object.entries(controllers).find(
      ([name]) => name.toLowerCase() === controllerName.toLowerCase()
    ) as [any, any]

    if (!result) {
      throw new NoControllerException(controllerName)
    }

    return result[1]
  }
}
