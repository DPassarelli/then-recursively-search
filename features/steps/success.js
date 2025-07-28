import { join as joinPathSegments } from 'node:path'
import { When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'

/**
 * The code under test.
 * @type {Function}
 */
import T from '../../index.cjs'

When('searching for file {string} in folder {string}', async function (filename, pathspec) {
  try {
    const startIn = joinPathSegments(this.tempFolder, pathspec)
    this.actual = await T(filename, startIn)
  } catch (err) {
    this.actual = err
  }
})

When('executing the script at {string}', async function (pathspec) {
  const pathToScript = joinPathSegments(this.tempFolder, pathspec)
  const imported = await import(pathToScript)
  this.actual = await imported.result
})

Then('the promise should resolve to {string}', function (pathspec) {
  const expected = joinPathSegments(this.tempFolder, pathspec)
  expect(this.actual).to.equal(expected)
})
