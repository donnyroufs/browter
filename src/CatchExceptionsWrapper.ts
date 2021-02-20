import { Request, Response, NextFunction } from "express";

export function CatchExceptionsWrapper(controller: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (err) {
      if (
        process.env.NODE_ENV === "dev" ||
        process.env.NODE_ENV === "development"
      ) {
        console.info(err);
      }
      next(err);
    }
  };
}

export default CatchExceptionsWrapper;
