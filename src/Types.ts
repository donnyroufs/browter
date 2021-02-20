import { IRouter, NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export type RouteHandlerFn = (
  req: Request<ParamsDictionary, any, any, any, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) => void;

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type RouteHandler = (
  endpoint: string,
  handler: string,
  middleware?: Middleware[]
) => void;

export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "all";

export interface IBrowter extends Omit<IRouter, HttpMethod> {
  get: RouteHandler;
  post: RouteHandler;
  put: RouteHandler;
  patch: RouteHandler;
  delete: RouteHandler;
  head: RouteHandler;
}

export type GroupCallbackFn = (router: IBrowter) => void;
export type createRoutesCallbackFn = (router: IBrowter) => any;
