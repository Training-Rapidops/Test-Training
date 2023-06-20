Feature:

    Scenario Outline: Try To delete session With invalid syntex of input
        Given token id:<tokeId>, employee id:"<employeeId>", isTokenExists:"<isTokenExists>" and isEmployeeExists:"<isEmployeeExists>" to delete session
        When try to delete session
        Then it will throw an error with message:<message> while deleting sessions
        And deleteSessionDB function will be called :<deleteSessionDBFunctionCallCount> while deleting sessions
        And getEmployee function will be called :<getEmployeeFunctionCallCount> while deleting session

        Examples:
            | tokeId                                                                             | employeeId | isTokenExists | isEmployeeExists | message                                   | deleteSessionDBFunctionCallCount | getEmployeeFunctionCallCount |
            | ''                                                                                 |            | false         | false            | '"tokenId" is required'                   | 0                                | 0                            |
            | '["gugiu0y"]'                                                                      |            | false         | false            | '"tokenId[0]" must be a valid GUID'       | 0                                | 0                            |
            | '[ "740b670f-bd30-4798-9d69-b7a208bb862c","740b670f-bd30-4798-9d69-b7a208bb862c"]' |            | false         | false            | '"tokenId[1]" contains a duplicate value' | 0                                | 0                            |
            | '[ "740b670f-bd30-4798-9d69-b7a208bb862c","62759c09-d03e-42ee-ac0e-07c411da739d"]' |            | false         | false            | '"employeeId" is required'                | 0                                | 0                            |
            | '[ "740b670f-bd30-4798-9d69-b7a208bb862c","62759c09-d03e-42ee-ac0e-07c411da739d"]' | jj         | false         | false            | '"employeeId" must be a valid GUID'       | 0                                | 0                            |



    Scenario Outline: Try To delete session With employee id that doesn't exists
        Given token id:<tokeId>, employee id:"<employeeId>", isTokenExists:"<isTokenExists>" and isEmployeeExists:"<isEmployeeExists>" to delete session
        When try to delete session
        Then it will throw an error with message:<message> while deleting sessions
        And deleteSessionDB function will be called :<deleteSessionDBFunctionCallCount> while deleting sessions
        And getEmployee function will be called :<getEmployeeFunctionCallCount> while deleting session

        Examples:
            | tokeId                                                                             | employeeId                           | isTokenExists | isEmployeeExists | message                                                                | deleteSessionDBFunctionCallCount | getEmployeeFunctionCallCount |
            | '[ "740b670f-bd30-4798-9d69-b7a208bb862c","62759c09-d03e-42ee-ac0e-07c411da739d"]' | 38bc08cc-4e9f-4767-a0ea-13b8df987bff | false         | false            | "Employee With id 38bc08cc-4e9f-4767-a0ea-13b8df987bff doesn't Exists" | 0                                | 1                            |


    Scenario Outline: Try To delete session With token id that doesn't exists
        Given token id:<tokeId>, employee id:"<employeeId>", isTokenExists:"<isTokenExists>" and isEmployeeExists:"<isEmployeeExists>" to delete session
        When try to delete session
        Then it will throw an error with message:<message> while deleting sessions
        And deleteSessionDB function will be called :<deleteSessionDBFunctionCallCount> while deleting sessions
        And getEmployee function will be called :<getEmployeeFunctionCallCount> while deleting session

        Examples:
            | tokeId                                                                             | employeeId                           | isTokenExists | isEmployeeExists | message                                                                                                               | deleteSessionDBFunctionCallCount | getEmployeeFunctionCallCount |
            | '[ "740b670f-bd30-4798-9d69-b7a208bb862c","62759c09-d03e-42ee-ac0e-07c411da739d"]' | 38bc08cc-4e9f-4767-a0ea-13b8df987bff | false         | true             | 'token With Given Id:740b670f-bd30-4798-9d69-b7a208bb862c,62759c09-d03e-42ee-ac0e-07c411da739d Already Doesnt exists' | 1                                | 1                            |


    Scenario Outline: Try To delete session With valid input
        Given token id:<tokeId>, employee id:"<employeeId>", isTokenExists:"<isTokenExists>" and isEmployeeExists:"<isEmployeeExists>" to delete session
        When try to delete session
        Then it will give result affected rows:'<affectedRows>' while deleting sessions
        And deleteSessionDB function will be called :<deleteSessionDBFunctionCallCount> while deleting sessions
        And getEmployee function will be called :<getEmployeeFunctionCallCount> while deleting session

        Examples:
            | tokeId                                                                             | employeeId                           | isTokenExists | isEmployeeExists | affectedRows       | deleteSessionDBFunctionCallCount | getEmployeeFunctionCallCount |
            | '[ "740b670f-bd30-4798-9d69-b7a208bb862c","62759c09-d03e-42ee-ac0e-07c411da739d"]' | 38bc08cc-4e9f-4767-a0ea-13b8df987bff | true          | true             | {"affectedRows":2} | 1                                | 1                            |