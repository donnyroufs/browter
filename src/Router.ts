// TODO: Remove dependency by using adapters
import { Router as ExpressRouter } from 'express'
import {
  MissingDotInHandlerPath,
  NoControllerException,
  NoMethodHandlerException,
} from './Exceptions'
import { HttpMethod, IBrowter, IBrowterOptions, Middleware } from './Types'
import { Options, DefaultOptions } from './Options'

/**
 * @description
 * Browter adds more juice to the given Router and then
 * returns the created routes in the required type.
 */
export class Browter implements IBrowter {
  /**
   * @description
   * Get all the current routes.
   */
  get routes() {
    return this.router.stack
  }

  private router: ExpressRouter
  private expressRouter: typeof ExpressRouter
  private controllers: unknown[] = []
  private options: IBrowterOptions = new Options()

  constructor(options?: Partial<IBrowterOptions>) {
    this.expressRouter = ExpressRouter
    this.router = ExpressRouter()

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
    const browter = new Browter(this.options)

    callback(browter)

    this.router.use(route, browter.router)
  }

  /**
   * @description
   * Returns the actual router based on the used adapter.
   */
  public build() {
    return this.router
  }

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

    this.router[verb](
      endpoint,
      ...middleware,
      this.options.catchExceptionsHandler(
        routeHandler,
        this.options.logExceptions
      )
    )
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
