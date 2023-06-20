Feature: Create New User.

  Scenario Outline: Try to create new user with invalid details, then it will throw error.
    Given User details name: "<name>", email: "<email>", mobile: "<mobile>", and password: "<password>" to create new user
    When Try to create new user
    Then It will throw error: "<error>" with message: "<message>" while creating new user
    And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | email             | mobile        | password | getUsersDetailByEmailFunctionCallCount | getUsersDetailByMobileFunctionCallCount | encryptPasswordFunctionCallCount | createUserFunctionCallCount | error           | message                                                |
      |            |                   |               |          | 0                                      | 0                                       | 0                                | 0                           | ValidationError | '"name" is required'                                   |
      | Aman Gupta |                   |               |          | 0                                      | 0                                       | 0                                | 0                           | ValidationError | '"email" is required'                                  |
      | Aman Gupta | aman              |               |          | 0                                      | 0                                       | 0                                | 0                           | ValidationError | '"email" must be a valid email'                        |
      | Aman Gupta | aman@rapidops.com |               |          | 0                                      | 0                                       | 0                                | 0                           | ValidationError | '"mobile" is required'                                 |
      | Aman Gupta | aman@rapidops.com | +918319110534 |          | 0                                      | 0                                       | 0                                | 0                           | ValidationError | '"password" is required'                               |
      | Aman Gupta | aman@rapidops.com | +918319110534 | 1234     | 0                                      | 0                                       | 0                                | 0                           | ValidationError | '"password" length must be at least 8 characters long' |

  Scenario Outline: Try to create new user with already registered email, then it will throw error.
    Given User details name: "<name>", email: "<email>", mobile: "<mobile>", and password: "<password>" to create new user
    And Already existed user details: "<userDetailsByEmail>" with same email
    When Try to create new user
    Then It will throw error: "<error>" with message: "<message>" while creating new user
    And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | email             | mobile        | password   | userDetailsByEmail | getUsersDetailByEmailFunctionCallCount | getUsersDetailByMobileFunctionCallCount | encryptPasswordFunctionCallCount | createUserFunctionCallCount | error          | message                                      |
      | Aman Gupta | aman@rapidops.com | +918319110534 | 1234567890 | '{"id":"10"}'      | 1                                      | 0                                       | 0                                | 0                           | ForbiddenError | 'User with the same email is already exists' |

  Scenario Outline: Try to create new user with already registered mobile, then it will throw error.
    Given User details name: "<name>", email: "<email>", mobile: "<mobile>", and password: "<password>" to create new user
    And Already existed user details: "<userDetailsByMobile>" with same mobile
    When Try to create new user
    Then It will throw error: "<error>" with message: "<message>" while creating new user
    And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | email                   | mobile        | password   | userDetailsByMobile | getUsersDetailByEmailFunctionCallCount | getUsersDetailByMobileFunctionCallCount | encryptPasswordFunctionCallCount | createUserFunctionCallCount | error          | message                                              |
      | Aman Gupta | aman.gupta@rapidops.com | +918319110534 | 1234567890 | '{"id":"10"}'       | 1                                      | 1                                       | 0                                | 0                           | ForbiddenError | 'User with the same mobile number is already exists' |

  Scenario Outline: Try to create new user with valid inputs, then it will throw error.
    Given User details name: "<name>", email: "<email>", mobile: "<mobile>", and password: "<password>" to create new user
    And Encrypted password of provided password is: "<encryptedPassword>"
    When Try to create new user
    Then It will create new user with details: "<newUserDetails>"
    And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | email                   | mobile        | password   | newUserDetails | encryptedPassword             | getUsersDetailByEmailFunctionCallCount | getUsersDetailByMobileFunctionCallCount | encryptPasswordFunctionCallCount | createUserFunctionCallCount |
      | Aman Gupta | aman.gupta@rapidops.com | +917024166349 | 1234567890 | '{"id": 1}'    | fue8374834ry8y832479#$#@iou43 | 1                                      | 1                                       | 1                                | 1                           |
