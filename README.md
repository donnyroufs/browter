# Browter makes routing simple and organized

![example](https://i.imgur.com/oegU7K0.png)

**Browter** is a wrapper for Express router which will make working with it's router an ease. Eventually the goal of **Browter** would be to be generic and use several adapters for all kinds of Routers. I created this because to me it **was** a nuance having to create multiple routers and splitting code in order to have some kind of _organized_ code.

- Group Routes by namespace.
- No more imports for your controllers. **Browter** will bind them for you.
- Have the option to have many groups in one. This allows for resourceful routes.
- It wraps your route handlers to catch any errors which you can handle at the top level.
- Have all your routes in one file with as final result some eye candy.
- Built on Typescript.

**In progress**

- Losing the Express dependency and having seperate packages for Router Adapters. This will make **Browter** flexible to use with any other framework/router.
- Resourceful routes generation.

# Getting started with Browter

## Install package

### Yarn

```
$ yarn add @donnyroufs/browter
```

### Npm

```
$ npm install @donnyroufs/browter
```

## Routes.ts

```ts
import { Browter } from '@donnyroufs/browter'

const browter = new Browter()

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
new Browter({
  controllersDir: Path.resolve('./src/Api/Controller/Http")
})
```

## Replace the exception handler

Incase you are not happy about the current exception handler/wrapper like so:

```ts
new Browter({
  catchExceptionHandler: yourAwesomeExceptionHandler,
})
```

## Losing the context of this because of the exceptions wrapper

The autoBindMethods will make sure that the context stays within the controller

```ts
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
```

## Current Milestones

- [x] v0.1.1 | Automatically bind controllers with their routes
- [x] v0.1.2 | Group routes by namespace
- [x] v0.1.3 | Nested Grouping
- [x] v0.1.4 | Catch errors in route handlers and handle at the top level
- [x] v0.1.5 | Rewrite current API to remove magic and allow for adapters in the future
- [ ] v0.1.6 | Mainly bug fixes
- [ ] v0.1.7 | Scaffold resourceful routes
- [ ] v0.2.0 | Remove Express dependency and use adapters to make Browter flexible for any router.
- [ ] v0.2.0 | Generate docs out of JSDocs and host it.
