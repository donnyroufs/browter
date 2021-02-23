export class BaseController {
  constructor() {
    this.autoBindMethods()
  }

  protected autoBindMethods() {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))

    methods
      .filter((method) => method !== 'constructor')
      .forEach((method) => (this[method] = this[method].bind(this)))
  }
}
