Feature: Update label using user id

  Scenario Outline: Try to update user with invalid id , label and newlabel type
    Given User id:"<id>" ,isValidId:"<isValidId>" ,label:"<label>" ,labelFound:"<labelFound>" ,newlabel:"<newLabel>" ,labelExists:"<labelExists>"
    When try to update user
    Then it will throw error with messgae:"<message>" while updating user

    Examples: 
      | id     | isValidId | label   | labelFound | newLabel | labelExists | message                                                |
      |        | false     |         | true       |          | false       | '"id" is required'                                     |
      | ysaytc | false     |         | true       |          | false       | '"id" must be a number'                                |
      |     20 | false     |         | true       |          | false       | '"label" is required'                                  |
      |     20 | false     | my      | true       |          | false       | '"label" length must be at least 3 characters long'    |
      |     20 | false     | mylabel | true       |          | false       | '"newLabel" is required'                               |
      |     20 | false     | mylabel | true       | cv       | false       | '"newLabel" length must be at least 3 characters long' |

  Scenario Outline: Try to update user with non registered user id
    Given User id:"<id>" ,isValidId:"<isValidId>" ,label:"<label>" ,labelFound:"<labelFound>" ,newlabel:"<newLabel>" ,labelExists:"<labelExists>"
    When try to update user
    Then it will throw error with messgae:"<message>" while updating user

    Examples: 
      | id | isValidId | label   | labelFound | newLabel | labelExists | message                |
      | 20 | false     | mylabel | true       | mylabel2 | false       | "User does not exists" |

  Scenario Outline: Try to update label with already existing label
    Given User id:"<id>" ,isValidId:"<isValidId>" ,label:"<label>" ,labelFound:"<labelFound>" ,newlabel:"<newLabel>" ,labelExists:"<labelExists>"
    When try to update user
    Then it will throw error with messgae:"<message>" while updating user

    Examples: 
      | id | isValidId | label   | labelFound | newLabel | labelExists | message                |
      | 20 | true      | mylabel | true       | mylabel2 | true        | "Label already exists" |

  Scenario Outline: Try to update label that doesnot exists
    Given User id:"<id>" ,isValidId:"<isValidId>" ,label:"<label>" ,labelFound:"<labelFound>" ,newlabel:"<newLabel>" ,labelExists:"<labelExists>"
    When try to update user
    Then it will throw error with messgae:"<message>" while updating user

    Examples: 
      | id | isValidId | label   | labelFound | newLabel | labelExists | message                               |
      | 20 | true      | mylabel | false      | mylabel2 | false       | 'No Such Label named "mylabel" Found' |

  Scenario Outline: Try to update user with already existing label
    Given User id:"<id>" ,isValidId:"<isValidId>" ,label:"<label>" ,labelFound:"<labelFound>" ,newlabel:"<newLabel>" ,labelExists:"<labelExists>"
    When try to update user
    Then it will give count of updated labels:<labelUpdated> after updating label

    Examples: 
      | id | isValidId | label   | labelFound | newLabel | labelExists | labelUpdated |
      | 20 | true      | mylabel | true       | mylabel2 | false       |            1 |
