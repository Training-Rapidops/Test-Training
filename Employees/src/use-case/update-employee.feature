Feature:

  Scenario Outline: Try To update employee With employee id that doesn't exists
    Given employee details id:"<id>", address:"<address>", role:"<role>" and isEmployeeExist:"<isEmployeeExist>" to update employee
    When try to update employee
    Then it will throw an error with message:<message> while updating employee
    And employeeTemplet function will be called :<employeeTempletFunctionCallCount> while updating employee
    And updateEmployeeDB function will be called :<updateEmployeeDBFunctionCallCount> while updating employee

    Examples:
      | id                                   | address       | role | isEmployeeExist | updateEmployeeDBFunctionCallCount | employeeTempletFunctionCallCount | message                                                |
      |                                      |               |      | false           | 0                                 | 0                                | '"id" is required'                                     |
      | hdhd                                 |               |      | false           | 0                                 | 0                                | '"id" must be a valid GUID'                            |
      | 4086f089-af2b-4616-80c1-ae60dd8ba8f6 |               |      | false           | 0                                 | 0                                | '"value" must contain at least one of [address, role]' |
      | 4086f089-af2b-4616-80c1-ae60dd8ba8f6 | hshs          |      | false           | 0                                 | 0                                | '"address" length must be at least 5 characters long'  |
      | 4086f089-af2b-4616-80c1-ae60dd8ba8f6 | satelite Road | hs   | false           | 0                                 | 0                                | '"role" length must be at least 3 characters long'     |

  Scenario Outline: Try To update employee With invalid syntex of input
    Given employee details id:"<id>", address:"<address>", role:"<role>" and isEmployeeExist:"<isEmployeeExist>" to update employee
    When try to update employee
    Then it will throw an error with message:<message> while updating employee
    And employeeTemplet function will be called :<employeeTempletFunctionCallCount> while updating employee
    And updateEmployeeDB function will be called :<updateEmployeeDBFunctionCallCount> while updating employee

    Examples:
      | id                                   | address       | role      | isEmployeeExist | updateEmployeeDBFunctionCallCount | employeeTempletFunctionCallCount | message                                                                |
      | 4086f089-af2b-4616-80c1-ae60dd8ba8f6 | satelite Road | Developer | false           | 1                                 | 1                                | "Employee With id 4086f089-af2b-4616-80c1-ae60dd8ba8f6 doesn't Exists" |

  Scenario Outline: Try To update employee With valid set of input parameters
    Given employee details id:"<id>", address:"<address>", role:"<role>" and isEmployeeExist:"<isEmployeeExist>" to update employee
    When try to update employee
    Then it will give result affected rows :'<affectedRows>' while updating employee
    And employeeTemplet function will be called :<employeeTempletFunctionCallCount> while updating employee
    And updateEmployeeDB function will be called :<updateEmployeeDBFunctionCallCount> while updating employee

    Examples:
      | id                                   | address       | role      | isEmployeeExist | updateEmployeeDBFunctionCallCount | employeeTempletFunctionCallCount | affectedRows       |
      | 4086f089-af2b-4616-80c1-ae60dd8ba8f6 | satelite Road | Developer | true            | 1                                 | 1                                | {"affectedRows":1} |
