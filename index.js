const debug = require('debug')('then-recursively-search')
const fs = require('fs')
const path = require('path')

module.exports = _findFile

/**
 * Recursively search a directory tree for the specified file.
 *
 * @param  {String}    startIn    The directory to begin searching in.
 *
 * @param  {String}    filename   The name (including extension) of the file to search for.
 *
 * @return {Promise}              Fulfilled with the complete path to the file (if found); otherwise, rejected.
 */
function _findFile (startIn, filename) {
  debug('searching for "%s" in "%s"', filename, startIn)

  return new Promise(function (resolve, reject) {
    if (startIn == null) {
      reject(new Error('The required parameter "startIn" is missing.'))
      return
    }

    if (filename == null) {
      reject(new Error('The required parameter "filename" is missing.'))
      return
    }

    fs.readdir(startIn, function (err, contents) {
      if (err) {
        reject(err)
        return
      }

      /**
       * The name of the directory one level up from the current one.
       * @type {String}
       */
      const parentDir = path.dirname(startIn)

      if (~contents.indexOf(filename)) {
        debug('found!')
        resolve(path.join(startIn, filename))
        return
      }

      /**
       * If the current directory is the same as the parent, it means there is nowhere else to go.
       * We've moved all the way up the directory tree.
       */
      if (parentDir === startIn) {
        debug('not found')
        reject(new Error('File not found.'))
        return
      }

      /**
       * Otherwise, recurse...
       */
      _findFile(parentDir, filename)
        .then(function (path) {
          resolve(path)
        })
        .catch(function (err) {
          reject(err)
        })
    })
  })
}
