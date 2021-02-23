import { Browter } from '../../src/index'
import Path from 'path'
import { LoggerMiddleware } from './Api/Middleware/Logger.middleware'

// For this example the relative path is wrong so we need to overwrite it.
const controllersDir = Path.resolve('./examples/rest-api/Api/Controllers/index')

const browter = new Browter({
  controllersDir,
})

browter.get('/', 'CoreController.index', [LoggerMiddleware])

browter.group('users', (browter) => {
  browter.get('/', 'UserController.index')

  browter.group('posts', (browter) => {
    browter.get('/', 'PostController.index')
  })
})

export default browter.build()
