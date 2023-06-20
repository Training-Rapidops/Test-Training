module.exports = function makeFormatMail({ b64Decode }) {
  return async function formatMail({ mailData, userData }) {
    var result = {
      messageId: mailData.id,
      userId: userData.id,
      threadId: mailData.threadId,
      labelIds: mailData.labelIds,
      snippet: mailData.snippet,
      historyId: mailData.historyId,
    };

    if (mailData.internalDate) {
      result.initialDate = parseInt(mailData.internalDate);
    }

    var payload = mailData.payload;
    if (!payload) {
      return result;
    }

    var headers = formatHeader(payload.headers);
    result.headers = headers;
    result.subject = headers.subject;
    result.internetMessageId = headers["message-id"];
    result.InReplyTo = headers["reply-to"];
    result.refrence = headers["refrence"];

    var parts = [payload];
    var firstPartProcessed = false;

    while (parts.length !== 0) {
      var part = parts.shift();
      if (part.parts) {
        parts = parts.concat(part.parts);
      }
      if (firstPartProcessed) {
        headers = formatHeader(part.headers);
      }

      if (!part.body) {
        continue;
      }

      var isHtml = part.mimeType && part.mimeType.indexOf("text/html") !== -1;
      var isPlain = part.mimeType && part.mimeType.indexOf("text/plain") !== -1;
      var isAttachment = Boolean(
        part.body.attachmentId ||
          (headers["content-disposition"] &&
            headers["content-disposition"]
              .toLowerCase()
              .indexOf("attachment") !== -1)
      );
      var isInline =
        headers["content-disposition"] &&
        headers["content-disposition"].toLowerCase().indexOf("inline") !== -1;

      if (isHtml && !isAttachment) {
        result.htmlBody = decodeBase64(part.body.data);
      } else if (isPlain && !isAttachment) {
        result.textBody = decodeBase64(part.body.data);
      } else if (isAttachment) {
        var body = part.body;
        if (!result.attachments) {
          result.attachments = [];
        }
        result.attachments.push({
          filename: part.filename,
          mimeType: part.mimeType,
          size: body.size,
          attachmentId: body.attachmentId,
          headers: formatHeader(part.headers),
        });
      } else if (isInline) {
        var body = part.body;
        if (!result.attachments) {
          result.attachments = [];
        }
        result.attachments.push({
          filename: part.filename,
          mimeType: part.mimeType,
          size: body.size,
          attachmentId: body.attachmentId,
          headers: formatHeader(part.headers),
        });
      }

      firstPartProcessed = true;
    }

    return result;
  };

  function decodeBase64(string) {
    return string
      ? decodeURIComponent(
          escape(b64Decode(string.replace(/\-/g, "+").replace(/\_/g, "/")))
        )
          .replace(/[\r\n]+/g, "")
          .replace(/[\t]+/g, "")
      : "";
  }

  function formatHeader(headers) {
    if (!headers) {
      return {};
    } else {
      return headers.reduce(function (result, header) {
        result[header.name.toLowerCase()] = header.value;
        return result;
      }, {});
    }
  }
};
