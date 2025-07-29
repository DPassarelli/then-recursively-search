Feature: Basic functionality with one parameter value

  When provided with a file name, this module will return a Promise that
  resolves to the nearest parent folder containing said file, starting at the
  child folder that contains the caller.

  Scenario:
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
    And a script file with the following contents located in the folder "parent/child/grandchild":
      """
      const { findRecursively } = await import('../../../../../index.js')
      export default function () {
        return findRecursively('sample.txt')
      }
      """
    When executing the script
    Then the promise should resolve to "parent/child/sample.txt"
