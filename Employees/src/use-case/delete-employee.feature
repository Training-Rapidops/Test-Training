Feature: 

  Scenario Outline: Try To add employee With invalid syntex of input
    Given employee detail id:"<id>" and isEmployeeExist:"<isEmployeeExist>" to delete employee
    When try to delete employee
    Then it will throw an error with message:<message> while deleting employee
    And deleteEmployeeDB function will be called :<deleteEmployeeDBFunctionCallCount> while deleting employee

    Examples: 
      | id   | isEmployeeExist | message                     | deleteEmployeeDBFunctionCallCount |
      |      |                 | '"id" is required'          |                                 0 |
      | hjgs |                 | '"id" must be a valid GUID' |                                 0 |

  Scenario Outline: Try To add employee With Employee that doesnot exitsts syntex of input
    Given employee detail id:"<id>" and isEmployeeExist:"<isEmployeeExist>" to delete employee
    When try to delete employee
    Then it will throw an error with message:<message> while deleting employee
    And deleteEmployeeDB function will be called :<deleteEmployeeDBFunctionCallCount> while deleting employee

    Examples: 
      | id                                   | isEmployeeExist | message                                                                             | deleteEmployeeDBFunctionCallCount |
      | e03d7be7-eff9-4b5b-bc79-e7f2288dff5f | false           | "Employee With Given Id:e03d7be7-eff9-4b5b-bc79-e7f2288dff5f Already Doesnt exists" |                                 1 |

  Scenario Outline: Try To add employee With invalid syntex of input
    Given employee detail id:"<id>" and isEmployeeExist:"<isEmployeeExist>" to delete employee
    When try to delete employee
    Then it will give affected Rows:'<affectedRows>' while deleting employee
    And deleteEmployeeDB function will be called :<deleteEmployeeDBFunctionCallCount> while deleting employee

    Examples: 
      | id                                   | isEmployeeExist | affectedRows       | deleteEmployeeDBFunctionCallCount |
      | e03d7be7-eff9-4b5b-bc79-e7f2288dff5f | true            | {"affectedRows":1} |                                 1 |
