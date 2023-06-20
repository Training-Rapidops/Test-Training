Feature: Add label name in user database

  Scenario Outline: Try to add Label name to user databse useing invalid Userid and lable type
    Given User Id:"<id>" ,isvalidId:"<isvalidId>" and labelname:'<label>' ,labelExists:"<labelExists>" are given to add label
    When Try to add label name
    Then it will throw error with message:<message> while adding label name

    Examples: 
      | id   | isvalidId | label | labelExists | message                                             |
      |      | false     |       | false       | '"id" is required'                                  |
      | hsjh | false     |       | false       | '"id" must be a number'                             |
      |   20 | false     |       | false       | '"label" is required'                               |
      |   20 | false     | my    | false       | '"label" length must be at least 3 characters long' |

  Scenario Outline: Try to add Label name to user databse useing non registered Userid
    Given User Id:"<id>" ,isvalidId:"<isvalidId>" and labelname:'<label>' ,labelExists:"<labelExists>" are given to add label
    When Try to add label name
    Then it will throw error with message:<message> while adding label name

    Examples: 
      | id | isvalidId | label   | labelExists | message                |
      | 20 | false     | mylabel | true        | "User does not exists" |

  Scenario Outline: Try to add Label name to user databse useing already existing label
    Given User Id:"<id>" ,isvalidId:"<isvalidId>" and labelname:'<label>' ,labelExists:"<labelExists>" are given to add label
    When Try to add label name
    Then it will throw error with message:<message> while adding label name

    Examples: 
      | id | isvalidId | label   | labelExists | message                |
      | 20 | true      | mylabel | true        | "User does not exists" |

  Scenario Outline: Try to add Label name to user databse useing valid Userid and labelname
    Given User Id:"<id>" ,isvalidId:"<isvalidId>" and labelname:'<label>' ,labelExists:"<labelExists>" are given to add label
    When Try to add label name
    Then it will count of added label:<addedLabel>

    Examples: 
      | id | isvalidId | label    | labelExists | addedLabel |
      | 20 | true      | mylabel2 | false       |          1 |
