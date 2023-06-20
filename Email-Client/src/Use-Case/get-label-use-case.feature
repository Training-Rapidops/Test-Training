Feature: Get labels using Userid

  Scenario Outline: Try to get labels using invalid userid
    Given User Id:"<userId>" to get labels
    When Try to get lebles
    Then it will throw error message:"<message>" while getting labels

    Examples: 
      | userId | message                     |
      |        | '"userId" is required'      |
      | hgcc   | '"userId" must be a number' |

  Scenario Outline: Try to get labels using valid userid
    Given User Id:"<userId>" to get labels
    When Try to get lebles
    Then it will give labels Array:"<labels>" after getting lables

    Examples: 
      | userId | labels              |
      |     20 | '["saved","inbox"]' |
