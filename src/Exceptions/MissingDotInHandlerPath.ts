export class MissingDotInHandlerPath extends Error {
  constructor() {
    // TODO: Improve error by giving it the current namespace
    super(`Missing dot syntax in handler path`)
  }
}
