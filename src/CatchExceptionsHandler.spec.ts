import { CatchExceptionsHandler } from './CatchExceptionsHandler'

// next is the catch handler
function mockedNext() {
  return 'error'
}

function mockedHandler() {
  return 'handler'
}
function throwHandler() {
  throw new Error()
}

function mock() {}

describe('Catch exceptions handler', () => {
  it('Should not interfere with the handler', async (done) => {
    const wrappedFn = CatchExceptionsHandler(mockedHandler)

    // @ts-expect-error
    expect(await wrappedFn(mock, mock, mockedNext)).toBe('handler')
    done()
  })

  it('Should catch the exception and call next', async (done) => {
    const wrappedFn = CatchExceptionsHandler(throwHandler)

    // @ts-expect-error
    expect(await wrappedFn(mock, mock, mockedNext)).toBe('error')
    done()
  })
})
