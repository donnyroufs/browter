import { DEFAULT_CONTROLLERS_DIR } from './Constants'
import { IBrowterOptions } from './Types'

export const DefaultOptions: IBrowterOptions = {
  controllersDir: DEFAULT_CONTROLLERS_DIR,
}

export class Options implements IBrowterOptions {
  public controllersDir: string

  constructor({ controllersDir }: IBrowterOptions = DefaultOptions) {
    this.controllersDir = controllersDir
  }
}
