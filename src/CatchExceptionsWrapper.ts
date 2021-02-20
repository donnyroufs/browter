import { Request, Response, NextFunction } from "express";

export function CatchExceptionsWrapper(routeHandler: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await routeHandler(req, res);
    } catch (err) {
      if (
        process.env.NODE_ENV === "dev" ||
        process.env.NODE_ENV === "development"
      ) {
        console.log(err);
      }
      next(err);
    }
  };
}

export default CatchExceptionsWrapper;
