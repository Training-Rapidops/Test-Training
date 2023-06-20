Feature: 

  Scenario Outline: Try to delete company with incorrect syntex of input
    Given company id:"<id>" and isCorrectId:"<isCorrectId>"
    When try to delete company
    Then it will throw an error with message:<message> while deleting company
    And deleteCompanyDB function will be called :<deleteCompanyDBFunctionCallCount> while adding company

    Examples: 
      | id | isCorrectId | message                         | deleteCompanyDBFunctionCallCount |
      |    | false       | '"id" is required'              |                                0 |
      | 77 | false       | "\\"id\\" must be a valid GUID" |                                0 |

  Scenario Outline: Try to delete company with company id that doesn't exists
    Given company id:"<id>" and isCorrectId:"<isCorrectId>"
    When try to delete company
    Then it will throw an error with message:<message> while deleting company
    And deleteCompanyDB function will be called :<deleteCompanyDBFunctionCallCount> while adding company

    Examples: 
      | id                                   | isCorrectId | message                          | deleteCompanyDBFunctionCallCount |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | false       | "Company Already Doesn't Exists" |                                1 |

  Scenario Outline: Try to delete company with correct input
    Given company id:"<id>" and isCorrectId:"<isCorrectId>"
    When try to delete company
    Then it will give affected rows count:'<affectedRows>' while deleting company
    And deleteCompanyDB function will be called :<deleteCompanyDBFunctionCallCount> while adding company

    Examples: 
      | id                                   | isCorrectId | affectedRows       | deleteCompanyDBFunctionCallCount |
      | 6a013a0f-2819-4591-92e3-bd9375a82b25 | true        | {"affectedRows":1} |                                1 |
