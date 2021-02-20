import { Router as ExpressRouter } from "express";
import { NoMethodHandlerException } from "./Exceptions/index";
import { getController } from "./GetController";
import { HttpMethod, Middleware } from "./Types";

export function OverrideHttpMethod(
  router: ExpressRouter,
  verb: HttpMethod,
  controllers: any
) {
  const oldMethod = router[verb].bind(router);

  // TODO: Fix type
  // @ts-ignore
  router[verb] = (
    endpoint: string,
    handler: string,
    middleware: Middleware[] = []
  ) => {
    const [controllerName, handlerMethod] = handler.split(".");

    const controller = getController(controllers, controllerName);
    const endpointHandler = controller[handlerMethod];

    if (!endpointHandler) {
      throw new NoMethodHandlerException(controllerName, handlerMethod);
    }

    oldMethod(endpoint, ...middleware, endpointHandler);
  };
}
