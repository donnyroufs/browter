import { UserController } from '../__mocks__/UserController.mock'
import { BindController } from '../src/BindController'

const userController = new UserController()

let bindController: BindController

describe('GetRouteHandler', () => {
  const controllerName: string = 'UserController'
  const handlerName: string = 'index'

  beforeEach(() => {
    bindController = new BindController()
  })

  it('Should return the handler', () => {
    const handler = bindController.getRouteHandler(
      userController,
      controllerName,
      handlerName
    )

    expect(handler).toBeDefined()
    expect(handler()).toBe(1)
  })

  it('Should throw an exception when it failed to find the handler', () => {
    expect(() => {
      bindController.getRouteHandler(userController, controllerName, 'fake')
    }).toThrow()
  })
})
