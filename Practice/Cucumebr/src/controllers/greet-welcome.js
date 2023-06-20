function makeGreetWelcomeToApp({greetWelcomeToApp, formatResponse, formatError}) {
  return async function greetWelcome(httpRequest) {
    try {
      const message = greetWelcomeToApp({appName: httpRequest.app.getName()});
      return formatResponse(
          {contentType: 'text/plain', statusCode: 200, body: message});
    } catch (e) {
      httpRequest.logger.error(`Got error in greetWelcome controller`, e);
      return formatError({error: e});
    }
  };
}

module.exports = makeGreetWelcomeToApp;
