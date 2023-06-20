"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user", [
      {
        firstName: "Safi",
        lastName: "Shaikh",
        userEmailId: "user@mail.com",
        accessToken: "",
        refreshToken: "",
      },
      {
        firstName: "Deep",
        lastName: "Patel",
        userEmailId: "user2@mail.com",
        accessToken: "",
        refreshToken: "",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", {
      userEmailId: "user2@mail.com",
      userEmailId: "user@mail.com",
    });
  },
};
