"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER(30),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING(35),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(35),
        allowNull: false,
      },
      userEmailId: {
        type: Sequelize.STRING(55),
        unique: true,
        allowNull: false,
      },
      accessToken: {
        type: Sequelize.STRING(55),
        allowNull: false,
      },
      refreshToken: {
        type: Sequelize.STRING(55),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
