module.exports = function makeCreateUserAction({
  createUser,
  formatError,
  formatResponse,
}) {
  return async function createUserAction(httpRequest) {
    const name = httpRequest.body.name;
    const email = httpRequest.body.email;
    const mobile = httpRequest.body.mobile;
    const password = httpRequest.body.password;

    try {
      const userDetails = await createUser({
        name,
        email,
        mobile,
        password,
      });

      return formatResponse({
        contentType: 'text/plain',
        statusCode: 200,
        body: userDetails,
      });
    } catch (e) {
      httpRequest.logger.error(`Got error in create user controller`, e);
      return formatError({error: e});
    }
  };
};
