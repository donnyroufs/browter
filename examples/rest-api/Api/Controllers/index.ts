import { UserController } from './User.controller'
import { PostController } from './Post.controller'
import { CoreController } from './Core.controller'

// Dependencies for Core Controller
function Dep() {
  return 'Hello!'
}

// Compose Controllers
export const coreController = new CoreController(Dep)
export const userController = new UserController()
export const postController = new PostController()
