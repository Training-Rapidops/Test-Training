Feature:

  Scenario Outline: Try To varify employee With invalid syntex of input
    Given employee email:"<email>" and isEmployeeExists:"<isEmployeeExists>" to varify employee
    When try to varify employee
    Then it will throw an error with message:<message> while varifing employee
    And varifyEmployeeDB function will be called :<varifyEmployeeDBFunctionCallCount> while varifing employee

    Examples:
      | email | isEmployeeExists | message                         | varifyEmployeeDBFunctionCallCount |
      |       | false            | '"email" is required'           | 0                                 |
      | 123   | false            | '"email" must be a valid email' | 0                                 |
      | asd   | false            | '"email" must be a valid email' | 0                                 |


  Scenario Outline: Try To varify employee With employee email that doesn't exists
    Given employee email:"<email>" and isEmployeeExists:"<isEmployeeExists>" to varify employee
    When try to varify employee
    Then it will throw an error with message:<message> while varifing employee
    And varifyEmployeeDB function will be called :<varifyEmployeeDBFunctionCallCount> while varifing employee

    Examples:
      | email             | isEmployeeExists | message                                               | varifyEmployeeDBFunctionCallCount |
      | mail.ai@gmail.com | false            | 'Employee with email mail.ai@gmail.com was not found' | 1                                 |



  Scenario Outline: Try To varify employee With employee email that doesn't exists
    Given employee email:"<email>" and isEmployeeExists:"<isEmployeeExists>" to varify employee
    When try to varify employee
    Then it will give result with affected rows:'<affectedRows>' while varifing employee
    And varifyEmployeeDB function will be called :<varifyEmployeeDBFunctionCallCount> while varifing employee

    Examples:
      | email             | isEmployeeExists | affectedRows | varifyEmployeeDBFunctionCallCount |
      | mail.ai@gmail.com | true             | 1            | 1                                 |