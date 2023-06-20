Feature: get Specified User

  Scenario Outline: try to get specified User with invalid email.
    Given User email:"<email>" to get User
    When try to get User
    Then It will throw error message:"<message>" while getting user
    And getUserDB will be called <getUserDBFunctionCallCount> times while getting user
    And getLabel will be called <getLabelFunctionCallCount> times while getting user

    Examples: 
      | email | message                         | getUserDBFunctionCallCount | getLabelFunctionCallCount |
      | xyz   | '"email" must be a valid email' |                          0 |                         0 |

  Scenario Outline: try to get specified User with non-registered email.
    Given User email:"<email>" to get User
    When try to get User
    Then It will throw error message:"<message>" while getting user
    And getUserDB will be called <getUserDBFunctionCallCount> times while getting user
    And getLabel will be called <getLabelFunctionCallCount> times while getting user

    Examples: 
      | email           | message               | getUserDBFunctionCallCount | getLabelFunctionCallCount |
      | user34@mail.com | "User Doesn't Exists" |                          1 |                         0 |

  Scenario Outline: try to get specified user with Given email
    Given User email:"<email>" to get User
    When try to get User
    Then It will get Specified '<userDetails>' after getting user details
    And getUserDB will be called <getUserDBFunctionCallCount> times while getting user
    And getLabel will be called <getLabelFunctionCallCount> times while getting user

    Examples: 
      | email         | userDetails                                                                                                       | getUserDBFunctionCallCount | getLabelFunctionCallCount |
      | user@mail.com | [{"user 20":{"firstName": "Akash","lastName": "Solanki","email": "user@mail.com"},"labels":["saved","archived"]}] |                          2 |                         1 |
