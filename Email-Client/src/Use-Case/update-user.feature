Feature: Update Specified User

  Scenario Outline: try to update specified User with invalid email.
    Given User email:"<email>" and upadte object containing firstName:"<firstName>" and lastName:"<lastName>" to update User
    When try to update User
    Then It will throw error message:"<message>" while updating user
    And getUserDB will call <getUserDBFunctionCallCount> times while Updating user
    And updateUserDB will call <updateUserDBFunctionCallCount> times while Updating user

    Examples: 
      | email | firstName | lastName | message                         | getUserDBFunctionCallCount | updateUserDBFunctionCallCount |
      | xyz   | Akash     | Solanki  | '"email" must be a valid email' |                          0 |                             0 |

  Scenario Outline: try to update specified User with non-registered user.
    Given User email:"<email>" and upadte object containing firstName:"<firstName>" and lastName:"<lastName>" to update User
    When try to update User
    Then It will throw error message:"<message>" while updating user
    And getUserDB will call <getUserDBFunctionCallCount> times while Updating user
    And updateUserDB will call <updateUserDBFunctionCallCount> times while Updating user

    Examples: 
      | email           | firstName | lastName | message                | getUserDBFunctionCallCount | updateUserDBFunctionCallCount |
      | user34@mail.com | Akash     | Solanki  | "User Does not Exists" |                          1 |                             0 |

  Scenario Outline: try to update specified User with empty update details.
    Given User email:"<email>" and upadte object containing firstName:"<firstName>" and lastName:"<lastName>" to update User
    When try to update User
    Then It will throw error message:"<message>" while updating user
    And getUserDB will call <getUserDBFunctionCallCount> times while Updating user
    And updateUserDB will call <updateUserDBFunctionCallCount> times while Updating user

    Examples: 
      | email         | firstName | lastName | message                                                      | getUserDBFunctionCallCount | updateUserDBFunctionCallCount |
      | user@mail.com |           |          | '"value" must contain at least one of [firstName, lastName]' |                          0 |                             0 |

  Scenario Outline: try to update specified User with empty update details.
    Given User email:"<email>" and upadte object containing firstName:"<firstName>" and lastName:"<lastName>" to update User
    When try to update User
    Then it will return <updatedRowsCount> after updating
    And getUserDB will call <getUserDBFunctionCallCount> times while Updating user
    And updateUserDB will call <updateUserDBFunctionCallCount> times while Updating user

    Examples: 
      | email         | firstName | lastName | updatedRowsCount | getUserDBFunctionCallCount | updateUserDBFunctionCallCount |
      | user@mail.com | Akash     |          |                1 |                          1 |                             1 |
      | user@mail.com |           | Solanki  |                1 |                          1 |                             1 |
      | user@mail.com | Akash     | Solanki  |                1 |                          1 |                             1 |
