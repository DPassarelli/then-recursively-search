Feature: Basic functionality with one parameter value

  When provided with a file name, this module will return a Promise that
  resolves to the nearest parent folder containing said file, starting at the
  child folder that contains the caller.

  Background:
    Given a directory tree with the following structure:
    """
    {
      "one": {
        "one.txt": "test file",
        "repeat.txt": "test file",
        "two": {
          "two.txt": "test file",
          "repeat.txt": "test file",
          "three": {
            "three.txt": "test file",
            "test.js": "const path = require('path'); const T = require(path.join(process.cwd(), 'index.cjs')); module.exports = T('one.txt')",
            "four": {
            }
          }
        }
      }
    }
    """

  Scenario:
    When executing the script at "one/two/three/test.js"
    Then the promise should resolve to "one/one.txt"
