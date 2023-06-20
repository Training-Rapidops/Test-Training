"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("label", [
      {
        labelName: "saved",
        userId: 1,
        syncedFolderId: "API will provide this id ",
      },
      {
        labelName: "archived",
        userId: 2,
        syncedFolderId: "API will provide this id again",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("label", [
      { labelName: "saved", labelName: "archived" },
    ]);
  },
};
