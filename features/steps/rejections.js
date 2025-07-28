import { When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'

/**
 * The code under test.
 * @type {Function}
 */
import T from '../../index.cjs'

When('calling the exported function with no parameters', async function () {
  try {
    this.actual = await T()
  } catch (err) {
    this.actual = err
  }
})

When('calling the exported function with parameter of type {string}', async function (type) {
  /**
   * The parameter value to pass into the code under test.
   * @type {any}
   */
  let param

  switch (type) {
    case 'null':
      param = null
      break

    case 'Date':
      param = new Date()
      break

    case 'Object literal':
      param = { key: 'value' }
      break

    case 'Array literal':
      param = ['value']
      break

    case 'Promise':
      param = Promise.resolve('value')
      break
  }

  try {
    this.actual = await T(param)
  } catch (err) {
    this.actual = err
  }
})

When('calling the exported function with a relative path', async function () {
  try {
    this.actual = await T('first.txt', './parent')
  } catch (err) {
    this.actual = err
  }
})

Then('the promise should be rejected with {string}', function (expected) {
  expect(this.actual).to.be.an.instanceof(Error)
  expect(this.actual.message).to.equal(expected)
})
