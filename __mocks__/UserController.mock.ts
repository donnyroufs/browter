import { Response } from 'express'

export class UserController {
  public index() {
    return 1
  }

  async test(_: any, response: Response) {
    response.json({ ok: true })
  }
}
