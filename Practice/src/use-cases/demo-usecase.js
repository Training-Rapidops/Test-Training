module.exports = function makeDemoUsecase({
  Joi,
  ValidationError,
  demoDb,
// Other dependancies
}) {
  return async function demoUsecase({appName, logger}) {
    logger.info(`demoUsecase :: appName:${appName}`);
    try {
      validateInput({appName});

      /*
    * This file contains all the actual business logic that the usecases is determined to perform
    * All the other
    * database functions
    * external api-calls
    * internal api-calls
    * other use-cases
    * needs to be called
    */

      // convert data into format

      // forExample
      return await demoDb.createDemoEntry({
        appName,
        hostname: '',
      });
    } catch (e) {
      logger.error(`ERROR in demoUsecase :: appName:${appName} :: message:${e.message}`, {stack: e.stack});
      throw e;
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
};
