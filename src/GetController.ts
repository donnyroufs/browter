import { NoControllerException } from './Exceptions/index'

export function getController(controllers: any, controllerName: string) {
  const result = Object.entries(controllers).find(
    ([name]) => name.toLowerCase() === controllerName.toLowerCase()
  ) as [any, any]

  if (!result) {
    throw new NoControllerException(controllerName)
  }

  return result[1]
}
