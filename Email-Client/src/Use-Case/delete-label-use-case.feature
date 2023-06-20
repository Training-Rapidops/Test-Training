Feature: Delete Label using userId

  Scenario Outline: Try to delete label with invalid userId and label type
    Given User Id:"<id>" ,isvalidId:"<isValidId>" ,labelname:"<label>" ,labelExists:"<labelExists>"
    When Try to delete label
    Then it will Throw error with message:"<message>" while deleting label

    Examples: 
      | id   | isValidId | label | labelExists | message                                             |
      |      | false     |       | false       | '"id" is required'                                  |
      | hsjh | false     |       | false       | '"id" must be a number'                             |
      |   20 | false     |       | false       | '"label" is required'                               |
      |   20 | false     | my    | false       | '"label" length must be at least 3 characters long' |

  Scenario Outline: try to delete label with non registered userId
    Given User Id:"<id>" ,isvalidId:"<isValidId>" ,labelname:"<label>" ,labelExists:"<labelExists>"
    When Try to delete label
    Then it will Throw error with message:"<message>" while deleting label

    Examples: 
      | id | isValidId | label   | labelExists | message                |
      | 20 | false     | mylabel | false       | "User does not exists" |

  Scenario Outline: try to delete label with non existing Label
    Given User Id:"<id>" ,isvalidId:"<isValidId>" ,labelname:"<label>" ,labelExists:"<labelExists>"
    When Try to delete label
    Then it will Throw error with message:"<message>" while deleting label

    Examples: 
      | id | isValidId | label   | labelExists | message                         |
      | 20 | true      | mylabel | false       | "Label already does not exists" |

  Scenario Outline: try to delete label with non existing Label
    Given User Id:"<id>" ,isvalidId:"<isValidId>" ,labelname:"<label>" ,labelExists:"<labelExists>"
    When Try to delete label
    Then it will give deleted label count:<labelDeleted>

    Examples: 
      | id | isValidId | label   | labelExists | labelDeleted |
      | 20 | true      | mylabel | true        |            1 |
