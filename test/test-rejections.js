/* eslint-env mocha */
const mockFS = require('mock-fs')
const path = require('path')

/**
 * Code under test.
 * @type {Function}
 */
const T = require('../index.js')

/**
 * The error message thrown when the first parameter is missing.
 * @type {String}
 */
const ERR_MISSING_DIR = 'The required parameter "startIn" is missing.'

/**
 * The error message thrown when the second parameter is missing.
 * @type {String}
 */
const ERR_MISSING_FILE = 'The required parameter "filename" is missing.'

/**
 * The error message thrown when the file cannot be found (in any directory).
 * @type {String}
 */
const ERR_404 = 'File not found.'

describe('rejections', function () {
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

  it('should be rejected if no parameter values are provided', function () {
    return expect(T()).to.be.eventually.rejected.with.property('message', ERR_MISSING_DIR)
  })

  it('should be rejected if the "startIn" parameter is provided, but not "filename"', function () {
    return expect(T('C:/')).to.be.eventually.rejected.with.property('message', ERR_MISSING_FILE)
  })

  it('should be rejected if the value for "startIn" is not a string', function () {
    return expect(T(123, 'test.txt')).to.be.eventually.rejected.with.instanceof(TypeError).and.property('message').match(/path must be a string/i)
  })

  it('should be rejected if the file does not exist anywhere in the specified directory (or any parent directories)', function () {
    const startIn = path.join(process.cwd(), './one/two/three/four')
    const filename = 'dne.txt'

    return expect(T(startIn, filename)).to.be.eventually.rejected.with.property('message', ERR_404)
  })

  it('should be rejected if the directory specified by "startIn" does not exist', function () {
    const startIn = path.join(process.cwd(), './one/two/three/four/five')
    const filename = 'dne.txt'

    return expect(T(startIn, filename)).to.be.eventually.rejected.with.property('code', 'ENOENT')
  })

  it('should be rejected if "filename" exists, but with a different case', function () {
    const startIn = path.join(process.cwd(), './one/two/three')
    const filename = 'ONE.txt'

    return expect(T(startIn, filename)).to.be.eventually.rejected.with.property('message', ERR_404)
  })
})
