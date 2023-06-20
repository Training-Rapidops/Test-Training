Feature: 

  Scenario Outline: Try to get company with incorrect syntex of input
    Given company id:"<id>" and isCorrectId:"<isCorrectId>" with id
    When try to get company with id
    Then it will throw an error with message:<message> while getting company with id
    And getCompanyDB function will be called :<getCompanyDBFunctionCallCount> while adding company

    Examples: 
      | id | isCorrectId | message                     | getCompanyDBFunctionCallCount |
      |    | false       | '"id" is required'          |                             0 |
      | 77 | false       | '"id" must be a valid GUID' |                             0 |

  Scenario Outline: Try to get company with company id that doesn't exists
    Given company id:"<id>" and isCorrectId:"<isCorrectId>" with id
    When try to get company with id
    Then it will throw an error with message:<message> while getting company with id
    And getCompanyDB function will be called :<getCompanyDBFunctionCallCount> while adding company

    Examples: 
      | id                                   | isCorrectId | message                                                               | getCompanyDBFunctionCallCount |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | false       | "Company with id 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 doesn't exists" |                             1 |

  Scenario Outline: Try to get company with correct input
    Given company id:"<id>" and isCorrectId:"<isCorrectId>" with id
    When try to get company with id
    Then it will give result:'<result>' while getting company with id
    And getCompanyDB function will be called :<getCompanyDBFunctionCallCount> while adding company

    Examples: 
      | id                                   | isCorrectId | result                                                                                                                                                             | getCompanyDBFunctionCallCount |
      | 6a013a0f-2819-4591-92e3-bd9375a82b25 | true        | { "id": "70e27e3d-46c9-4d9e-bf27-eb993bfe7e06","company_name": "hsahs","company_address": "kjxhshx","contect_no": "9876543210","contect_email": "email2@mail.com"} |                             1 |
