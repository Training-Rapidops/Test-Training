Feature: 

  Scenario Outline: Try To add employee With invalid syntex of input
    Given employee details limit:"<limit>",offset:"<offset>",companyId:"<companyId>",limitExided:"<limitExided>" and IsEmployeeExists:"<IsEmployeeExists>" to get all employees by company
    When try to get all empployees by company
    Then it will throw an error with message:<message> while getting employees by company
    And getAllEmployeesByCompanyNameDB function will be called :<getAllEmployeesByCompanyNameDBFunctionCallCount> while getting employees by company

    Examples: 
      | limit | offset | companyId | IsEmployeeExists | message                                      | getAllEmployeesByCompanyNameDBFunctionCallCount |
      |       |        |           | false            | '"limit" is required'                        |                                               0 |
      |     0 |        |           | false            | '"limit" must be greater than or equal to 1' |                                               0 |
      |     2 |      0 |           | false            | '"companyId" is required'                    |                                               0 |
      |     2 |      0 | gyug      | false            | '"companyId" must be a valid GUID'           |                                               0 |

  Scenario Outline: Try To add employee With company id that doesn't have any employee information
    Given employee details limit:"<limit>",offset:"<offset>",companyId:"<companyId>",limitExided:"<limitExided>" and IsEmployeeExists:"<IsEmployeeExists>" to get all employees by company
    When try to get all empployees by company
    Then it will throw an error with message:<message> while getting employees by company
    And getAllEmployeesByCompanyNameDB function will be called :<getAllEmployeesByCompanyNameDBFunctionCallCount> while getting employees by company

    Examples: 
      | limit | offset | companyId                            | IsEmployeeExists | message                                                                        | getAllEmployeesByCompanyNameDBFunctionCallCount |
      |     2 |      0 | 1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a | false            | "No employee Data With Company Id: 1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a found" |                                               1 |

  Scenario Outline: Try To add employee With company id that doesn't have any employee information
    Given employee details limit:"<limit>",offset:"<offset>",companyId:"<companyId>",limitExided:"<limitExided>" and IsEmployeeExists:"<IsEmployeeExists>" to get all employees by company
    When try to get all empployees by company
    Then it will throw an error with message:<message> while getting employees by company
    And getAllEmployeesByCompanyNameDB function will be called :<getAllEmployeesByCompanyNameDBFunctionCallCount> while getting employees by company

    Examples: 
      | limit | offset | companyId                            | limitExided | message                                                                        | getAllEmployeesByCompanyNameDBFunctionCallCount |
      |     2 |    500 | 1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a | true        | "No employee Data With Company Id: 1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a found" |                                               1 |

  Scenario Outline: Try To add employee With invalid syntex of input
    Given employee details limit:"<limit>",offset:"<offset>",companyId:"<companyId>",limitExided:"<limitExided>" and IsEmployeeExists:"<IsEmployeeExists>" to get all employees by company
    When try to get all empployees by company
    Then it will give result with employeeDetails:'<employeeDetails>' while getting employees by company
    And getAllEmployeesByCompanyNameDB function will be called :<getAllEmployeesByCompanyNameDBFunctionCallCount> while getting employees by company

    Examples: 
      | limit | offset | companyId                            | IsEmployeeExists | employeeDetails                                                                                                                                                                                                                                                                                                                                                                                                                         | getAllEmployeesByCompanyNameDBFunctionCallCount |
      |     2 |      0 | 1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a | true             | {"1":{"id": "4086f089-af2b-4616-80c1-ae60dd8ba8f6","employee_name": "Deep patel2","company_id": "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a","employee_address": "danilimda,Ahmedabad","employee_role": "Sr. Debveloper"},"2":{"id": "4086f089-af2b-4616-80c1-ae60dd8ba8f6","employee_name": "Deep patel2","company_id": "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a","employee_address": "danilimda,Ahmedabad","employee_role": "Sr. Debveloper"}} |                                               1 |
