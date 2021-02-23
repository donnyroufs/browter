import { BaseController } from './Base.controller'

export class CoreController extends BaseController {
  constructor(private readonly dep: () => string) {
    super()
  }

  async index(req, res) {
    res.json(this.dep())
  }

  async throw(req, res) {
    throw new Error('Something went wrong here')
  }
}
