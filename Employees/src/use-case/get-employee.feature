Feature: 

  Scenario Outline: Try To get employee With invalid syntex of input
    Given employee details id:"<id>", isEmployeeExists:"<isEmployeeExists>" and isCompanyExists:"<isCompanyExists>" to get employee
    When try to get employee
    Then it will throw an error with message:<message> while getting employee
    And getEmployeeDB function will be called :<getEmployeeDBFunctionCallCount> while getting employee
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting employee

    Examples: 
      | id      | isEmployeeExists | isCompanyExists | message                     | getEmployeeDBFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      |         | false            | false           | '"id" is required'          |                              0 |                                      0 |
      | vytug6t | false            | false           | '"id" must be a valid GUID' |                              0 |                                      0 |

  Scenario Outline: Try To get employee With employee id that desn't exists
    Given employee details id:"<id>", isEmployeeExists:"<isEmployeeExists>" and isCompanyExists:"<isCompanyExists>" to get employee
    When try to get employee
    Then it will throw an error with message:<message> while getting employee
    And getEmployeeDB function will be called :<getEmployeeDBFunctionCallCount> while getting employee
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting employee

    Examples: 
      | id                                   | isEmployeeExists | isCompanyExists | message                                                                | getEmployeeDBFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      | 4086f089-af2b-4616-80c1-ae60dd8ba8f6 | false            | false           | "Employee With id 4086f089-af2b-4616-80c1-ae60dd8ba8f6 doesn't Exists" |                              1 |                                      0 |

  Scenario Outline: Try To get employee With company id that desn't exists
    Given employee details id:"<id>", isEmployeeExists:"<isEmployeeExists>" and isCompanyExists:"<isCompanyExists>" to get employee
    When try to get employee
    Then it will throw an error with message:<message> while getting employee
    And getEmployeeDB function will be called :<getEmployeeDBFunctionCallCount> while getting employee
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting employee

    Examples: 
      | id                                   | isEmployeeExists | isCompanyExists | message                                                               | getEmployeeDBFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      | 4086f089-af2b-4616-80c1-ae60dd8ba8f6 | true             | false           | "Company with id e03d7be7-eff9-4b5b-bc79-e7f2288dff5f doesn't exists" |                              1 |                                      1 |

  Scenario Outline: Try To get employee With valid input parameters
    Given employee details id:"<id>", isEmployeeExists:"<isEmployeeExists>" and isCompanyExists:"<isCompanyExists>" to get employee
    When try to get employee
    Then it will give result with employeeDetails:'<employeeDetails>' while getting employee
    And getEmployeeDB function will be called :<getEmployeeDBFunctionCallCount> while getting employee
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting employee

    Examples: 
      | id                                   | isEmployeeExists | isCompanyExists | employeeDetails                                                                                                                                                                                                                                                                                                                                                                                   | getEmployeeDBFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      | 4086f089-af2b-4616-80c1-ae60dd8ba8f6 | true             | true            | {"id": "4086f089-af2b-4616-80c1-ae60dd8ba8f6","employee_name": "Deep patel2","company_id": "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a","employee_address": "danilimda,Ahmedabad","employee_role": "Sr. Debveloper","companyDetails": {"id": "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a","company_name": "aaaa","company_address": "kjxhshx","contect_no": "9876543210","contect_email": "email2@mail.com"}} |                              1 |                                      1 |
