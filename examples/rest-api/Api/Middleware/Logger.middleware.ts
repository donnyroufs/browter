import { Request, Response, NextFunction } from 'express'

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('Hello, this is cool.')
  next()
}
