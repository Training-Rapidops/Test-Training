Feature: Add label By user Id

  Scenario Outline: try to add user with invalid user id type
    Given userId <Id> to add label
    When try to add label
    Then it will throw error with message:<message> while trying to add label

    Examples: 
      | Id     | message                           |
      |        | '"insertId" is required'          |
      | gausyg | '"insertId" must be type intiger' |

  Scenario Outline: try to add user with valid user id type
    Given userId <Id> to add label
    When try to add label
    Then it will add label

    Examples: 
      | Id |
      | 20 |
