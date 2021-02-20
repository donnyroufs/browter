export class NoMethodHandlerException extends Error {
  constructor(controllerName: string, handlerMethod: string) {
    super(
      `[${controllerName}]: seems to be missing the '${handlerMethod}' handler`
    );
  }
}
