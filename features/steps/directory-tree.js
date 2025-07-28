import { mkdir, writeFile } from 'node:fs/promises'
import { join as joinPathSegments } from 'node:path'
import { cwd } from 'node:process'

import { After, Before, Given } from '@cucumber/cucumber'
import { deleteAsync } from 'del'

/**
 * Creates a directory tree matching the specified key-value pairs, according to
 * these rules:
 *   1. The name of each container is specified by the key.
 *   2. The type of each container is specified by the value:
 *       a) Values that are plain objects are considered sub-folders.
 *       b) Values that are strings are considered files (with the string value
 *          being the contents of said file).
 *
 * @param  {Object}   tree    The directory tree to create.
 *
 * @param  {String}   parent  The path of the containing folder (on disk).
 *
 * @return {Promise} Resolved when all folders and/or files are created
 *                   successfully.
 */
async function createDirectoryTree (tree, parent) {
  const entries = Object.keys(tree)

  const promises = entries.map((entry) => {
    if (typeof tree[entry] === 'string') {
      return writeFile(
        joinPathSegments(parent, entry),
        tree[entry]
      )
    }

    const newParent = joinPathSegments(parent, entry)

    return mkdir(newParent)
      .then(() => {
        return createDirectoryTree(tree[entry], newParent)
      })
  })

  await Promise.all(promises)
}

let counter = 0

Before(function () {
  counter++
  this.tempFolder = joinPathSegments(cwd(), '.temp', counter.toString())
  return mkdir(this.tempFolder, { recursive: true })
})

After(function () {
  return deleteAsync(this.tempFolder)
})

Given(
  'a directory tree with the following structure:',
  function (docString) {
    const tree = JSON.parse(docString)
    return createDirectoryTree(tree, this.tempFolder)
  }
)

Given(
  'a script file with the following contents located in the folder {string}:',
  function (pathspec, docString) {
    this.pathToScriptFile = joinPathSegments(this.tempFolder, pathspec, 'script.js')
    return writeFile(
      this.pathToScriptFile,
      docString
    )
  }
)
