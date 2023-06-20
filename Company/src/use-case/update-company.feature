Feature:

  Scenario Outline: Try to update company with incorrect syntex of input
    Given company id:"<id>",name:"<name>", address:"<address>", contectNo:"<contectNo>", contectEmail:"<contectEmail>" and isCorrectId:"<isCorrectId>" with id to update
    When try to update company with id
    Then it will throw an error with message:<message> while updating company with id
    And updateCompanyDB function will be called :<updateCompanyDBFunctionCallCount> while adding company

    Examples:
      | id                                   | name     | address      | contectNo                 | contectEmail   | isCorrectId | message                                                                         | updateCompanyDBFunctionCallCount |
      |                                      |          |              |                           |                | false       | '"id" is required'                                                              | 0                                |
      | 77                                   |          |              |                           |                | false       | '"id" must be a valid GUID'                                                     | 0                                |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 |          |              |                           |                | false       | '"value" must contain at least one of [name, address, contectNo, contectEmail]' | 0                                |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | aa       |              |                           |                | false       | '"name" length must be at least 3 characters long'                              | 0                                |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | Rapidops | 0            |                           |                | false       | '"address" length must be at least 5 characters long'                           | 0                                |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | Rapidops | Stelite Road | sahgyus                   |                | false       | '"contectNo" must be a number'                                                  | 0                                |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | Rapidops | Stelite Road | 000                       |                | false       | '"contectNo" must be greater than or equal to 6'                                | 0                                |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | Rapidops | Stelite Road | 0000000000000000000000000 |                | false       | '"contectNo" must be greater than or equal to 6'                                | 0                                |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | Rapidops | Stelite Road | 9876543210                | asa            | false       | '"contectEmail" must be a valid email'                                          | 0                                |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | Rapidops | Stelite Road | 9876543210                | email2mail.com | false       | '"contectEmail" must be a valid email'                                          | 0                                |

  Scenario Outline: Try to update company with company id that doesn't exists
    Given company id:"<id>",name:"<name>", address:"<address>", contectNo:"<contectNo>", contectEmail:"<contectEmail>" and isCorrectId:"<isCorrectId>" with id to update
    When try to update company with id
    Then it will throw an error with message:<message> while updating company with id
    And updateCompanyDB function will be called :<updateCompanyDBFunctionCallCount> while adding company

    Examples:
      | id                                   | name      | address      | contectNo  | contectEmail    | isCorrectId | message                                                               | updateCompanyDBFunctionCallCount |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | Rapidops2 | Stelite Road | 9876543210 | email2@mail.com | false       | "Company with id 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 doesn't exists" | 1                                |

  Scenario Outline: Try to update company with correct input
    Given company id:"<id>",name:"<name>", address:"<address>", contectNo:"<contectNo>", contectEmail:"<contectEmail>" and isCorrectId:"<isCorrectId>" with id to update
    When try to update company with id
    Then it will give affected rows count:'<affectedRows>' updating company with id
    And updateCompanyDB function will be called :<updateCompanyDBFunctionCallCount> while adding company

    Examples:
      | id                                   | name     | address      | contectNo  | contectEmail    | isCorrectId | affectedRows       | updateCompanyDBFunctionCallCount |
      | 70e27e3d-46c9-4d9e-bf27-eb993bfe7e06 | Rapidops | Stelite Road | 9876543210 | email2@mail.com | true        | {"affectedRows":1} | 1                                |
