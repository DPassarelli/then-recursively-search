Feature: Basic functionality with two parameter values

  When provided with a child folder and file name, this module will return a
  Promise that resolves to the nearest parent folder containing said file.

  Background:
    Given a directory tree with the following structure:
    """
    {
      "parent": {
        "first.txt": "test file",
        "repeat.txt": "test file",
        "child": {
          "second.txt": "test file",
          "repeat.txt": "test file",
          "grandchild": {
            "third.txt": "test file",
            "great-grandchild": {}
          }
        }
      }
    }
    """

  Scenario Template:
    When searching for file "<to find>" in folder "<starting point>"
    Then the promise should resolve to "<expected>"

    Scenarios:
    | starting point                            | to find     | expected                           |
    | parent/child/grandchild                   | third.txt   | parent/child/grandchild/third.txt  |
    | parent/child/grandchild                   | second.txt  | parent/child/second.txt            |
    | parent/child/grandchild                   | first.txt   | parent/first.txt                   |
    | parent/child/grandchild/great-grandchild  | second.txt  | parent/child/second.txt            |


  Rule: The first matching file must be returned.
    Scenario:
      When searching for file "repeat.txt" in folder "parent/child/grandchild/great-grandchild"
      Then the promise should resolve to "parent/child/repeat.txt"

    Scenario:
      When searching for file "repeat.txt" in folder "parent/child"
      Then the promise should resolve to "parent/child/repeat.txt"

  Rule: Casing is not significant (for the filename).
    Scenario:
      When searching for file "SECOND.TXT" in folder "parent/child/grandchild"
      Then the promise should resolve to "parent/child/second.txt"
