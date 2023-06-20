Feature:

  Scenario Outline: Try To get location from ip With invalid syntex of input
    Given ip address:"<ipAddress>" to get location
    When try to add location from ip
    Then it will throw error with message:<message> while getting location from ip
    And lookup function will be called :<lookupFunctionCallCount> while adding employee

    Examples:
      | ipAddress | message                                                                                                     | lookupFunctionCallCount |
      |           | '"ipAddress" is required'                                                                                   | 0                       |
      | 12135     | '"ipAddress" must be a valid ip address of one of the following versions [ipv4, ipv6] with a optional CIDR' | 0                       |



  Scenario Outline: Try To get location from ip With valid syntex of input
    Given ip address:"<ipAddress>" to get location
    When try to add location from ip
    Then it will give location:'<location>' while getting location from ip
    And lookup function will be called :<lookupFunctionCallCount> while adding employee

    Examples:
      | ipAddress                             | location                        | lookupFunctionCallCount |
      | 2a01:e35:8bd9:8bb0:92b:8628:5ca5:5f2b | {"location":"bagneux, fr, idf"} | 1                       |

