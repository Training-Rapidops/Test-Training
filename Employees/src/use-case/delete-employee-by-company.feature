Feature: 

  Scenario Outline: Try To delete employee  by compoany name With invalid syntex of input
    Given company details companyId:"<companyId>" isEmployeeExist:"<isEmployeeExist>" to delete employee by company
    When try to delete employee by company
    Then it will throw an error with message:<message> while deleting employee by company
    And deleteEmployeesByCompanyDB function will be called :<deleteEmployeesByCompanyDBFunctionCallCount> while deleting employee by company

    Examples: 
      | companyId | isEmployeeExist | message                            | deleteEmployeesByCompanyDBFunctionCallCount |
      |           |                 | '"companyId" is required'          |                                           0 |
      | hjgs      |                 | '"companyId" must be a valid GUID' |                                           0 |

  Scenario Outline: Try To delete employee by compoany name With employee that doesn't exits
    Given company details companyId:"<companyId>" isEmployeeExist:"<isEmployeeExist>" to delete employee by company
    When try to delete employee by company
    Then it will throw an error with message:<message> while deleting employee by company
    And deleteEmployeesByCompanyDB function will be called :<deleteEmployeesByCompanyDBFunctionCallCount> while deleting employee by company

    Examples: 
      | companyId                            | isEmployeeExist | message                                                                    | deleteEmployeesByCompanyDBFunctionCallCount |
      | e03d7be7-eff9-4b5b-bc79-e7f2288dff5f | false           | "No Employees With Company id e03d7be7-eff9-4b5b-bc79-e7f2288dff5f Exists" |                                           1 |

  Scenario Outline: Try To delete employee  by compoany name With valid input
    Given company details companyId:"<companyId>" isEmployeeExist:"<isEmployeeExist>" to delete employee by company
    When try to delete employee by company
    Then it will give affected Rows:'<affectedRows>' while deleting employee by company
    And deleteEmployeesByCompanyDB function will be called :<deleteEmployeesByCompanyDBFunctionCallCount> while deleting employee by company

    Examples: 
      | companyId                            | isEmployeeExist | affectedRows       | deleteEmployeesByCompanyDBFunctionCallCount |
      | e03d7be7-eff9-4b5b-bc79-e7f2288dff5f | true            | {"affectedRows":2} |                                           1 |
