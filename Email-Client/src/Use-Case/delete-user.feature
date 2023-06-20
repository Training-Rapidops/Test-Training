Feature: Delete Specified User

  Scenario Outline: try to delete specified User with invalid email.
    Given User email:"<email>" to delete User
    When try to delete User
    Then It will throw error message:"<message>" while deleting user
    And getUserDB Function will call <getUserDBFunctionCallCount> times while deleting User
    And deleteUserDB Function will call <deleteUserDBFunctionCallCount> times while deleting User

    Examples: 
      | email | message                         | getUserDBFunctionCallCount | deleteUserDBFunctionCallCount |
      | xyz   | '"email" must be a valid email' |                          0 |                             0 |

  Scenario Outline: try to delete specified user with email that doesn't exists
    Given User email:"<email>" to delete User
    When try to delete User
    Then It will throw error message:"<message>" while deleting user
    And getUserDB Function will call <getUserDBFunctionCallCount> times while deleting User
    And deleteUserDB Function will call <deleteUserDBFunctionCallCount> times while deleting User

    Examples: 
      | email           | message                        | getUserDBFunctionCallCount | deleteUserDBFunctionCallCount |
      | user34@mail.com | "User Already Does not exists" |                          1 |                             0 |

  Scenario Outline: try to delete specified User with given email
    Given User email:"<email>" to delete User
    When try to delete User
    Then It will give deleted user count:<deletedUserCount> while deleting user
    And getUserDB Function will call <getUserDBFunctionCallCount> times while deleting User
    And deleteUserDB Function will call <deleteUserDBFunctionCallCount> times while deleting User

    Examples: 
      | email         | deletedUserCount | getUserDBFunctionCallCount | deleteUserDBFunctionCallCount |
      | user@mail.com |                1 |                          1 |                             1 |
