Feature:

  Scenario Outline: Try To update jwt token With invalid syntex of input
    Given auth token:"<authToken>" and isTokenValid:"<isTokenValid>" to update jwt expire time
    When try to update jwt expire time
    Then it will throw an error with message:<message> while updating jwt expre time
    And updateTokenDB function will be called :<updateTokenDBFunctionCallCount> while updating jwt expre time

    Examples:
      | authToken       | isTokenValid | message                     | updateTokenDBFunctionCallCount |
      # |                 | false        |                             | 0                              |
      |                 | false        | 'Invalid auth Token syntex' | 0                              |
      | jhgcigcidsgcids | false        | 'Invalid auth Token syntex' | 0                              |

  Scenario Outline: Try To update jwt token With invalid auth token
    Given auth token:"<authToken>" and isTokenValid:"<isTokenValid>" to update jwt expire time
    When try to update jwt expire time
    Then it will throw an error with message:<message> while updating jwt expre time
    And updateTokenDB function will be called :<updateTokenDBFunctionCallCount> while updating jwt expre time

    Examples:
      | authToken                                                                                                                                                                 | isTokenValid | message                                             | updateTokenDBFunctionCallCount |
      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus | false        | 'Could not update ExpireTime with given auth token' | 1                              |


  Scenario Outline: Try To update jwt token With valid auth token
    Given auth token:"<authToken>" and isTokenValid:"<isTokenValid>" to update jwt expire time
    When try to update jwt expire time
    Then it will give result with affected Rows count:'<affectedRows>' while updating jwt expre time
    And updateTokenDB function will be called :<updateTokenDBFunctionCallCount> while updating jwt expre time

    Examples:
      | authToken                                                                                                                                                                 | isTokenValid | affectedRows       | updateTokenDBFunctionCallCount |
      | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus | true         | {"affectedRows":1} | 1                              |
