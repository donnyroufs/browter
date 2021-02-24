import { IRouteContext, IRouterAdapter } from './IRouterAdapter'
import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express-serve-static-core'

export type ExpressRouterFactory = () => Router

export class ExpressToBrowterAdapter
  implements IRouterAdapter<ExpressRouterFactory, Router> {
  public adaptee: ExpressRouterFactory
  public router: Router
  public logExceptions: boolean

  /**
   *
   * @param adaptee router that has to be adapted to Browters API
   */
  constructor(adaptee: () => Router, logExceptions: boolean = true) {
    this.adaptee = adaptee
    this.router = this.adaptee()
    this.logExceptions = logExceptions
  }

  /**
   * @description
   * Browter will use this to map the handlers to the desired endpoints
   */
  public route({
    verb,
    endpoint,
    middleware,
    routeHandler,
  }: IRouteContext): void {
    const wrappedHandler = this.catchExceptionsWrapper(routeHandler)
    this.router[verb](endpoint, ...middleware, wrappedHandler)
  }

  /**
   * @description
   * Tells the web framework to use the given router(middleware)
   */
  public use(namespace: string, router: Router): void {
    this.router.use(namespace, router)
  }

  // TODO: Fix type
  public catchExceptionsWrapper(routeHandler: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await routeHandler(req, res)
      } catch (err) {
        if (this.logExceptions) console.log(err)
        return next(err)
      }
    }
  }

  /**
   * @description
   * Creates a new instance of the adapter which is required
   * within browter for grouping.
   */
  public create() {
    return new ExpressToBrowterAdapter(this.adaptee, this.logExceptions)
  }

  /**
   * @description
   * Returns the correct format in order to initialize
   * your router within your framework.
   */
  public build() {
    return this.router
  }
}
