import { CatchExceptionsHandler } from './CatchExceptionsHandler'
import { DEFAULT_CONTROLLERS_DIR } from './Constants'
import { IBrowterOptions } from './Types'

export const DefaultOptions: IBrowterOptions = {
  controllersDir: DEFAULT_CONTROLLERS_DIR,
  catchExceptionsHandler: CatchExceptionsHandler,
  logExceptions: true,
}

export class Options implements IBrowterOptions {
  public controllersDir: string
  public catchExceptionsHandler: typeof CatchExceptionsHandler
  public logExceptions: boolean

  constructor({
    controllersDir,
    catchExceptionsHandler,
    logExceptions,
  }: IBrowterOptions = DefaultOptions) {
    this.controllersDir = controllersDir
    this.catchExceptionsHandler = catchExceptionsHandler
    this.logExceptions = logExceptions
  }
}
