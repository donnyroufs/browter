import { BindController } from '../src/BindController'

describe('GetControllerHandlerName', () => {
  let bindController: BindController
  let controllerHandler: string = 'UserController.index'

  beforeEach(() => {
    bindController = new BindController()
  })

  it('Should return a tuple of strings [controller, method]', () => {
    const parsed = bindController.getControllerAndHandlerName(controllerHandler)
    expect(parsed).toEqual(['UserController', 'index'])
  })

  it('Should throw an exception when the string is not in the right format', () => {
    expect(() => {
      bindController.getControllerAndHandlerName('UserController#index')
    }).toThrow()
  })
})
