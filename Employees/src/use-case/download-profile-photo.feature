Feature:

    Scenario Outline: Try to download profile photo with invalid syntax of input
        Given employee id:"<id>", isFolderExists:"<isFolderExists>", isEmployeeExists:"<isEmployeeExists>" to download profile photo
        When try to download profile photo
        Then it will throw an error with message:<message> while downloading profile photo
        And bucket function will be called :<bucketFunctionCallCount> while downloading profile photo
        # And file function will be called :<fileFunctionCallCount> while downloading profile photo
        # And download function will be called :<downloadFunctionCallCount> while downloading profile photo
        And existsSync function will be called :<existsSyncFunctionCallCount> while downloading profile photo
        And mkdirSync function will be called :<mkdirSyncFunctionCallCount> while downloading profile photo
        And getProfilePhoto function will be called :<getProfilePhotoFunctionCallCount> while downloading profile photo

        Examples:
            | id  | isFolderExists | isEmployeeExists | message                     | bucketFunctionCallCount | fileFunctionCallCount | downloadFunctionCallCount | existsSyncFunctionCallCount | mkdirSyncFunctionCallCount | getProfilePhotoFunctionCallCount |
            |     | false          | false            | '"id" is required'          | 0                       | 0                     | 0                         | 0                           | 0                          | 0                                |
            | 123 | false          | false            | '"id" must be a valid GUID' | 0                       | 0                     | 0                         | 0                           | 0                          | 0                                |


    Scenario Outline: Try to download profile photo with employee id that doesn't exists
        Given employee id:"<id>", isFolderExists:"<isFolderExists>", isEmployeeExists:"<isEmployeeExists>" to download profile photo
        When try to download profile photo
        Then it will throw an error with message:<message> while downloading profile photo
        And bucket function will be called :<bucketFunctionCallCount> while downloading profile photo
        # And file function will be called :<fileFunctionCallCount> while downloading profile photo
        # And download function will be called :<downloadFunctionCallCount> while downloading profile photo
        And existsSync function will be called :<existsSyncFunctionCallCount> while downloading profile photo
        And mkdirSync function will be called :<mkdirSyncFunctionCallCount> while downloading profile photo
        And getProfilePhoto function will be called :<getProfilePhotoFunctionCallCount> while downloading profile photo

        Examples:
            | id                                   | isFolderExists | isEmployeeExists | message                                                              | bucketFunctionCallCount | fileFunctionCallCount | downloadFunctionCallCount | existsSyncFunctionCallCount | mkdirSyncFunctionCallCount | getProfilePhotoFunctionCallCount |
            | f9fadbf7-019a-44a9-9bd0-31d833bda6e1 | false          | false            | 'NO Employee Data Found for id f9fadbf7-019a-44a9-9bd0-31d833bda6e1' | 0                       | 0                     | 0                         | 0                           | 0                          | 1                                |

    Scenario Outline: Try to download profile photo with employee id that doesn't exists
        Given employee id:"<id>", isFolderExists:"<isFolderExists>", isEmployeeExists:"<isEmployeeExists>" to download profile photo
        When try to download profile photo
        Then it will give result with photoPath:'<photoPath>' while downloading profile photo
        And bucket function will be called :<bucketFunctionCallCount> while downloading profile photo
        # And file function will be called :<fileFunctionCallCount> while downloading profile photo
        # And download function will be called :<downloadFunctionCallCount> while downloading profile photo
        And existsSync function will be called :<existsSyncFunctionCallCount> while downloading profile photo
        And mkdirSync function will be called :<mkdirSyncFunctionCallCount> while downloading profile photo
        And getProfilePhoto function will be called :<getProfilePhotoFunctionCallCount> while downloading profile photo

        Examples:
            | id                                   | isFolderExists | isEmployeeExists | photoPath                                                                                                                               | bucketFunctionCallCount | fileFunctionCallCount | downloadFunctionCallCount | existsSyncFunctionCallCount | mkdirSyncFunctionCallCount | getProfilePhotoFunctionCallCount |
            | f9fadbf7-019a-44a9-9bd0-31d833bda6e1 | true           | true             | {"PhotoPath":"/home/ad.rapidops.com/safi.shaikh/Desktop/Safi-Shaikh/Employees/downloads/f9fadbf7-019a-44a9-9bd0-31d833bda6e1/file.odt"} | 1                       | 1                     | 1                         | 1                           | 0                          | 1                                |
            | f9fadbf7-019a-44a9-9bd0-31d833bda6e1 | false          | true             | {"PhotoPath":"/home/ad.rapidops.com/safi.shaikh/Desktop/Safi-Shaikh/Employees/downloads/f9fadbf7-019a-44a9-9bd0-31d833bda6e1/file.odt"} | 1                       | 1                     | 1                         | 1                           | 1                          | 1                                |
