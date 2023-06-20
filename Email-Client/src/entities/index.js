const Joi = require("joi");
const makeUserTemplet = require("./user-templet");
const userTemplet = makeUserTemplet({ Joi });
const makeLabelTemplet = require("./label-templet");
const labelTemplet = makeLabelTemplet({ Joi });
const makeEmailTemplet = require("./email-templet");
const emailTemplet = makeEmailTemplet({ Joi });
const makeAttachmentTemplet = require("./attachment-templet");
const attachmentTemplet = makeAttachmentTemplet({ Joi });
const makeRecipientTemplet = require("./recipient-templet");
const recipientsTemplet = makeRecipientTemplet({ Joi });
const makeEmailFolderAssociationTemplet = require("./email-folder-association-templet");
const emailFolderAssociationTemplet = makeEmailFolderAssociationTemplet({
  Joi,
});

module.exports = Object.freeze({
  userTemplet,
  labelTemplet,
  emailTemplet,
  attachmentTemplet,
  recipientsTemplet,
  emailFolderAssociationTemplet,
});
