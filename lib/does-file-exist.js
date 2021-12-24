const fs = require('fs').promises
const path = require('path')

/**
 * Returns a Promise that resolves to a Boolean value indicating whether the
 * named file exists in the specified folder.
 *
 * @param  {String}    filename   The named file (including extension).
 *
 * @param  {String}    dirname    The absolute path of the containing folder.
 *
 * @return {Promise}              Resolves to a Boolean value.
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

module.exports = doesFileExist
