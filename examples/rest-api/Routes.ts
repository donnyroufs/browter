import Path from 'path'

import { Browter } from '../../src/index'
import { LoggerMiddleware } from './Api/Middleware/Logger.middleware'

// For this example the relative path is wrong so we need to overwrite it.
const controllersDir = Path.resolve('./examples/rest-api/Api/Controllers/index')

const browter = new Browter({
  controllersDir,
})

// Example of middleware usage
browter.get('/', 'CoreController.index', [LoggerMiddleware])

// Example of a thrown error being handled
browter.get('/throw', 'CoreController.throw')

// Example of grouping
browter.group('users', (browter) => {
  browter.get('/', 'UserController.index')

  // Nested grouping
  browter.group('posts', (browter) => {
    browter.get('/', 'PostController.index')
  })
})

export default browter.build()
