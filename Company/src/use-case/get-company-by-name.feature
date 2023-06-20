Feature:

  Scenario Outline: Try to get company with incorrect syntex of input
    Given company name:"<name>" and isCorrectName:"<isCorrectName>"
    When try to get company
    Then it will throw an error with message:<message> while getting company
    And getCompanyByNameDB function will be called :<getCompanyByNameDBFunctionCallCount> while adding company

    Examples:
      | name | isCorrectName | message                                            | getCompanyByNameDBFunctionCallCount |
      |      | false         | '"name" is required'                               | 0                                   |
      | 77   | false         | '"name" length must be at least 3 characters long' | 0                                   |

  Scenario Outline: Try to get company with company name that doesn't exists
    Given company name:"<name>" and isCorrectName:"<isCorrectName>"
    When try to get company
    Then it will throw an error with message:<message> while getting company
    And getCompanyByNameDB function will be called :<getCompanyByNameDBFunctionCallCount> while adding company

    Examples:
      | name      | isCorrectName | message                                      | getCompanyByNameDBFunctionCallCount |
      | Rapidops2 | false         | "Company with name Rapidops2 doesn't exists" | 1                                   |

  Scenario Outline: Try to get company with correct input
    Given company name:"<name>" and isCorrectName:"<isCorrectName>"
    When try to get company
    Then it will give result:'<result>' while getting company
    And getCompanyByNameDB function will be called :<getCompanyByNameDBFunctionCallCount> while adding company

    Examples:
      | name     | isCorrectName | result                                                                                                                                                             | getCompanyByNameDBFunctionCallCount |
      | Rapidops | true          | { "id": "70e27e3d-46c9-4d9e-bf27-eb993bfe7e06","company_name": "hsahs","company_address": "kjxhshx","contect_no": "9876543210","contect_email": "email2@mail.com"} | 1                                   |
