Feature: add specified User.

  Scenario Outline: Try to add specified user with invalid firstName,lastName,email,that will throw error.
    Given User details firstName:"<firstName>",lastName:"<lastName>",email:"<email>"
    When try to add User
    Then it will throw error with message:"<message>" while getting user
    And getUserDB function will call <getUserDBFunctionCallCount> times while creating user
    And addUserDB function will call <addUserDBFunctionCallCount> time while creating new User
    And addLabel function will call <addLabelFunctionCallCount> times while creating new User

    Examples: 
      | firstName | lastName | email     | message                         | getUserDBFunctionCallCount | addUserDBFunctionCallCount | addLabelFunctionCallCount |
      |           |          |           | '"firstName" is required'       |                          0 |                          0 |                         0 |
      | safi      |          |           | '"lastName" is required'        |                          0 |                          0 |                         0 |
      | safi      | shaikh   |           | '"email" is required'           |                          0 |                          0 |                         0 |
      | safi      | shaikh   | gusgsdyud | '"email" must be a valid email' |                          0 |                          0 |                         0 |

  Scenario Outline: Try to add specified user with email that already exists
    Given User details firstName:"<firstName>",lastName:"<lastName>",email:"<email>"
    When try to add User
    Then it will throw error with message:"<message>" while getting user
    And getUserDB function will call <getUserDBFunctionCallCount> times while creating user
    And addUserDB function will call <addUserDBFunctionCallCount> time while creating new User
    And addLabel function will call <addLabelFunctionCallCount> times while creating new User

    Examples: 
      | firstName | lastName | email         | message               | getUserDBFunctionCallCount | addUserDBFunctionCallCount | addLabelFunctionCallCount |
      | safi      | shaikh   | user@mail.com | 'User Already Exists' |                          1 |                          0 |                         0 |

  Scenario Outline: Try to add specified user with firstName,lastName,email.
    Given User details firstName:"<firstName>",lastName:"<lastName>",email:"<email>"
    When try to add User
    Then it will add new User With "<addedDetails>"
    And getUserDB function will call <getUserDBFunctionCallCount> times while creating user
    And addUserDB function will call <addUserDBFunctionCallCount> time while creating new User
    And addLabel function will call <addLabelFunctionCallCount> times while creating new User

    Examples: 
      | firstName | lastName | email          | addedDetails | getUserDBFunctionCallCount | addUserDBFunctionCallCount | addLabelFunctionCallCount |
      | safi      | shaikh   | user2@mail.com | '{"id": 23}' |                          1 |                          1 |                         1 |
