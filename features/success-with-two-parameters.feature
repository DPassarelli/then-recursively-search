Feature: This module returns the path to the first matching file it finds.

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
    Then the module should return "<expected>"

    Scenarios:
    | starting point      | to find      | expected                |
    | one/two/three       | three.txt    | one/two/three/three.txt |
    | one/two/three       | two.txt      | one/two/two.txt         |
    | one/two/three       | one.txt      | one/one.txt             |
    | one/two/three/four  | two.txt      | one/two/two.txt         |


  Rule: The first matching file must be returned.
    Scenario:
      When searching for file "repeat.txt" in folder "one/two/three/four"
      Then the module should return "one/two/repeat.txt"
