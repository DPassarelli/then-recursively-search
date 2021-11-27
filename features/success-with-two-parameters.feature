Feature: Basic functionality with two parameter values

  When provided with a child folder and file name, this module will return a
  Promise that resolves to the nearest parent folder containing said file.

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
            "four": {}
          }
        }
      }
    }
    """

  Scenario Template:
    When searching for file "<to find>" in folder "<starting point>"
    Then the promise should resolve to "<expected>"

    Scenarios:
    | starting point      | to find      | expected                |
    | one/two/three       | three.txt    | one/two/three/three.txt |
    | one/two/three       | two.txt      | one/two/two.txt         |
    | one/two/three       | one.txt      | one/one.txt             |
    | one/two/three/four  | two.txt      | one/two/two.txt         |


  Rule: The first matching file must be returned.
    Scenario:
      When searching for file "repeat.txt" in folder "one/two/three/four"
      Then the promise should resolve to "one/two/repeat.txt"

    Scenario:
      When searching for file "repeat.txt" in folder "one/two"
      Then the promise should resolve to "one/two/repeat.txt"
