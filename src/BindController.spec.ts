import { BindController } from './BindController'
import { UserController } from './__mocks__/UserController.mock'

const userController = new UserController()

describe('Bind Controller', () => {
  let bindController: BindController

  beforeEach(() => {
    bindController = new BindController()
  })

  it('Should return the handler', () => {
    const handler = bindController.getRouteHandlerOrThrow({
      controllerName: 'UserController',
      handlerName: 'index',
      controllers: {
        userController,
      },
    })

    expect(handler).toBeDefined()
    expect(handler()).toBe(1)
  })

  it('Should throw an exception when it did not find the given controller', () => {
    expect(() =>
      bindController.getRouteHandlerOrThrow({
        controllerName: 'DoesNotExistController',
        handlerName: 'index',
        controllers: { userController },
      })
    ).toThrow()
  })

  it('Should throw an exception when it did not find the handler', () => {
    expect(() => {
      bindController.getRouteHandlerOrThrow({
        controllerName: 'UserController',
        handlerName: 'store',
        controllers: {},
      })
    }).toThrow()
  })
})
