Feature: get All User Data.

  Scenario Outline: try get All User data.
    Given get user data
    When try to get all User
    Then it will give all user details '<userDetails>'
    And getAllUserDB function will call <getAllUserDBFunctionCallCount> time while creating new User

    Examples: 
      | userDetails                                                                                            | getAllUserDBFunctionCallCount |
      | [{"user 20":{"firstName": "Akash","lastName": "Solanki","email": "user@mail.com"},"labels":["saved"]}] |                             1 |
