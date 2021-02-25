import Path from 'path'

import { Router as ExpressRouter } from 'express'
import { Browter, ExpressToBrowterAdapter } from '../../src/index'

import { LoggerMiddleware } from './Api/Middleware/Logger.middleware'

// For this example the relative path is wrong so we need to overwrite it.
const options = {
  controllersDir: Path.resolve('./examples/rest-api/Api/Controllers/index'),
}

const adaptee = new ExpressToBrowterAdapter(ExpressRouter)
const browter = new Browter<ExpressRouter>(adaptee, options)

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
