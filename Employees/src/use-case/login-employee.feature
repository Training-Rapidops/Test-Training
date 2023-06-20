Feature:

  Scenario Outline: Try To log in employee With invalid syntex of input
    Given email:"<email>", password:"<password>", isEmployeeExists:"<isEmployeeExists>", isPasswordCorrect:"<isPasswordCorrect>" and isUserVarified:"<isUserVarified>" to login employee
    When try to login employee
    Then it will throw an error with message:<message> while logging in employee
    And compare function will be called :<compareFunctionCallCount> while logging in employee
    And getEmployeeByEmailDB function will be called :<getEmployeeByEmailDBFunctionCallCount>  logging in employee

    Examples:
      | email                     | password                   | isEmployeeExists | isPasswordCorrect | isUserVarified | message                                                                                                                       | compareFunctionCallCount | getEmployeeByEmailDBFunctionCallCount |
      |                           |                            | false            | false             | false          | '"email" is required'                                                                                                         | 0                        | 0                                     |
      | abcd                      |                            | false            | false             | false          | '"email" must be a valid email'                                                                                               | 0                        | 0                                     |
      | investerstocker@gmail.com |                            | false            | false             | false          | '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters' | 0                        | 0                                     |
      | investerstocker@gmail.com | abc                        | false            | false             | false          | '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters' | 0                        | 0                                     |
      | investerstocker@gmail.com | abcdefghijklmnopqrstuvwxyz | false            | false             | false          | '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters' | 0                        | 0                                     |
      | investerstocker@gmail.com | abcdefghi                  | false            | false             | false          | '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters' | 0                        | 0                                     |
      | investerstocker@gmail.com | ABCDEFGHI                  | false            | false             | false          | '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters' | 0                        | 0                                     |
      | investerstocker@gmail.com | abcdEFGHI                  | false            | false             | false          | '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters' | 0                        | 0                                     |
      | investerstocker@gmail.com | abcd1234                   | false            | false             | false          | '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters' | 0                        | 0                                     |
      | investerstocker@gmail.com | ABCD1234                   | false            | false             | false          | '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters' | 0                        | 0                                     |


  Scenario Outline: Try To log in employee With employee email that doesn't exists
    Given email:"<email>", password:"<password>", isEmployeeExists:"<isEmployeeExists>", isPasswordCorrect:"<isPasswordCorrect>" and isUserVarified:"<isUserVarified>" to login employee
    When try to login employee
    Then it will throw an error with message:<message> while logging in employee
    And compare function will be called :<compareFunctionCallCount> while logging in employee
    And getEmployeeByEmailDB function will be called :<getEmployeeByEmailDBFunctionCallCount>  logging in employee

    Examples:
      | email                     | password   | isEmployeeExists | isPasswordCorrect | isUserVarified | message                                                   | compareFunctionCallCount | getEmployeeByEmailDBFunctionCallCount |
      | investerstocker@gmail.com | 123456afaA | false            | false             | false          | 'Employee With Email investerstocker@gmail.com not found' | 0                        | 1                                     |



  Scenario Outline: Try To log in employee With incorrect password
    Given email:"<email>", password:"<password>", isEmployeeExists:"<isEmployeeExists>", isPasswordCorrect:"<isPasswordCorrect>" and isUserVarified:"<isUserVarified>" to login employee
    When try to login employee
    Then it will throw an error with message:<message> while logging in employee
    And compare function will be called :<compareFunctionCallCount> while logging in employee
    And getEmployeeByEmailDB function will be called :<getEmployeeByEmailDBFunctionCallCount>  logging in employee

    Examples:
      | email                     | password   | isEmployeeExists | isPasswordCorrect | isUserVarified | message            | compareFunctionCallCount | getEmployeeByEmailDBFunctionCallCount |
      | investerstocker@gmail.com | 123456afaA | true             | false             | false          | 'Password Invalid' | 1                        | 1                                     |



  Scenario Outline: Try To log in employee With non varified user
    Given email:"<email>", password:"<password>", isEmployeeExists:"<isEmployeeExists>", isPasswordCorrect:"<isPasswordCorrect>" and isUserVarified:"<isUserVarified>" to login employee
    When try to login employee
    Then it will throw an error with message:<message> while logging in employee
    And compare function will be called :<compareFunctionCallCount> while logging in employee
    And getEmployeeByEmailDB function will be called :<getEmployeeByEmailDBFunctionCallCount>  logging in employee

    Examples:
      | email                     | password   | isEmployeeExists | isPasswordCorrect | isUserVarified | message               | compareFunctionCallCount | getEmployeeByEmailDBFunctionCallCount |
      | investerstocker@gmail.com | 123456afaA | true             | true              | false          | 'User Not Authorized' | 1                        | 1                                     |



  Scenario Outline: Try To log in employee With valid input
    Given email:"<email>", password:"<password>", isEmployeeExists:"<isEmployeeExists>", isPasswordCorrect:"<isPasswordCorrect>" and isUserVarified:"<isUserVarified>" to login employee
    When try to login employee
    Then it will give result with employeeId:'<employeeId>' while logging in employee
    And compare function will be called :<compareFunctionCallCount> while logging in employee
    And getEmployeeByEmailDB function will be called :<getEmployeeByEmailDBFunctionCallCount>  logging in employee

    Examples:
      | email                     | password   | isEmployeeExists | isPasswordCorrect | isUserVarified | employeeId                                            | compareFunctionCallCount | getEmployeeByEmailDBFunctionCallCount |
      | investerstocker@gmail.com | 123456afaA | true             | true              | true           | {"employeeId":"b85bc33a-bf23-4655-9bf1-62931337ab6f"} | 1                        | 1                                     |
