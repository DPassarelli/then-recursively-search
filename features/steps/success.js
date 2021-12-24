const path = require('path')

const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('chai')

/**
 * The code under test.
 * @type {Function}
 */
const T = require('../../index.js')

When('searching for file {string} in folder {string}', async function (filename, pathspec) {
  try {
    const startIn = path.join(this.tempFolder, pathspec)
    this.actual = await T(filename, startIn)
  } catch (err) {
    this.actual = err
  }
})

When('executing the script at {string}', async function (pathspec) {
  const pathToScript = path.join(this.tempFolder, pathspec)
  this.actual = await require(pathToScript)
})

Then('the promise should resolve to {string}', function (pathspec) {
  const expected = path.join(this.tempFolder, pathspec)
  expect(this.actual).to.equal(expected)
})
