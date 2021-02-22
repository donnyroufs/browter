// TODO: Remove dependency by using adapters
import { Router as ExpressRouter } from 'express'

import { getController } from './GetController'
import {
  MissingDotInHandlerPath,
  NoControllerException,
  NoMethodHandlerException,
} from './Exceptions'
import { HttpMethod, IBrowter, IBrowterOptions, Middleware } from './Types'
import { CatchExceptionsHandler } from './CatchExceptionsHandler'
import { DefaultOptions } from './DefaultOptions'

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
  private controllersDir: string
  private catchExceptionsHandler: typeof CatchExceptionsHandler

  constructor(
    expressRouter: typeof ExpressRouter,
    options: IBrowterOptions = DefaultOptions
  ) {
    this.validateOptions(options)

    this.expressRouter = expressRouter
    this.router = expressRouter()
    // TODO: Fix types
    this.controllers = require(options.controllersDir!)
    this.controllersDir = options.controllersDir!
    this.catchExceptionsHandler = options.catchExceptionsHandler!
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
    const browter = new Browter(this.expressRouter, {
      controllersDir: this.controllersDir,
      catchExceptionsHandler: this.catchExceptionsHandler,
    })

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

    this.router[verb](endpoint, ...middleware, routeHandler)
  }

  private createRouteFromNamespace(namespace: string) {
    return namespace.charAt(0) === '/' ? namespace : `/${namespace}`
  }

  private getRouteHandlerOrThrowException(
    controllerName: string,
    handlerName: string
  ) {
    const controller = getController(this.controllers, controllerName)

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

  private validateOptions(options: IBrowterOptions) {
    if (!options.controllersDir) {
      options.controllersDir = DefaultOptions.controllersDir
    }

    if (!options.catchExceptionsHandler) {
      DefaultOptions.catchExceptionsHandler
    }
  }
}
