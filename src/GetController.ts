import { NoControllerException } from "./Exceptions/index";

export function getController(controllers: any, controllerName: string) {
  const [, controller] = Object.entries(controllers).find(
    ([name]) => name.toLowerCase() === controllerName.toLowerCase()
  ) as [any, any];

  if (!controller) {
    throw new NoControllerException(controllerName);
  }

  return controller;
}
