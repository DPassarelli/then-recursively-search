const { After, Given } = require('@cucumber/cucumber')
const mockFs = require('mock-fs')

After(function () {
  mockFs.restore()
})

Given('an example directory tree with the following structure:', function (docString) {
  mockFs.restore()

  const directoryTree = JSON.parse(docString)
  mockFs(directoryTree)
})