Feature: Rejections

  When any of the following rules are not met, the module will return a Promise
  that is rejected with the given reason.

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
    Background:
      Given a directory tree with the following structure:
        """
        {
          "parent": {
            "child": {
              "sample.txt": "",
              "grandchild": {
                "test.txt": ""
              }
            }
          }
        }
        """

    Scenario Template:
      When searching for file "<file>" in folder "<starting point>"
      Then the promise should be rejected with "file not found"

    Scenarios:
    | file       | starting point          |
    | test.txt   | parent/child            |
    | test.txt   | parent/child/dne        |
    | dne.txt    | parent/child/grandchild |
