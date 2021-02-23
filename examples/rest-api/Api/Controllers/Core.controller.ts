import { BaseController } from './Base.controller'

export class CoreController extends BaseController {
  constructor(private readonly dep: () => string) {
    super()
  }

  async index(req, res) {
    res.json(this.dep())
  }
}
