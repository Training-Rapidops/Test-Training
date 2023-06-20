const fs = require("fs");
const Joi = require("joi");

const {
  allUserDetailsUsecase,
  userDetailUseCase,
  addDetailsUseCase,
  deleteDetailsUseCase,
  updateUser,
  addLabelByName,
  deleteLabel,
  updateLabel,
  addMail,
  sendMailUsingNodeMailer,
  sendMailUsingFetch,
} = require("../Use-Case");

const getHomePage = 0;
const makeGetAllUserAction = require("./get-all-user-controller");
const getAllUserDataAction = makeGetAllUserAction({ allUserDetailsUsecase });
const makeGetUserAction = require("./get-user-controller");
const getUserDataAction = makeGetUserAction({ Joi, userDetailUseCase });
const makeAddUserAction = require("./add-user-controller");
const addUserDataAction = makeAddUserAction({
  Joi,
  addDetailsUseCase,
});
const makeUpdateUserAction = require("./update-user-controller");
const updateUserDataAction = makeUpdateUserAction({
  Joi,
  updateUser,
});
const makeDeleteUserAction = require("./delete-user-controller");
const deleteUserdataAction = makeDeleteUserAction({
  Joi,
  deleteDetailsUseCase,
});

const makeAddLabelByNameAction = require("./add-label-by-name-controller");
const addLabelByNameAction = makeAddLabelByNameAction({ Joi, addLabelByName });
const makeDeleteLableAction = require("./delete-label-controller");
const deleteLabelAction = makeDeleteLableAction({ Joi, deleteLabel });
const makeUpdateLabelAction = require("./update-label-controller");
const updateLabelAction = makeUpdateLabelAction({ Joi, updateLabel });

const makeAddMailAction = require("./add-mail-controller");
const addMailAction = makeAddMailAction({ Joi, addMail });

const makeSendMailAction = require("./send-mail-controller");
const sendMailAction = makeSendMailAction({
  Joi,
  sendMailUsingNodeMailer,
  sendMailUsingFetch,
});

module.exports = Object.freeze({
  getHomePage,
  getAllUserDataAction,
  getUserDataAction,
  addUserDataAction,
  deleteUserdataAction,
  updateUserDataAction,
  addLabelByNameAction,
  deleteLabelAction,
  updateLabelAction,
  addMailAction,
  sendMailAction,
});
