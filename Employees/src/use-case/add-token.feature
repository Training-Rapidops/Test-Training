Feature: He

  Scenario Outline: Try To  With invalid syntex of input
    Given Token details employeeId:"<employeeId>", browser:"<browser>", device:"<device>", ipAddress:"<ipAddress>", expireTime:"<expireTime>" while adding token
    When try to add token
    Then it will throw error with message:<message> while adding token
    And addTokenDB function will be called :<addTokenDBFunctionCallCount> while adding employee
    And sign function will be called :<signFunctionCallCount> while adding employee
    And getLocationFromIp function will be called :<getLocationFromIpFunctionCallCount> while adding employee
    And tokenTemplete function will be called :<tokenTempleteFunctionCallCount> while adding employee

    Examples:

      | employeeId                           | browser | device | ipAddress                             | expireTime | message                                                                                                     | addTokenDBFunctionCallCount | signFunctionCallCount | getLocationFromIpFunctionCallCount | tokenTempleteFunctionCallCount |
      |                                      |         |        |                                       |            | '"employeeId" is required'                                                                                  | 0                           | 0                     | 0                                  | 0                              |
      | 12                                   |         |        |                                       |            | '"employeeId" must be a valid GUID'                                                                         | 0                           | 0                     | 0                                  | 0                              |
      | 9c08d1d2-322f-4b95-b43b-184a594027c3 |         |        |                                       |            | '"browser" is required'                                                                                     | 0                           | 0                     | 0                                  | 0                              |
      | 9c08d1d2-322f-4b95-b43b-184a594027c3 | jj      |        |                                       |            | '"browser" length must be at least 3 characters long'                                                       | 0                           | 0                     | 0                                  | 0                              |
      | 9c08d1d2-322f-4b95-b43b-184a594027c3 | mozilla |        |                                       |            | '"device" is required'                                                                                      | 0                           | 0                     | 0                                  | 0                              |
      | 9c08d1d2-322f-4b95-b43b-184a594027c3 | mozilla | jj     |                                       |            | '"device" length must be at least 3 characters long'                                                        | 0                           | 0                     | 0                                  | 0                              |
      | 9c08d1d2-322f-4b95-b43b-184a594027c3 | mozilla | Linux  |                                       |            | '"ipAddress" is required'                                                                                   | 0                           | 0                     | 0                                  | 0                              |
      | 9c08d1d2-322f-4b95-b43b-184a594027c3 | mozilla | Linux  | 123456                                |            | '"ipAddress" must be a valid ip address of one of the following versions [ipv4, ipv6] with a optional CIDR' | 0                           | 0                     | 0                                  | 0                              |
      | 9c08d1d2-322f-4b95-b43b-184a594027c3 | mozilla | Linux  | 2a01:e35:8bd9:8bb0:92b:8628:5ca5:5f2b |            | '"expireTime" is required'                                                                                  | 0                           | 0                     | 0                                  | 0                              |

  Scenario Outline: Try To  With invalid syntex of input
    Given Token details employeeId:"<employeeId>", browser:"<browser>", device:"<device>", ipAddress:"<ipAddress>", expireTime:"<expireTime>" while adding token
    When try to add token
    Then it will give details:'<result>' while adding token
    And addTokenDB function will be called :<addTokenDBFunctionCallCount> while adding employee
    And sign function will be called :<signFunctionCallCount> while adding employee
    And getLocationFromIp function will be called :<getLocationFromIpFunctionCallCount> while adding employee
    And tokenTemplete function will be called :<tokenTempleteFunctionCallCount> while adding employee

    Examples:

      | employeeId                           | browser | device | ipAddress                             | expireTime    | result                                                                                                                                                                                                                               | addTokenDBFunctionCallCount | signFunctionCallCount | getLocationFromIpFunctionCallCount | tokenTempleteFunctionCallCount |
      | 9c08d1d2-322f-4b95-b43b-184a594027c3 | mozilla | Linux  | 2a01:e35:8bd9:8bb0:92b:8628:5ca5:5f2b | 1686303327499 | { "id":"fd7fffd3-af78-4aa9-8aa6-99ea6bf72dee", "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus" } | 1                           | 1                     | 1                                  | 1                              |
