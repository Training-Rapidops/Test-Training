// ---------------Require Packages----------------------
const fs = require("fs");
const Joi = require("joi");
var b64Decode = require("base-64").decode;
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const FileType = require("file-type");
const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "add-labels-user",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer();

// ------------------------------Require Files/Modules--------------------------------
const {
  userDB,
  labelDB,
  emailDB,
  attachmentDB,
  recipientDB,
  emailFolderAssociationDB,
} = require("../Data-Access");
const {
  userTemplet,
  labelTemplet,
  emailTemplet,
  attachmentTemplet,
  recipientsTemplet,
  emailFolderAssociationTemplet,
} = require("../entities");

// -----------------Label Use Cases----------------------------
const makeGetLabel = require("./get-label-use-case");
const getLabel = makeGetLabel({ Joi, labelDB });
const makeGetLabelByName = require("./get-label-by-name");
const getLabelByName = makeGetLabelByName({ Joi, labelDB });
const makeGetLabelInAscOrder = require("./get-label-in-asc-order");
const getLabelInAscOrder = makeGetLabelInAscOrder({ Joi, labelDB });
// const makeAddLabel = require("./add-label-use-case");
// const addLabel = makeAddLabel({ Joi, labelDB, labelTemplet });
const makeAddLabelByName = require("./add-label-by-name-use-case");
const addLabelByName = makeAddLabelByName({
  Joi,
  userDB,
  labelDB,
  labelTemplet,
});
const makeDeleteLabel = require("./delete-label-use-case");
const deleteLabel = makeDeleteLabel({ Joi, userDB, labelDB });
const makeUpdateLabelUseCase = require("./update-label-use-case");
const updateLabel = makeUpdateLabelUseCase({
  Joi,
  userDB,
  labelDB,
  labelTemplet,
});
const makeFetchLabels = require("./fetch-labels-use-case");
const fetchLabels = makeFetchLabels({ Joi, fetch });
const makeFetchAndAddGmailLabels = require("./fetch-and-add-gmail-labels");
const fetchAndAddGmailLabels = makeFetchAndAddGmailLabels({
  Joi,
  fetchLabels,
  addLabelByName,
});

// -----------------Attachment Use Cases----------------------------
const addAttachmentUseCase = require("./add-attchment-use-case");
const addAttachment = addAttachmentUseCase({
  Joi,
  fs,
  fetch,
  attachmentDB,
  attachmentTemplet,
});

// --------------------Recipients Use Cases-------------------------

const makeAdddRecipients = require("./add-recipients-use-case");
const addRecipients = makeAdddRecipients({
  Joi,
  recipientsTemplet,
  recipientDB,
});

// --------------------EmailFolder Association Use Cases-------------------------
const makeAddEmailFolderAssociation = require("./add-email-folder-association");
const addEmailFolderAssociation = makeAddEmailFolderAssociation({
  Joi,
  emailFolderAssociationTemplet,
  emailFolderAssociationDB,
});
const makeAddAllEmailFolderAssociation = require("./add-all-email-folder-associatio-use-case");
const addAllEmailFolderAssociation = makeAddAllEmailFolderAssociation({
  Joi,
  getLabelByName,
  addEmailFolderAssociation,
});

// --------------------User Use Cases-------------------------
const getAllUsers = require("./get-all-user");
const allUserDetailsUsecase = getAllUsers({ userDB, getLabel });
const getUser = require("./get-user");
const userDetailUseCase = getUser({ Joi, userDB, getLabel });
const makeGetUserById = require("./get-user-by-id");
const getUserById = makeGetUserById({ Joi, userDB, getLabel });
const addUser = require("./add-user");
const addDetailsUseCase = addUser({
  Joi,
  userDB,
  addLabelByName,
  userTemplet,
  producer,
});
const makeUpdateUser = require("./update-user");
const updateUser = makeUpdateUser({ Joi, userDB, userTemplet });
const deleteUser = require("./delete-user");
const deleteDetailsUseCase = deleteUser({ Joi, userDB, labelDB });
const makeFetchAccessToken = require("./fetch-access-token");
const fetchAccessToken = makeFetchAccessToken({ Joi, fetch });
const makeFetchAndUpdateAccessToken = require("./fetch-and-update-access-token");
const fetchAndUpdateAccessToken = makeFetchAndUpdateAccessToken({
  Joi,
  allUserDetailsUsecase,
  fetchAccessToken,
  updateUser,
});

// -------------------------Mail Use Cases------------------------------

const formatMailUseCase = require("./format-email-message-use-case");
const formatMail = formatMailUseCase({ b64Decode });
const addMailUseCase = require("./add-mail-use-case");
const addMail = addMailUseCase({ Joi, emailDB, userDB, emailTemplet });
const fetchMailsUseCase = require("./fetch-mails-use-case");
const fetchMails = fetchMailsUseCase({ fetch, updateLabel });
const fetchMailDataUseCase = require("./fetch-mail-data-use-case");
const fetchMailData = fetchMailDataUseCase({ fetch, formatMail });
const makeAddMailsConsumerUsecase = require("./add-mail-consumer-use-case");
const addMailsConsumerUsecase = makeAddMailsConsumerUsecase({
  kafka,
  getLabelInAscOrder,
  fetchMails,
  fetchMailData,
  addMail,
  addAttachment,
  addRecipients,
  addAllEmailFolderAssociation,
});
const makeSendMailUsingNodeMailer = require("./send-mail-using-nodemailer-use-case");
const sendMailUsingNodeMailer = makeSendMailUsingNodeMailer({
  Joi,
  nodemailer,
  getUserById,
});
const makeSendMailUsingFetchUseCase = require("./send-mail-using-fetch-use-case");
const sendMailUsingFetch = makeSendMailUsingFetchUseCase({
  Joi,
  fs,
  FileType,
  fetch,
  getUserById,
});

module.exports = Object.freeze({
  allUserDetailsUsecase,
  userDetailUseCase,
  addDetailsUseCase,
  deleteDetailsUseCase,
  updateUser,
  getLabel,
  getLabelInAscOrder,
  addLabelByName,
  deleteLabel,
  updateLabel,
  addMail,
  formatMail,
  sendMailUsingNodeMailer,
  sendMailUsingFetch,
  fetchAndAddGmailLabels,
  addMailsConsumerUsecase,
  fetchAndUpdateAccessToken,
  addRecipients,
});
