"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recipient", [
      {
        messageId: 2,
        emailAddress: "recipient@mail.com",
        type: "To",
      },
      {
        messageId: 2,
        emailAddress: "recipient2@mail.com",
        type: "CC",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipient", [{ type: "CC", type: "To" }]);
  },
};
