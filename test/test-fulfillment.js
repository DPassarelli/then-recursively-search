/* eslint-env mocha */
const mockFS = require('mock-fs')
const path = require('path')

/**
 * Code under test.
 * @type {Function}
 */
const T = require('../index.js')

describe('fulfillment', function () {
  before(function () {
    mockFS({
      one: {
        'one.txt': 'test file',
        'two.txt': 'test file',
        two: {
          'two.txt': 'test file',
          three: {
            'three.txt': 'test file',
            four: {}
          }
        }
      }
    })
  })

  after(function () {
    mockFS.restore()
  })

  it('should be fulfilled if "filename" exists in "startIn"', function () {
    const startIn = path.join(process.cwd(), './one/two/three')
    const filename = 'three.txt'

    /**
     * The expected fulfillment value.
     * @type {String}
     */
    const expected = path.join(process.cwd(), './one/two/three/three.txt')

    return expect(T(startIn, filename)).to.be.eventually.fulfilled.with.string(expected)
  })

  it('should be fulfilled if "filename" exists in directory more than one level above "startIn"', function () {
    const startIn = path.join(process.cwd(), './one/two/three')
    const filename = 'one.txt'

    /**
     * The expected fulfillment value.
     * @type {String}
     */
    const expected = path.join(process.cwd(), './one/one.txt')

    return expect(T(startIn, filename)).to.be.eventually.fulfilled.with.string(expected)
  })

  it('should be fulfilled with the first match, if "filename" exists in more than one parent directory', function () {
    const startIn = path.join(process.cwd(), './one/two/three')
    const filename = 'two.txt'

    /**
     * The expected fulfillment value.
     * @type {String}
     */
    const expected = path.join(process.cwd(), './one/two/two.txt')

    return expect(T(startIn, filename)).to.be.eventually.fulfilled.with.string(expected)
  })
})
