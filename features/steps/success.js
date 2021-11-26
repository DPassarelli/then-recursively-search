const path = require('path')

const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('chai')

/**
 * The code under test.
 * @type {Function}
 */
const T = require('../../index.js')

When('searching for file {string} in folder {string}', async function (filename, pathspec) {
  const startIn = path.join(process.cwd(), pathspec)
  this.actual = await T(startIn, filename)
})

Then('the module should return {string}', function (pathspec) {
  const expected = path.join(process.cwd(), pathspec)
  expect(expected).to.equal(this.actual)
})