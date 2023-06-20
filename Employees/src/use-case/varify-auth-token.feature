Feature:

  Scenario Outline: Try To varify auth token With invalid syntex of input
    Given auth token:"<authToken>", isTokenValid:"<isTokenValid>", isEmployeeExists:"<isEmployeeExists>", isTokenExpired:"<isTokenExpired>" to varify auth token
    When try to varify auth token
    Then it will throw an error with message:<message> while varifying auth token
    And varify function will be called :<varifyFunctionCallCount> while varifying auth token
    And getTokenByEmpId function will be called :<getTokenByEmpIdFunctionCallCount> while varifying auth token

    Examples:
      | authToken | isTokenValid | isEmployeeExists | isTokenExpired | message                     | varifyFunctionCallCount | getTokenByEmpIdFunctionCallCount |
      |           | false        | false            | false          | 'Invalid auth Token syntex' | 0                       | 0                                |
      | hjciiucuc | false        | false            | false          | 'Invalid auth Token syntex' | 0                       | 0                                |

  Scenario Outline: Try To varify auth token With invalid auth token
    Given auth token:"<authToken>", isTokenValid:"<isTokenValid>", isEmployeeExists:"<isEmployeeExists>", isTokenExpired:"<isTokenExpired>" to varify auth token
    When try to varify auth token
    Then it will throw an error with message:<message> while varifying auth token
    And varify function will be called :<varifyFunctionCallCount> while varifying auth token
    And getTokenByEmpId function will be called :<getTokenByEmpIdFunctionCallCount> while varifying auth token

    Examples:
      | authToken                                                                                                                                                                 | isTokenValid | isEmployeeExists | isTokenExpired | message                    | varifyFunctionCallCount | getTokenByEmpIdFunctionCallCount |
      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus | false        | false            | false          | 'Cannot verify auth token' | 1                       | 0                                |



  Scenario Outline: Try To varify auth token With auth token of employee that doesn't exists
    Given auth token:"<authToken>", isTokenValid:"<isTokenValid>", isEmployeeExists:"<isEmployeeExists>", isTokenExpired:"<isTokenExpired>" to varify auth token
    When try to varify auth token
    Then it will throw an error with message:<message> while varifying auth token
    And varify function will be called :<varifyFunctionCallCount> while varifying auth token
    And getTokenByEmpId function will be called :<getTokenByEmpIdFunctionCallCount> while varifying auth token

    Examples:
      | authToken                                                                                                                                                                 | isTokenValid | isEmployeeExists | isTokenExpired | message                                                | varifyFunctionCallCount | getTokenByEmpIdFunctionCallCount |
      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus | true         | false            | false          | 'You Are currently Not Authorized to access this data' | 1                       | 1                                |


  Scenario Outline: Try To varify auth token With auth token of employee that doesn't exists
    Given auth token:"<authToken>", isTokenValid:"<isTokenValid>", isEmployeeExists:"<isEmployeeExists>", isTokenExpired:"<isTokenExpired>" to varify auth token
    When try to varify auth token
    Then it will throw an error with message:<message> while varifying auth token
    And varify function will be called :<varifyFunctionCallCount> while varifying auth token
    And getTokenByEmpId function will be called :<getTokenByEmpIdFunctionCallCount> while varifying auth token

    Examples:
      | authToken                                                                                                                                                                 | isTokenValid | isEmployeeExists | isTokenExpired | message                                                                   | varifyFunctionCallCount | getTokenByEmpIdFunctionCallCount |
      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus | true         | true             | false          | 'Your Authorization credentials have expired, please login and try again' | 1                       | 1                                |


  Scenario Outline: Try To varify auth token With valid input
    Given auth token:"<authToken>", isTokenValid:"<isTokenValid>", isEmployeeExists:"<isEmployeeExists>", isTokenExpired:"<isTokenExpired>" to varify auth token
    When try to varify auth token
    Then it will give result with answer:<answer> while varifying auth token
    And varify function will be called :<varifyFunctionCallCount> while varifying auth token
    And getTokenByEmpId function will be called :<getTokenByEmpIdFunctionCallCount> while varifying auth token

    Examples:
      | authToken                                                                                                                                                                 | isTokenValid | isEmployeeExists | isTokenExpired | answer | varifyFunctionCallCount | getTokenByEmpIdFunctionCallCount |
      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus | true         | true             | true           | 'true' | 1                       | 1                                |
