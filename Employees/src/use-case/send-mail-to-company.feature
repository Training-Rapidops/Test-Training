Feature: 

  Scenario Outline: Try To send mail to company With invalid syntex of input
    Given company mail :"<companyEmail>"
    When try to send mail to company
    Then it will throw an error with message:<message> while sending mail to company
    And createTransport function will be called :<createTransportFunctionCallCount> while sending mail to company

    Examples: 
      | companyEmail | message                                | createTransportFunctionCallCount |
      |              | '"companyEmail" is required'           |                                0 |
      | dsadas       | '"companyEmail" must be a valid email' |                                0 |

  Scenario Outline: Try To send mail to company With valid syntex of input
    Given company mail :"<companyEmail>"
    When try to send mail to company
    Then it will give result with data:'<data>' while sending mail to company
    And createTransport function will be called :<createTransportFunctionCallCount> while sending mail to company

    Examples: 
      | companyEmail   | data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | createTransportFunctionCallCount |
      | email@mail.com | {"accepted":["email@mail.com"],"rejected":[],"ehlo":["SIZE 35882577","8BITMIME","AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH","ENHANCEDSTATUSCODES","PIPELINING","CHUNKING","SMTPUTF8"],"envelopeTime":1274,"messageTime":835,"messageSize":692,"response":"250 2.0.0 OK  1685702550 e91-20020a17090a6fe400b002508d73f4e8sm2957605pjk.57 - gsmtp","envelope":{"from":"safi.shaikh360@gmail.com","to":["email@mail.com"]},"messageId":"<804958e8-bef6-4798-32a7-2d79a978d27f@gmail.com>"} |                                1 |
