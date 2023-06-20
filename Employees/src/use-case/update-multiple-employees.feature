Feature:

  Scenario Outline: Try To update multiple employee data With invalid syntex of input
    Given data that needs to be updated:'<updateData>', isDataExists:"<isDataExists>" to update multiple employee data
    When try to update multiple employee data
    Then it will throw an error with message:<message> while updating multiple employee data
    And updateMultipleEmployeesDB function will be called :<updateMultipleEmployeesDBFunctionCallCount> while updating multiple employee data

    Examples:
      | updateData                                                                                             | isDataExists | message                                                                                                       | updateMultipleEmployeesDBFunctionCallCount |
      | []                                                                                                     | false        | '"value" must contain at least 1 items'                                                                       | 0                                          |
      | ["suhciu"]                                                                                             | false        | '"[0]" must be of type object'                                                                                | 0                                          |
      | [{"suhciu":"njhbdc"}]                                                                                  | false        | '"[0].id" is required'                                                                                        | 0                                          |
      | [{"id":"njhbdc"}]                                                                                      | false        | '"[0].id" must be a valid GUID'                                                                               | 0                                          |
      | [{"id":"9c08d1d2-322f-4b95-b43b-184a594027c3"}]                                                        | false        | '"[0]" must contain at least one of [employeeName, employeeEmail, employeeAddress, employeeRole, isVarified]' | 0                                          |
      | [{"id":"9c08d1d2-322f-4b95-b43b-184a594027c3","employeeName": "jj"}]                                   | false        | '"[0].employeeName" length must be at least 3 characters long'                                                | 0                                          |
      | [{"id":"9c08d1d2-322f-4b95-b43b-184a594027c3","employeeEmail": "jj"}]                                  | false        | '"[0].employeeEmail" must be a valid email'                                                                   | 0                                          |
      | [{"id":"9c08d1d2-322f-4b95-b43b-184a594027c3","employeeAddress": "jj"}]                                | false        | '"[0].employeeAddress" length must be at least 5 characters long'                                             | 0                                          |
      | [{"id":"9c08d1d2-322f-4b95-b43b-184a594027c3","employeeRole": "jj"}]                                   | false        | '"[0].employeeRole" length must be at least 3 characters long'                                                | 0                                          |
      | [{"id":"9c08d1d2-322f-4b95-b43b-184a594027c3","isVarified": "jj"}]                                     | false        | '"[0].isVarified" must be a boolean'                                                                          | 0                                          |
      | [{"id":"9c08d1d2-322f-4b95-b43b-184a594027c3","employeeName": "Ronana The Excuser","address":"djdjd"}] | false        | '"[0].address" is not allowed'                                                                                | 0                                          |



  Scenario Outline: Try To update multiple employee data With non existing data of given id
    Given data that needs to be updated:'<updateData>', isDataExists:"<isDataExists>" to update multiple employee data
    When try to update multiple employee data
    Then it will throw an error with message:<message> while updating multiple employee data
    And updateMultipleEmployeesDB function will be called :<updateMultipleEmployeesDBFunctionCallCount> while updating multiple employee data

    Examples:
      | updateData                                                                                                                                                            | isDataExists | message                             | updateMultipleEmployeesDBFunctionCallCount |
      | [  {"id": "9c08d1d2-322f-4b95-b43b-184a594027c3","employeeName": "Ronana The Excuser"},{"id": "b85bc33a-bf23-4655-9bf1-62931337ab6f","employeeAddress": "Ahmedabad"}] | false        | 'No employees found with given ids' | 1                                          |


  Scenario Outline: Try To update multiple employee data With valid input
    Given data that needs to be updated:'<updateData>', isDataExists:"<isDataExists>" to update multiple employee data
    When try to update multiple employee data
    Then it will give result with affectedRows:'<affectedRows>' while updating multiple employee data
    And updateMultipleEmployeesDB function will be called :<updateMultipleEmployeesDBFunctionCallCount> while updating multiple employee data

    Examples:
      | updateData                                                                                                                                                            | isDataExists | affectedRows       | updateMultipleEmployeesDBFunctionCallCount |
      | [  {"id": "9c08d1d2-322f-4b95-b43b-184a594027c3","employeeName": "Ronana The Excuser"},{"id": "b85bc33a-bf23-4655-9bf1-62931337ab6f","employeeAddress": "Ahmedabad"}] | true         | {"affectedRows":2} | 1                                          |
