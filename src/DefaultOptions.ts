import { CatchExceptionsHandler } from './CatchExceptionsHandler'

import { DEFAULT_CONTROLLERS_DIR } from './Constants'
import { IBrowterOptions } from './Types'

export const DefaultOptions = <IBrowterOptions>{
  controllersDir: DEFAULT_CONTROLLERS_DIR,
  catchExceptionsHandler: CatchExceptionsHandler,
  logExceptions: true,
}
