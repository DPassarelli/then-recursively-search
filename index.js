const callsites = require('callsites')
const debug = require('debug')('then-recursively-search')
const path = require('path')

const recursivelySearchForFile = require(path.join(__dirname, './lib/recursively-search.js'))

async function exported (filename, startIn) {
  if (startIn === undefined) {
    const callstack = callsites()
    startIn = path.dirname(callstack[1].getFileName())
  }

  debug('searching for "%s" in "%s"', filename, startIn)

  return recursivelySearchForFile(filename, startIn)
}

module.exports = exported
