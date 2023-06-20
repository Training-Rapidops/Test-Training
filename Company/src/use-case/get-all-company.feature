Feature: 

  Scenario Outline: Try to get all company details with incorrect syntex of input
    Given limit of company details :"<limit>", offset:"<offset>" and isDataAvailable:"<isDataAvailable>"
    When try to get all company data
    Then it will throw an error with message:<message> while getting all company
    And getAllCompanyDB function will be called :<getAllCompanyDBFunctionCallCount> while adding company

    Examples: 
      | limit | offset | isDataAvailable | message                                      | getAllCompanyDBFunctionCallCount |
      |       |        | false           | '"limit" is required'                        |                                0 |
      |     0 |        | false           | '"limit" must be greater than or equal to 1' |                                0 |

  Scenario Outline: Try to get all company details with no data availble at backend
    Given limit of company details :"<limit>", offset:"<offset>" and isDataAvailable:"<isDataAvailable>"
    When try to get all company data
    Then it will throw an error with message:<message> while getting all company
    And getAllCompanyDB function will be called :<getAllCompanyDBFunctionCallCount> while adding company

    Examples: 
      | limit | offset | isDataAvailable | message                  | getAllCompanyDBFunctionCallCount |
      |     1 |      0 | false           | "Company Data not found" |                                1 |
      |     1 |     22 | false           | "Company Data not found" |                                1 |

  Scenario Outline: Try to get all company details with correct set of input
    Given limit of company details :"<limit>", offset:"<offset>" and isDataAvailable:"<isDataAvailable>"
    When try to get all company data
    Then it will wull give company details object :'<CompanyDetails>'
    And getAllCompanyDB function will be called :<getAllCompanyDBFunctionCallCount> while adding company

    Examples: 
      | limit | offset | isDataAvailable | CompanyDetails                                                                                                                                                           | getAllCompanyDBFunctionCallCount |
      |     1 |      0 | true            | { "1": {"id": "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a","company_name": "aaaa","company_address": "kjxhshx","contect_no": "9876543210","contect_email": "email2@mail.com"}} |                                1 |
