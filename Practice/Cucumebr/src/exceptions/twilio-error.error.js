class TwilioError extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TwilioError);
    }

    this.name = 'TwilioError';
    // Custom debugging information
    this.httpStatusCode=503;
    this.date = new Date();
  }
}
module.exports=TwilioError;
