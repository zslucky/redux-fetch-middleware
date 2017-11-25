import chai from 'chai'
import nock from 'nock'
// import fetchMock from 'fetch-mock'

import middlewareCreator from '../src/index'

before(() => {
  nock('http://www.test.com')
    .get('/test')
    .reply(200, {
      test: 'test'
    })
})

describe('fetch middleware creator', () => {
  const customConfig = {}
  const doDispatch = () => {}
  const doGetState = () => {}

  const mockOtherAction = {}

  const mockAction = {
    $payload: { url: 'http://www.test.com/test' }
  }

  it('should return fetch middleware from creator', () => {
    const middleware = middlewareCreator(customConfig)

    chai.assert.isFunction(middleware)
    chai.assert.strictEqual(middleware.length, 1)
  })

  describe('fetch middleware', () => {
    const middleware = middlewareCreator(customConfig)
    const nextHandler = middleware({dispatch: doDispatch, getState: doGetState})

    it('it must return a function to handle next', () => {
      chai.assert.isFunction(nextHandler)
      chai.assert.strictEqual(nextHandler.length, 1)
    })

    describe('handle next', () => {
      it('must return a function to handle action', () => {
        const actionHandler = nextHandler()

        chai.assert.isFunction(actionHandler)
        chai.assert.strictEqual(actionHandler.length, 1)
      })

      describe('handle action', () => {
        it('must handle action with given keyword', done => {
          const nextMiddleware = action => {}
          const actionHandler = nextHandler(nextMiddleware)

          chai.assert.isFunction(actionHandler)
          chai.assert.strictEqual(actionHandler.length, 1)

          actionHandler(mockAction).then(data => {
            chai.assert.deepEqual(data, { test: 'test' })
            done()
          })
        })

        it('must pass action to next if not a given schema action', done => {
          const actionHandler = nextHandler(action => {
            done()
          })

          chai.assert.isFunction(actionHandler)
          chai.assert.strictEqual(actionHandler.length, 1)

          actionHandler(mockOtherAction)
        })
      })
    })
  })
})
