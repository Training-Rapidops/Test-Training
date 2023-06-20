Feature:

  Scenario Outline: Try To add employee With invalid syntex of input
    Given employee details  name:"<name>", address:"<address>", email:"<email>", password:"<password>", companyName:"<companyName>",role:"<role>", profilePhoto:'<profilePhoto>', companyExists:"<companyExists>" While adding employee
    When try to add employee
    Then it will throw an error with message:<message> while adding employee
    And getCompanyByNameCall function will be called :<getCompanyByNameCallFunctionCallCount> while adding employee
    And employeeTemplet function will be called :<employeeTempletFunctionCallCount> while adding employee
    And addEmployeeDB function will be called :<addEmployeeDBFunctionCallCount> while adding employee
    And uploadPrfilePhoto function will be called :<uploadPrfilePhotoFunctionCallCount> while adding employee
    And updateProfilePhoto function will be called :<updateProfilePhotoFunctionCallCount> while adding employee

    Examples:
      | name        | address                | email               | password | companyName | role      | profilePhoto                 | companyExists | message                                                                                         | getCompanyByNameCallFunctionCallCount | employeeTempletFunctionCallCount | addEmployeeDBFunctionCallCount | uploadPrfilePhotoFunctionCallCount | updateProfilePhotoFunctionCallCount |
      |             |                        |                     |          |             |           |                              | false         | '"name" is required'                                                                            | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | jj          |                        |                     |          |             |           |                              | false         | '"name" length must be at least 3 characters long'                                              | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 |                        |                     |          |             |           |                              | false         | '"email" is required'                                                                           | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 |                        | jj                  |          |             |           |                              | false         | '"email" must be a valid email'                                                                 | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 |                        | email.mail@mail.com |          |             |           |                              | false         | '"password" is required'                                                                        | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 |                        | email.mail@mail.com | 123      |             |           |                              | false         | '"password" with value "123" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[0-9]).*$/' | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 |                        | email.mail@mail.com | abc      |             |           |                              | false         | '"password" with value "abc" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[0-9]).*$/' | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 |                        | email.mail@mail.com | 1234abcD |             |           |                              | false         | '"address" is required'                                                                         | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | jj                     | email.mail@mail.com | 1234abcD |             |           |                              | false         | '"address" length must be at least 5 characters long'                                           | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD |             |           |                              | false         | '"companyName" is required'                                                                     | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | jj          |           |                              | false         | '"companyName" length must be at least 3 characters long'                                       | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | abbbb1      |           |                              | false         | '"role" is required'                                                                            | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | abbbb1      | jj        |                              | false         | '"role" length must be at least 3 characters long'                                              | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | abbbb1      | Developer |                              | false         | '"profilePhoto" is required'                                                                    | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | abbbb1      | Developer | {"fileldName":"data"}        | false         | '"profilePhoto.fieldname" is required'                                                          | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | abbbb1      | Developer | {"fieldname":"data"}         | false         | '"profilePhoto.fieldname" must be [profilePhoto]'                                               | 0                                     | 0                                | 0                              | 0                                  | 0                                   |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | abbbb1      | Developer | {"fieldname":"profilePhoto"} | false         | '"profilePhoto.originalname" is required'                                                       | 0                                     | 0                                | 0                              | 0                                  | 0                                   |

  Scenario Outline: Try To add employee With companyName that doesn't exists
    Given employee details  name:"<name>", address:"<address>", email:"<email>", password:"<password>", companyName:"<companyName>",role:"<role>", profilePhoto:'<profilePhoto>', companyExists:"<companyExists>" While adding employee
    When try to add employee
    Then it will throw an error with message:<message> while adding employee
    And getCompanyByNameCall function will be called :<getCompanyByNameCallFunctionCallCount> while adding employee
    And employeeTemplet function will be called :<employeeTempletFunctionCallCount> while adding employee
    And addEmployeeDB function will be called :<addEmployeeDBFunctionCallCount> while adding employee
    And uploadPrfilePhoto function will be called :<uploadPrfilePhotoFunctionCallCount> while adding employee
    And updateProfilePhoto function will be called :<updateProfilePhotoFunctionCallCount> while adding employee

    Examples:
      | name        | address                | email               | password | companyName | role      | profilePhoto                                           | companyExists | message                                     | getCompanyByNameCallFunctionCallCount | employeeTempletFunctionCallCount | addEmployeeDBFunctionCallCount | uploadPrfilePhotoFunctionCallCount | updateProfilePhotoFunctionCallCount |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | hjxhxbb1    | Developer | {"fieldname":"profilePhoto","originalname":"file.exe"} | false         | "Company with name hjxhxbb1 doesn't exists" | 1                                     | 0                                | 0                              | 0                                  | 0                                   |

  Scenario Outline: Try To add employee With valid syntex of input
    Given employee details  name:"<name>", address:"<address>", email:"<email>", password:"<password>", companyName:"<companyName>",role:"<role>", profilePhoto:'<profilePhoto>', companyExists:"<companyExists>" While adding employee
    When try to add employee
    Then it will give result with id:'<id>' while adding employee
    And getCompanyByNameCall function will be called :<getCompanyByNameCallFunctionCallCount> while adding employee
    And employeeTemplet function will be called :<employeeTempletFunctionCallCount> while adding employee
    And addEmployeeDB function will be called :<addEmployeeDBFunctionCallCount> while adding employee
    And uploadPrfilePhoto function will be called :<uploadPrfilePhotoFunctionCallCount> while adding employee
    And updateProfilePhoto function will be called :<updateProfilePhotoFunctionCallCount> while adding employee

    Examples:
      | name        | address                | email               | password | companyName | role      | profilePhoto                                           | companyExists | id                                               | getCompanyByNameCallFunctionCallCount | employeeTempletFunctionCallCount | addEmployeeDBFunctionCallCount | uploadPrfilePhotoFunctionCallCount | updateProfilePhotoFunctionCallCount |
      | Deep patel2 | 401,krishtal appatment | email.mail@mail.com | 1234abcD | abbbb       | Developer | {"fieldname":"profilePhoto","originalname":"file.exe"} | true          | { "id": "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a" } | 1                                     | 1                                | 1                              | 1                                  | 1                                   |













