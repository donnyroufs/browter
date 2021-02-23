import express from 'express'

export class App {
  static API_VERSION: number = 1
  static PORT: number = 5000

  private server: express.Application = express()

  constructor() {
    this.boot()
  }

  async boot() {
    await this.registerRoutes()

    this.catchExceptions()

    this.server.listen(App.PORT, this.onSuccessBoot.bind(this))
  }

  private onSuccessBoot() {
    console.log(`Server is running on port: http://localhost:${App.PORT}`)
  }

  private async registerRoutes() {
    const { default: ApiRoutes } = await import('./Routes')
    this.server.use(`/api/v${App.API_VERSION}`, ApiRoutes)
  }

  private catchExceptions() {
    // The exception wrapper will call next to this method
    // You could listen to given exceptions and handle them accordingly
    this.server.use((err, req, res, next) => {
      res.json({
        statusCode: 400,
      })
    })
  }
}
