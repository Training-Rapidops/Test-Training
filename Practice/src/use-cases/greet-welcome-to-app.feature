Feature: Greet welcome to user

  Scenario: Greet welcome message
    Given AppName is Sample
    When I go to system
    Then It greets me welcome
