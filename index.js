const callsites = require('callsites')
const debug = require('debug')('then-recursively-search')
const fs = require('fs')
const path = require('path')

module.exports = findFile

/**
 * Recursively search a directory tree for the specified file.
 *
 * @param  {String?}   startIn    The directory to begin searching in. Defaults
 *                                to the folder containing the calling code.
 *
 * @param  {String}    filename   The name (including extension) of the file to
 *                                search for.
 *
 * @return {Promise}              Fulfilled with the complete path to the file
 *                                (if found); otherwise, rejected.
 */
function findFile (startIn, filename) {
  if (filename === undefined) {
    filename = startIn
    startIn = path.dirname(callsites()[1].getFileName())
  }

  debug('searching for "%s" in "%s"', filename, startIn)

  return new Promise(function (resolve, reject) {
    // if (startIn == null) {
    //   throw new Error('The required parameter "startIn" is missing.')
    // }

    // if (filename == null) {
    //   throw new Error('The required parameter "filename" is missing.')
    // }

    fs.readdir(startIn, function (err, contents) {
      // if (err) {
      //   reject(err)
      //   return
      // }

      if (contents.includes(filename)) {
        const matchingPath = path.join(startIn, filename)
        debug('...found! matching path is "%s"', matchingPath)
        resolve(matchingPath)
        return
      }

      /**
       * The name of the directory one level up from the current one.
       * @type {String}
       */
      const parentDir = path.dirname(startIn)

      // /**
      //  * If the current directory is the same as the parent, it means there is
      //  * nowhere else to go. We've moved all the way up the directory tree.
      //  */
      // if (parentDir === startIn) {
      //   debug('...root folder reached, no match found')
      //   reject(new Error('File not found.'))
      //   return
      // }

      /**
       * Otherwise, recurse...
       */
      debug('recursing...')

      findFile(parentDir, filename)
        .then(function (path) {
          resolve(path)
        })
      // .catch(function (err) {
      //   reject(err)
      // })
    })
  })
}
