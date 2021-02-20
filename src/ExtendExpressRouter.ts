import express from "express";
import { Browter } from "./Router";
import { GroupCallbackFn, Middleware } from "./Types";

// @ts-expect-error
// TODO Probably not needed
if (!express.Router.group) {
  // @ts-expect-error
  express.Router.group = function (
    namespace: string,
    callback: GroupCallbackFn,
    middleware?: Middleware[]
  ) {
    const router = Browter();

    callback(router);

    if (middleware && middleware.length > 0) {
      // @ts-expect-error
      this.use(middleware);
    }

    // @ts-expect-error
    this.use(namespace, router);

    return (router as unknown) as express.Router;
  };
}
