import { Request, Response, NextFunction } from 'express'

export type CatchExceptionsHandlerFn = (
  routeHandler: any,
  logExceptions: boolean
) => any

export function CatchExceptionsHandler(
  routeHandler: any,
  logExceptions: boolean = false
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await routeHandler(req, res)
    } catch (err) {
      if (logExceptions) console.log(err)
      return next(err)
    }
  }
}
