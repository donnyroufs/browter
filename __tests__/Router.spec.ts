import { Router } from 'express'
import { Browter } from '../src/Router'
import { ExpressToBrowterAdapter } from '@donnyroufs/express-to-browter-adapter'

const adaptee = new ExpressToBrowterAdapter(Router, true)
let browter: Browter<Router>

describe('Router', () => {
  beforeEach(() => {
    browter = new Browter(adaptee, {
      controllersDir: '../__mocks__/CompositeRoot',
    })
  })

  it('should work', () => expect(1).toBe(1))
})
