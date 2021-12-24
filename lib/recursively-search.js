const path = require('path')

const doesFileExist = require('./does-file-exist.js')
const getParentFolder = require('./get-parent-folder.js')

/**
 * [recursivelySearchForFile description]
 * @param  {[type]} filename [description]
 * @param  {[type]} dirname  [description]
 * @return {[type]}          [description]
 */
async function recursivelySearchForFile (filename, dirname) {
  const found = await doesFileExist(filename, dirname)

  if (found) {
    return path.join(dirname, filename)
  }

  return await recursivelySearchForFile(filename, getParentFolder(dirname))
}

module.exports = recursivelySearchForFile
