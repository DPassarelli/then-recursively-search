const callsites = require('callsites')
const debug = require('debug')('then-recursively-search')
const fs = require('fs').promises
const path = require('path')

/**
 * Throws an exception if the provided value does not pass validation.
 *
 * @param  {String?}   filename   The value to check.
 *
 * @return {undefined}
 */
function validateFileName (filename) {
  if (filename === undefined) {
    throw new Error('the "filename" parameter is required')
  }

  if (typeof filename !== 'string') {
    throw new TypeError('the "filename" parameter must be a string value')
  }
}

/**
 * Throws an exception if the provided value does not pass validation.
 *
 * @param  {String?}   dirname   The value to check.
 *
 * @return {undefined}
 */
function validateStartingPoint (dirname) {
  if (!path.isAbsolute(dirname)) {
    throw new Error('if specified, the "startIn" parameter must be an absolute path')
  }
}

/**
 * Returns a Promise that resolves to a Boolean value indicating whether the
 * named file exists in the specified folder.
 *
 * @param  {String}    filename   The named file (including extension).
 *
 * @param  {String}    dirname    The absolute path of the containing folder.
 *
 * @return {Promise}              Resolves to a {Boolean}.
 */
async function doesFileExist (filename, dirname) {
  // fs.exists() is deprecated; docs recommend using access() instead of stat()
  try {
    await fs.access(path.join(dirname, filename))
    return true
  } catch {
    return false
  }
}

/**
 * Returns the parent of the specified folder.
 *
 * @param  {String}   dirname   The absolute path of the child folder.
 *
 * @return {String}             The absolute path to the parent.
 */
function getParentFolder (dirname) {
  return path.dirname(dirname)
}

/**
 * Search for `filename` in `dirname`, recursively moving up the directory tree
 * if not found.
 *
 * @param  {String}    filename   The file to find (including extension).
 *
 * @param  {String}    dirname    The absolute path of the folder to look in.
 *
 * @return {Promise}              Resolves to a {String} containing the complete
 *                                path to the file.
 */
async function searchForFile (filename, dirname) {
  debug('searching for "%s" in "%s"', filename, dirname)

  const found = await doesFileExist(filename, dirname)

  if (found) {
    debug('...found!')
    return path.join(dirname, filename)
  }

  const parentFolder = getParentFolder(dirname)
  if (parentFolder === dirname) {
    // cannot recurse any farther, file was not found
    debug('...not found, unable to recurse')
    throw new Error('file not found')
  }

  debug('...not found, recursing')
  return await searchForFile(filename, parentFolder)
}

/**
 * The exported function (entry point for this module).
 *
 * @param  {String}    filename   The file to find (including extension).
 *
 * @param  {String?}   startIn    (Optional) The absolute path of the folder to
 *                                begin searching in. Defaults to the location
 *                                of the caller.
 *
 * @return {Promise}
 */
async function exported (filename, startIn) {
  validateFileName(filename)

  if (startIn === undefined) {
    const callstack = callsites()
    startIn = path.dirname(callstack[1].getFileName())
  }

  validateStartingPoint(startIn)

  return searchForFile(filename.toLowerCase(), startIn)
}

module.exports = exported
