import {
  MissingDotInHandlerPath,
  NoControllerException,
  NoMethodHandlerException,
} from './Exceptions'

export interface IGetRouteHandlerOrThrowOptions {
  controllerName: string
  handlerName: string
  controllers: Record<string, any>
}

export class BindController {
  public getRouteHandlerOrThrow({
    controllerName,
    handlerName,
    controllers,
  }: IGetRouteHandlerOrThrowOptions): () => unknown {
    const controller = this.getController(controllers, controllerName)

    return this.getRouteHandler(controller, controllerName, handlerName)
  }

  public getControllerAndHandlerName(handler: string) {
    if (!handler.includes('.')) {
      throw new MissingDotInHandlerPath()
    }

    return handler.split('.') as [string, string]
  }

  public getController(controllers: any, controllerName: string) {
    const result = Object.entries(controllers).find(
      ([name]) => name.toLowerCase() === controllerName.toLowerCase()
    ) as [any, any]

    if (!result) {
      throw new NoControllerException(controllerName)
    }

    return result[1]
  }

  public getRouteHandler(
    controller: any,
    controllerName: string,
    handlerName: string
  ) {
    const handler = controller[handlerName]

    if (!handler) {
      throw new NoMethodHandlerException(controllerName, handlerName)
    }

    return handler
  }
}
