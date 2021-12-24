const path = require('path')

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

module.exports = getParentFolder
