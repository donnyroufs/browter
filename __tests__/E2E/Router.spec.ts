import supertest from 'supertest'
import { Router } from 'express'
import { app } from '../../__mocks__/ExpressServer'
import { Browter } from '../../src/Router'
import { ExpressToBrowterAdapter } from '@donnyroufs/express-to-browter-adapter'

let browter: Browter<Router>

const request = supertest(app)

describe('Router', () => {
  beforeEach(() => {
    const adaptee = new ExpressToBrowterAdapter(Router, true)
    browter = new Browter<Router>(adaptee, {
      controllersDir: '../__mocks__/CompositeRoot',
    })
  })

  it('Should create a get route', () => {
    browter.get('/', 'UserController.index')

    const routes = browter.build().stack[0]

    expect(routes.route.path).toEqual('/')
    expect(routes.route.methods.get).toBeTruthy()
  })

  it('Should create a post route', () => {
    browter.post('/', 'UserController.index')

    const routes = browter.build().stack[0]

    expect(routes.route.path).toEqual('/')
    expect(routes.route.methods.post).toBeTruthy()
  })

  it('Should create a put route', () => {
    browter.put('/', 'UserController.index')

    const routes = browter.build().stack[0]

    expect(routes.route.path).toEqual('/')
    expect(routes.route.methods.put).toBeTruthy()
  })

  it('Should create a delete route', () => {
    browter.delete('/', 'UserController.index')

    const routes = browter.build().stack[0]

    expect(routes.route.path).toEqual('/')
    expect(routes.route.methods.delete).toBeTruthy()
  })

  it('Should create an all route', () => {
    browter.all('/', 'UserController.index')

    const routes = browter.build().stack[0]

    expect(routes.route.path).toEqual('/')
    expect(routes.route.methods._all).toBeTruthy()
  })

  it('Should create a head route', () => {
    browter.head('/', 'UserController.index')

    const routes = browter.build().stack[0]

    expect(routes.route.path).toEqual('/')
    expect(routes.route.methods.head).toBeTruthy()
  })

  // Test grouping without making a big mess.
  // Test individual routes.
  describe('Api Server', () => {
    it('Should respond with json', async (done) => {
      browter.get('/test', 'UserController.test')

      app.use(browter.build())

      const res = await request.get('/test')

      expect(res.body).toEqual({ ok: true })
      done()
    })

    it('Should should create a namespace and create its give route', async (done) => {
      browter.group('users', (browter) => {
        browter.get('/test', 'UserController.test')
      })

      app.use(browter.build())

      const res = await request.get('/users/test')

      expect(res.body).toEqual({ ok: true })

      done()
    })

    it('Should create nested groups', async (done) => {
      browter.group('users', (browter) => {
        browter.group('posts', (browter) => {
          browter.get('/test', 'UserController.test')
        })
      })

      app.use(browter.build())

      const res = await request.get('/users/posts/test')

      expect(res.body).toEqual({ ok: true })
      done()
    })
  })
})
