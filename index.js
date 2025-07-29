import { access } from 'node:fs/promises'
import { dirname, isAbsolute, join as joinPathSegments } from 'node:path'
import { platform } from 'node:os'
import { fileURLToPath } from 'node:url'

import callsites from 'callsites'
import createDebugLogger from 'debug'
const debug = createDebugLogger('then-recursively-search')

/**
 * Throws an exception if the provided value does not pass validation.
 *
 * @param  {String?}   filename   The value to check.
 *
 * @return {undefined}
 */
function validateFileName (filename) {
  if (filename === undefined) {
    throw new TypeError('the "filename" parameter is required')
  }

  if (typeof filename !== 'string') {
    throw new TypeError('the "filename" parameter must be a string value')
  }
}

/**
 * Throws an exception if the provided value does not pass validation.
 *
 * @param  {String?}   pathspec  The value to check.
 *
 * @return {undefined}
 */
function validateStartingPoint (pathspec) {
  if (!isAbsolute(pathspec)) {
    throw new Error('if specified, the "startIn" parameter must be an absolute path')
  }
}

/**
 * Returns a Promise that resolves to a Boolean value indicating whether the
 * named file exists in the specified folder.
 *
 * @param  {String}    filename   The named file (including extension).
 *
 * @param  {String}    pathspec   The absolute path of the containing folder.
 *
 * @return {Promise}              Resolves to a {Boolean}.
 */
async function doesFileExist (filename, pathspec) {
  // fs.exists() is deprecated; docs recommend using access() instead of stat()
  try {
    await access(joinPathSegments(pathspec, filename))
    return true
  } catch {
    return false
  }
}

/**
 * Returns the parent of the specified folder.
 *
 * @param  {String}   pathspec  The absolute path of the child folder.
 *
 * @return {String}             The absolute path to the parent.
 */
function getParentFolder (pathspec) {
  return dirname(pathspec)
}

/**
 * Search for `filename` in `pathspec`, recursively moving up the directory tree
 * if not found.
 *
 * @param  {String}    filename   The file to find (including extension).
 *
 * @param  {String}    pathspec   The absolute path of the folder to look in.
 *
 * @return {Promise}              Resolves to a {String} containing the complete
 *                                path to the file.
 */
async function searchForFile (filename, pathspec) {
  debug('searching for "%s" in "%s"', filename, pathspec)

  const found = await doesFileExist(filename, pathspec)

  if (found) {
    debug('...found!')
    return joinPathSegments(pathspec, filename)
  }

  const parentFolder = getParentFolder(pathspec)
  if (parentFolder === pathspec) {
    // reached the top of the directory tree
    debug('...not found, cannot recurse any further')
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
export const findRecursively = async function (filename, startIn) {
  validateFileName(filename)

  if (startIn === undefined) {
    /**
     * Figure out exactly where this code is being called from (which may or may
     * not match CWD).
     */
    const callstack = callsites()

    startIn = (
      platform === 'win32'
        ? dirname(callstack[1].getFileName())
        : dirname(fileURLToPath(callstack[1].getFileName()))
    )
  } else {
    validateStartingPoint(startIn)
  }

  return searchForFile(filename.toLowerCase(), startIn)
}
