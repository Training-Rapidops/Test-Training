"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("emailFolderAssociation", [
      {
        messageId: 2,
        labelId: 1,
      },
      {
        messageId: 1,
        labelId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("emailFolderAssociation", [
      { messageId: 2, messageId: 1 },
    ]);
  },
};
