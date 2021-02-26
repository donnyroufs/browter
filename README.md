# Browter makes routing simple and organized

![example](https://i.imgur.com/OptWLcf.png)

**Browter** in it's own does not do a thing because it relies on adapters. By creating an adapter we can do things on top of a given router and then return a valid instance for the given framework/router.

**features**

- Use for any Router
- Group Routes by namespace
- No more imports for your controllers. **Browter** will bind them for you
- Have the option to have many groups in one. This allows for resourceful routes
- It wraps your route handlers to catch any errors which you can handle at the top level
- Have all your routes in one file with as final result some eye candy.
- Built on Typescript

**In progress**

- Resourceful routes generation.

# Getting started with Browter

## Install package(s)

Right now only an official Express adapter exists, but you can make your own! Browter exposes the IRouterAdapter interface which you can implement on any of your classes to create an adapter.

### Yarn

```
$ yarn add @donnyroufs/browter
$ yarn add @donnyroufs/express-to-browter-adapter
```

### Npm

```
$ npm install @donnyroufs/browter
$ npm install @donnyroufs/express-to-browter-adapter
```

## Known adapters for Browter

- [express](https://github.com/donnyroufs/express-to-browter-adapter)

## Routes.ts

```ts
import { ExpressToBrowterAdapter } from '@donnyroufs/express-to-browter-adapter'
import { Browter } from '@donnyroufs/browter'
import { Router as ExpressRouter } from 'express'

const adapted = new ExpressToBrowterAdapter(ExpressRouter)
const browter = new Browter<ExpressRouter>(adapted)

browter.group('/api/v1', (browter) => {
  browter.get('/', 'CoreController.index')

  browter.group('users', (browter) => {
    browter.get('/', 'UserController.index')

    browter.group('posts', (browter) => {
      browter.post('/', 'PostController.store')
    })
  })

  browter.group('verifications', (browter) => {
    browter.get('/', 'VerificationController.index', [isAuth])
  })
})

export default browter.build()
```

## Which will create:

| Http Method | Endpoint              | Controller             | Route handler |
| ----------- | --------------------- | ---------------------- | ------------- |
| GET         | /api/v1/              | CoreController         | index         |
| GET         | /api/v1/users         | UserController         | index         |
| POST        | /api/v1/users/posts   | PostController         | store         |
| GET         | /api/v1/verifications | VerificationController | isAuth, index |

## Example Http Controller

> It's recommended to have one Composite Root where you setup all your controllers with it's required dependencies.

```ts
class UserController {
  async index(req: Request, res: Response) {
    res.send('Hello World!')
  }
}

export userController = new UserController()
```

## App.ts, initialize Browter with an Express app

```ts
import express from 'express'
import ApiRoutes from './Routes.ts'

const app = express()

// Middleware which gets called when an exception gets thrown
this.server.use((err, req, res, next) => {
  res.json({
    statusCode: 400,
  })
})

app.use(ApiRoutes)

app.listen(5000)
```

## Change the controllers directory

By default Browter will look for controllers in `src/Api/Controllers` but if that doesn't fit with your architecture then you can change it's options like so

```ts
new Browter(adapter, {
  controllersDir: Path.resolve('./src/Api/Controller/Http")
})
```

## Losing the context of this because of the exceptions wrapper

The autoBindMethods will make sure that the context stays within the controller

```ts
export class BaseController {
  constructor() {
    this.autoBindMethods()
  }

  private autoBindMethods() {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))

    methods
      .filter((method) => method !== 'constructor')
      .forEach((method) => (this[method] = this[method].bind(this)))
  }
}
```

## Current Milestones

- [x] v0.1.1 | Automatically bind controllers with their routes
- [x] v0.1.2 | Group routes by namespace
- [x] v0.1.3 | Nested Grouping
- [x] v0.1.4 | Catch errors in route handlers and handle at the top level
- [x] v0.1.5 | Rewrite current API to remove magic and allow for adapters in the future
- [x] v0.1.6 | Mainly bug fixes
- [ ] v0.1.9 | Scaffold resourceful routes
- [ ] v0.2.0 | Remove Express dependency and use adapters to make Browter flexible for any router.
- [ ] v0.2.0 | Generate docs out of JSDocs and host it.
