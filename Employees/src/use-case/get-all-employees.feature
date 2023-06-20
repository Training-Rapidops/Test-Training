Feature:

  Scenario Outline: Try To get all employees With invalid syntex of input
    Given limit:"<limit>", offset:"<offset>", authToken:"<authToken>", isTokenVarified:"<isTokenVarified>", isTokenExpired:"<isTokenExpired>", isEmployeeExists:"<isEmployeeExists>" and isDataExists:"<isDataExists>" to get all employees
    When try to get all employees employee
    Then it will throw an error with message:<message> while getting all employees
    And getAllEmployeesDB function will be called :<getAllEmployeesDBFunctionCallCount> while getting all employees
    And varifyAuthToken function will be called :<varifyAuthTokenFunctionCallCount> while getting all employees
    And updateJwtExpireTime function will be called :<updateJwtExpireTimeFunctionCallCount> while getting all employees
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting all employees

    Examples:
      | limit | offset | authToken | isTokenVarified | isTokenExpired | isEmployeeExists | isDataExists | message                     | getAllEmployeesDBFunctionCallCount | varifyAuthTokenFunctionCallCount | updateJwtExpireTimeFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      |       |        |           | false           | true           | false            | false        | '"limit" is required'       | 0                                  | 0                                | 0                                    | 0                                      |
      | jj    |        |           | false           | true           | false            | false        | '"limit" must be a number'  | 0                                  | 0                                | 0                                    | 0                                      |
      | 55    | jj     |           | false           | true           | false            | false        | '"offset" must be a number' | 0                                  | 0                                | 0                                    | 0                                      |
      | 55    | 0      |           | false           | true           | false            | false        | '"authToken" is required'   | 0                                  | 0                                | 0                                    | 0                                      |



  Scenario Outline: Try To get all employees With non varified auth token
    Given limit:"<limit>", offset:"<offset>", authToken:"<authToken>", isTokenVarified:"<isTokenVarified>", isTokenExpired:"<isTokenExpired>", isEmployeeExists:"<isEmployeeExists>" and isDataExists:"<isDataExists>" to get all employees
    When try to get all employees employee
    Then it will throw an error with message:<message> while getting all employees
    And getAllEmployeesDB function will be called :<getAllEmployeesDBFunctionCallCount> while getting all employees
    And varifyAuthToken function will be called :<varifyAuthTokenFunctionCallCount> while getting all employees
    And updateJwtExpireTime function will be called :<updateJwtExpireTimeFunctionCallCount> while getting all employees
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting all employees

    Examples:
      | limit | offset | authToken                                                                                                                                                                 | isTokenVarified | isTokenExpired | isEmployeeExists | isDataExists | message                    | getAllEmployeesDBFunctionCallCount | varifyAuthTokenFunctionCallCount | updateJwtExpireTimeFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      | 55    | 0      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODY2NTg1MzgyNTB9.D6ahr0J6CEoyw5VocGA-LDCdgCs7ucbkqqoUxL3xjsc | false           | true           | false            | false        | 'Cannot verify auth token' | 0                                  | 1                                | 0                                    | 0                                      |



  Scenario Outline: Try To get all employees With expiered auth token
    Given limit:"<limit>", offset:"<offset>", authToken:"<authToken>", isTokenVarified:"<isTokenVarified>", isTokenExpired:"<isTokenExpired>", isEmployeeExists:"<isEmployeeExists>" and isDataExists:"<isDataExists>" to get all employees
    When try to get all employees employee
    Then it will throw an error with message:<message> while getting all employees
    And getAllEmployeesDB function will be called :<getAllEmployeesDBFunctionCallCount> while getting all employees
    And varifyAuthToken function will be called :<varifyAuthTokenFunctionCallCount> while getting all employees
    And updateJwtExpireTime function will be called :<updateJwtExpireTimeFunctionCallCount> while getting all employees
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting all employees

    Examples:
      | limit | offset | authToken                                                                                                                                                                 | isTokenVarified | isTokenExpired | isEmployeeExists | isDataExists | message                                                                   | getAllEmployeesDBFunctionCallCount | varifyAuthTokenFunctionCallCount | updateJwtExpireTimeFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      | 55    | 0      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODY2NTg1MzgyNTB9.D6ahr0J6CEoyw5VocGA-LDCdgCs7ucbkqqoUxL3xjsc | true            | true           | false            | false        | 'Your Authorization credentials have expired, please login and try again' | 0                                  | 1                                | 0                                    | 0                                      |



  # Scenario Outline: Try To get all employees With auth token of non existing employee
  #   Given limit:"<limit>", offset:"<offset>", authToken:"<authToken>", isTokenVarified:"<isTokenVarified>", isTokenExpired:"<isTokenExpired>", isEmployeeExists:"<isEmployeeExists>" and isDataExists:"<isDataExists>" to get all employees
  #   When try to get all employees employee
  #   Then it will throw an error with message:<message> while getting all employees
  #   And getAllEmployeesDB function will be called :<getAllEmployeesDBFunctionCallCount> while getting all employees
  #   And varifyAuthToken function will be called :<varifyAuthTokenFunctionCallCount> while getting all employees
  #   And updateJwtExpireTime function will be called :<updateJwtExpireTimeFunctionCallCount> while getting all employees
  #   And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting all employees

  #   Examples:
  #     | limit | offset | authToken                                                                                                                                                                 | isTokenVarified | isTokenExpired | isEmployeeExists | isDataExists | message                                                | getAllEmployeesDBFunctionCallCount | varifyAuthTokenFunctionCallCount | updateJwtExpireTimeFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
  #     | 55    | 0      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODY2NTg1MzgyNTB9.D6ahr0J6CEoyw5VocGA-LDCdgCs7ucbkqqoUxL3xjsc | true            | false          | false            | false        | 'You Are currently Not Authorized to access this data' | 0                                  | 0                                | 0                                    | 0                                      |


  Scenario Outline: Try To get all employees With non existing data
    Given limit:"<limit>", offset:"<offset>", authToken:"<authToken>", isTokenVarified:"<isTokenVarified>", isTokenExpired:"<isTokenExpired>", isEmployeeExists:"<isEmployeeExists>" and isDataExists:"<isDataExists>" to get all employees
    When try to get all employees employee
    Then it will throw an error with message:<message> while getting all employees
    And getAllEmployeesDB function will be called :<getAllEmployeesDBFunctionCallCount> while getting all employees
    And varifyAuthToken function will be called :<varifyAuthTokenFunctionCallCount> while getting all employees
    And updateJwtExpireTime function will be called :<updateJwtExpireTimeFunctionCallCount> while getting all employees
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting all employees

    Examples:
      | limit | offset | authToken                                                                                                                                                                 | isTokenVarified | isTokenExpired | isEmployeeExists | isDataExists | message                  | getAllEmployeesDBFunctionCallCount | varifyAuthTokenFunctionCallCount | updateJwtExpireTimeFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      | 55    | 0      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODY2NTg1MzgyNTB9.D6ahr0J6CEoyw5VocGA-LDCdgCs7ucbkqqoUxL3xjsc | true            | false          | true             | false        | 'No Emoloyee data Found' | 1                                  | 1                                | 0                                    | 0                                      |




  Scenario Outline: Try To get all employees With valid input
    Given limit:"<limit>", offset:"<offset>", authToken:"<authToken>", isTokenVarified:"<isTokenVarified>", isTokenExpired:"<isTokenExpired>", isEmployeeExists:"<isEmployeeExists>" and isDataExists:"<isDataExists>" to get all employees
    When try to get all employees employee
    Then it will give result with result:'<result>' while getting all employees
    And getAllEmployeesDB function will be called :<getAllEmployeesDBFunctionCallCount> while getting all employees
    And varifyAuthToken function will be called :<varifyAuthTokenFunctionCallCount> while getting all employees
    And updateJwtExpireTime function will be called :<updateJwtExpireTimeFunctionCallCount> while getting all employees
    And getCompanyDetailsCall function will be called :<getCompanyDetailsCallFunctionCallCount> while getting all employees

    Examples:
      | limit | offset | authToken                                                                                                                                                                 | isTokenVarified | isTokenExpired | isEmployeeExists | isDataExists | result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | getAllEmployeesDBFunctionCallCount | varifyAuthTokenFunctionCallCount | updateJwtExpireTimeFunctionCallCount | getCompanyDetailsCallFunctionCallCount |
      | 55    | 0      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODY2NTg1MzgyNTB9.D6ahr0J6CEoyw5VocGA-LDCdgCs7ucbkqqoUxL3xjsc | true            | false          | true             | true         | {"1":{"id": "38bc08cc-4e9f-4767-a0ea-13b8df987bff","employee_name": "Safi Shaikh","employee_password": "$2b$10$o8BtP8BGkq1FlLW9viFqCevaSc44E9wJIv0I5kOVO9AKTMbMnngxq","employee_email": "safishaikh401@gmail.com","company_id": "5278c30f-e990-4bf3-8e0a-3ea653e43afd","employee_address": "Satelite Road","employee_role": "CEO","is_varified": true,"companyDetails": {"id": "5278c30f-e990-4bf3-8e0a-3ea653e43afd","company_name": "Rapid2","company_address": "kjxhshx","contect_no": "9876543210","contect_email": "Safi.shaikh360@gmail.com"}}, "2": {"id": "9c08d1d2-322f-4b95-b43b-184a594027c3","employee_name": "Ronana The Excuser","employee_password": "$2b$10$05ZbncpOt45CixdrCeE5Iu4/pZ2HVpnXn807QuJckX62AQGkfT7iu","employee_email": "Safi.shaikh360@gmail.com","company_id": "5278c30f-e990-4bf3-8e0a-3ea653e43afd","employee_address": "Satelite Road","employee_role": "owner","is_varified": true,"companyDetails":{"id": "5278c30f-e990-4bf3-8e0a-3ea653e43afd","company_name": "Rapid2","company_address": "kjxhshx","contect_no": "9876543210","contect_email": "Safi.shaikh360@gmail.com"}}} | 1                                  | 1                                | 1                                    | 2                                      |
