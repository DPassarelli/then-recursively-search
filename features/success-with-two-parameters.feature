Feature: Searching for a known file within a given directory structure

  Background:
    Given an example directory tree with the following structure:
    """
    {
      "one": {
        "one.txt": "test file",
        "one-plus.txt": "test file",
        "two": {
          "two.txt": "test file",
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
    | starting point | to find      | expected                |
    | one/two/three  | three.txt    | one/two/three/three.txt |
    | one/two/three  | two.txt      | one/two/two.txt         |
    | one/two/three  | one-plus.txt | one/one-plus.txt        |
