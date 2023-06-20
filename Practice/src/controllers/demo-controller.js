function makeDemoControllerAction({
  Joi,
  ValidationError,
  demoUsecase,
  formatResponse,
  formatError,
}) {
  return async function demoControllerAction(httpRequest) {
    const appName = httpRequest.app.getName();
    try {
      // function call to validate input
      validateInput({appName});

      // actual function call to fetch the response
      const message = await demoUsecase({appName: httpRequest.app.getName()});

      return formatResponse({
        contentType: 'text/plain',
        statusCode: 200,
        body: message,
      });
    } catch (e) {
      httpRequest.logger.error(`Got error in demoControllerAction controller`, e);
      return formatError({error: e});
    }
  };

  function validateInput({appName}) {
    const schema = Joi.object({
      appName: Joi.string().required(),
    });
    const {error} = schema.validate({appName});
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = makeDemoControllerAction;
