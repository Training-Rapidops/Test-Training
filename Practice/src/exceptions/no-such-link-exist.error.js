class NoSuchLinkExist extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoSuchLinkExist);
    }

    this.name = 'NoSuchLinkExist';
    this.errorCode='NO_SUCH_LINK_EXISTS';
    // Custom debugging information
    this.httpStatusCode=404;
    this.date = new Date();
  }
}
module.exports=NoSuchLinkExist;
