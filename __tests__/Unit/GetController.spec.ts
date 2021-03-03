import { BindController } from '../../src/BindController'
import { UserController } from '../../__mocks__/UserController.mock'

const userController = new UserController()

describe('GetController', () => {
  let bindController: BindController

  beforeEach(() => {
    bindController = new BindController()
  })

  it('Should return a controller', () => {
    const controller = bindController.getController(
      {
        userController,
      },
      'UserController'
    )
    expect(controller).toBeDefined()
    expect(controller.index).toBeDefined()
  })

  it('Should throw an exception when it failed to find the controller', () => {
    expect(() => {
      bindController.getController({ userController }, 'PostController')
    })
  })
})
