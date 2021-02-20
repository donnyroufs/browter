import { createRoutesCallbackFn } from "./Types";

declare module "express-serve-static-core" {
  export interface IRouter {
    group: (namespace: string, callback: createRoutesCallbackFn) => void;
  }
  export interface Router {
    group: (namespace: string, callback: createRoutesCallbackFn) => void;
  }
}
