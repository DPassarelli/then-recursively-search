Feature: When only provided with the name of a file, then this module returns
         the path to the first match it finds under the directory containing
         the calling code.

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
            "four": {
              "test.js": "const path = require('path'); const T = require(path.join(process.cwd(), 'index.js')); module.exports = T('two.txt')"
            }
          }
        }
      }
    }
    """

  Scenario:
    When executing the file at "one/two/three/four/test.js"
    Then the script should return "one/two/two.txt"
