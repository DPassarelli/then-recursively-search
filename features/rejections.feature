Feature: Rejections

  When any of the following rules are not met, the module will return a Promise
  that is rejected with the given reason.

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
            "test.js": "const path = require('path'); const T = require(path.join(process.cwd(), 'index.js')); module.exports = T('one.txt')",
            "four": {
            }
          }
        },
        "twos-compliment": {
          "three.txt": "test file"
        }
      }
    }
    """

  Rule: At least one parameter must be specified.
    Scenario:
      When calling the exported function with no parameters
      Then the promise should be rejected with "the \"filename\" parameter is required"

  Rule: The "filename" parameter must be a string.
    Scenario Template:
      When calling the exported function with parameter of type "<type>"
      Then the promise should be rejected with "the \"filename\" parameter must be a string value"

      Scenarios:
      | type                |
      | null                |
      | Date                |
      | Object literal      |
      | Array literal       |
      | Promise             |

  Rule: If specified, the "startIn" parameter must be an absolute path.
    Scenario:
      When calling the exported function with a relative path
      Then the promise should be rejected with "if specified, the \"startIn\" parameter must be an absolute path"

  Rule: The file must exist in one of the direct ancestor folders.
    Scenario Template:
      When searching for file "three.txt" in folder "<starting point>"
      Then the promise should be rejected with "file not found"

    Scenarios:
    | starting point    |
    | one/two           |
    | one/two/fifty     |

  Rule: The file must exist in one of the parent folders.
    Scenario:
      When searching for file "three.txt" in folder "one/two"
      Then the promise should be rejected with "file not found"
