const path = require('path')

const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('chai')

/**
 * The code under test.
 * @type {Function}
 */
const T = require('../../index.js')

When('searching for file {string} in folder {string}', async function (filename, pathspec) {
  const startIn = path.join(this.tempFolder, pathspec)
  this.actual = await T(startIn, filename)
})

When('executing the file at {string}', async function (pathspec) {
  const pathToScript = path.join(this.tempFolder, pathspec)
  this.actual = await require(pathToScript)
})

Then('the module/script should return {string}', function (pathspec) {
  const expected = path.join(this.tempFolder, pathspec)
  expect(expected).to.equal(this.actual)
})
